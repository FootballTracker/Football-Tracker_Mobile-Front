//Default Imports
import { useUserContext } from "@/context/UserContext";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import { useItemsContext } from "@/context/ItemsContext";
import User from "@/assets/Icons/User.svg"
import { Colors } from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import api from '@/lib/Axios';
import { useTheme } from "@/context/ThemeContext";


//Components
import Section from "@/components/Section";
import LoadingIcon from "@/components/LoadingIcon";
import { useState } from "react";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ModalComponent } from "@/components/ModalComponent";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { FavoriteLeagues, FavoritePlayers, FavoriteTeams } from "@/components/Items";

//Icons
import Shield from '@/assets/Icons/Shield.svg'
import Trophy from '@/assets/Icons/Trophy.svg'
import Boot from '@/assets/Icons/Boot.svg'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FilledStar from '@/assets/Icons/FilledStar.svg';
import { Toast } from "toastify-react-native";

export default function Profile() {
    const { user, logout, setImage, imageVersion, updateImage } = useUserContext();
    const { theme } = useTheme();
    const { loading } = useItemsContext();
    const [modalOpened, setModalOpened] = useState(false);

    const handleLogout = () => {
        logout();
        while (router.canGoBack()) {
            router.back();
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            if(result.assets[0].fileSize && result.assets[0].fileSize > 25e+5) {
                Toast.show({
                    props: {
                        type: "warn",
                        text: "Somente imagens menores que 2.5MB são permitidas"
                    },
                    useModal: true
                })
                // alert("Somente imagens menores que 2.5MB são permitidas");
                return;
            }
            sendImage(result);
        }
    };

    async function sendImage(image: ImagePicker.ImagePickerSuccessResult) {
        if (!user?.id) {
            return;
        }

        const formData = new FormData();
        
        formData.append('user_id', user?.id);
        formData.append('image', {
            uri: image.assets[0].uri,
            name: image.assets[0].fileName,
            type: image.assets[0].mimeType,
        } as any);

        await api.post("user/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            setImage(true);
            setModalOpened(false);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao atualizar imagem.');
        });

    }

    async function removeImage() {
        if(!user || !user.image) return;
        await api.delete('user/image', {
            params: {
                user_id: user?.id
            }
        }).then(() => {
            setImage(false);
            setModalOpened(false);
        }).catch((e) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao remover imagem.');
        });
    }

    return (
        !loading ? (
            <ThemedScrollView getData={updateImage}>
                <ThemedView style={styles.background}>

                    {user?.image ?
                        <Pressable onPress={() => setModalOpened(true)}>
                            <Image source={{uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}user/${user?.id}/image?reload=${imageVersion}`}} style={styles.userImage} />
                        </Pressable>
                        :
                        <Pressable onPress={pickImage}>
                            <ThemedIcon IconComponent={User} width={200} height={200} style={{marginVertical: 10}} />
                            <View style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                backgroundColor: Colors[theme].LightBackground,
                                padding: 10,
                                borderRadius: 100
                            }}>
                                <ThemedIcon IconComponent={FontAwesome6} name="edit" size={21} />
                            </View>
                        </Pressable>
                    }

                    <ModalComponent
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        modalViewProps={{style: {flexDirection: 'column', backgroundColor: 'none', flex: 1}}}
                    >
                        <ThemedView style={styles.modalView}>

                            <Image source={{uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}user/${user?.id}/image?reload=${imageVersion}`}} style={styles.userImageModal} />

                            <ThemedView style={styles.modalButtonsView}>
                                <TouchableOpacity
                                    onPress={pickImage}
                                    activeOpacity={0.5}
                                    style={[styles.modalButtons, {borderBottomLeftRadius: 8, backgroundColor: Colors[theme].LightBackground}]}
                                >
                                    <ThemedIcon IconComponent={FontAwesome6} name="edit" size={21} lightColor={Colors.light.Red} darkColor={Colors.dark.Red}/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={removeImage}
                                    activeOpacity={0.5}
                                    style={[styles.modalButtons, {borderBottomRightRadius: 8, backgroundColor: Colors[theme].LightBackground}]}
                                >
                                    <ThemedIcon IconComponent={FontAwesome6} name="trash" size={21} lightColor={Colors.light.Red} darkColor={Colors.dark.Red}/>
                                </TouchableOpacity>
                            </ThemedView>

                        </ThemedView>

                    </ModalComponent>
                        
                    <ThemedText style={styles.userNickName}>{user?.username}</ThemedText>

                    <View style={styles.content}>
                        <Section text='Times' icon={{IconComponent: Shield, width: 25, height: 25, Stroke: true, strokeWidth: 5.5}}>
                            <FavoriteTeams />
                        </Section>

                        <Section text='Ligas' icon={{IconComponent: Trophy, width: 25, height: 25}}>
                            <FavoriteLeagues />
                        </Section>

                        <Section text='Jogadores' icon={{IconComponent: Boot, width: 25, height: 25}}>
                            <FavoritePlayers />
                        </Section>
                    </View>

                    <ThemedButton IconComponent={{ Icon: Ionicons, name: "exit-outline" }} title="Sair" backgroundColor="Red" textColor="ButtonText" handleClick={handleLogout} style={styles.logoutButton} />
                        {/* <ThemedText onPress={} style={{textAlign: 'center', marginTop: 20, padding: 10}}>SAIR</ThemedText> */}
                </ThemedView>
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        display: 'flex',
        alignItems: 'center',
        minHeight: '100%',
        flexGrow: 1
    },
    userImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
        borderRadius: 100
    },
    modalView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 150,
        borderRadius: 8,
    },
    userImageModal: {
        width: 270,
        height: 270,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    modalButtonsView: {
        flexDirection: "row",
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: "100%",
    },
    modalButtons: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        flex: 1,
    },
    userNickName: {
        fontFamily: 'Kdam',
        fontSize: 40,
    },
    favorites: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 15,
    },
    favoriteSectionsIcons: {
        marginHorizontal: 10,
    },
    favoritesText: {
        // fontFamily: 'Kdam',
        fontSize: 20,
    },
    content: {
        width: "100%",
        paddingHorizontal: 10,
        flex: 1,
    },
    logoutButton: {
        width: '80%',
        marginVertical: 25,
    },
})