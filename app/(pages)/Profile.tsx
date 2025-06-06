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
import FilledStar from '@/assets/Icons/FilledStar.svg';

export default function Profile() {
    const { user, logout, setImage, imageVersion } = useUserContext();
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
                alert("Somente imagens menores que 2.5MB são permitidas");
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
            <ThemedScrollView>
                <ThemedView style={styles.background}>

                    <Pressable onPress={() => setModalOpened(true)}>
                        {user?.image ?
                            <Image source={{uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}user/${user?.id}/image?reload=${imageVersion}`}} style={styles.userImage} />
                            :
                            <ThemedIcon IconComponent={User} width={200} height={200} style={{marginVertical: 10}} />
                        }
                    </Pressable>

                    <ModalComponent
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        modalViewProps={{style: {backgroundColor: 'none', alignItems: 'center', flex: 1}}}
                    >
                        <View style={[{ marginTop: 200 }, !user?.image && {
                                backgroundColor: Colors[theme].DarkBackground,
                                borderRadius: 150,
                            }]}
                        >
                            {user?.image ?
                                <Image source={{uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}user/${user?.id}/image?reload=${imageVersion}`}} style={styles.userImageModal} />
                                :
                                <ThemedIcon IconComponent={User} width={250} height={250}/>
                            }
                        </View>

                        <ThemedView style={styles.modalButtonsView} lightColor={Colors.light.DarkBackground} darkColor={Colors.dark.DarkBackground}>
                            <TouchableOpacity
                                onPress={pickImage}
                                activeOpacity={0.5}
                                style={styles.modalButtons}
                            >
                                <ThemedText>Editar Foto</ThemedText>
                            </TouchableOpacity>

                            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>

                            <TouchableOpacity
                                onPress={removeImage}
                                activeOpacity={0.5}
                                style={styles.modalButtons}
                            >
                                <ThemedText>Remover Foto</ThemedText>
                            </TouchableOpacity>

                            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                            
                            <TouchableOpacity
                                onPress={() => setModalOpened(false)}
                                activeOpacity={0.5}
                                style={styles.modalButtons}
                            >
                                <ThemedText>Fechar</ThemedText>
                            </TouchableOpacity>
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
    userImageModal: {
        width: 270,
        height: 270,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    modalButtonsView: {
        alignItems: "center",
        gap: 10,
        width: "100%",
        position: 'absolute',
        bottom: -20,
        paddingVertical: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalButtons: {
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        width: "100%",
    },
    divisor: {
        height: .6,
        width: "100%",
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