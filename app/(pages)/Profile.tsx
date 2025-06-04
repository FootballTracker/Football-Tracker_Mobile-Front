//Default Imports
import { useUserContext } from "@/context/UserContext";
import { router } from "expo-router";
import { Button, Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import User from "@/assets/Icons/User.svg"
import FilledStar from '@/assets/Icons/FilledStar.svg'
import Boot from '@/assets/Icons/Boot.svg'
import Trophy from '@/assets/Icons/Trophy.svg'
import Shield from '@/assets/Icons/Shield.svg'
import Ionicons from '@expo/vector-icons/Ionicons';
import LeagueCard, { LeagueCardI } from "@/components/leagues/LeagueCard";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import api from '@/lib/Axios';


//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import LoadingIcon from "@/components/LoadingIcon";
import Section from "@/components/Section";
import InfoMessage from "@/components/InfoMessage";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";

export default function Profile() {
    const { user, logout, setImage } = useUserContext();
    const [leagues, setLeagues] = useState<LeagueCardI[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const handleLogout = () => {
        logout();
        while (router.canGoBack()) {
            router.back();
        }
    }

    useEffect(() => {
        if(user) {
            getLeagues();
        }
    }, [user]);

    async function getLeagues() {
        await api.get('favorite_leagues', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            setLeagues(response.data.all_leagues);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar ligas.');
        }).finally(() => {
            setLoading(false);
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
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
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao atualizar imagem.');
        })
    }

    async function removeImage() {
        await api.delete('user/image', {
            params: {
                user_id: user?.id
            }
        }).then((response: any) => {
            setImage(false);
        }).catch((e) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao remover imagem.');
        })
    }

    return (
        <ThemedScrollView getData={getLeagues}>
            <ThemedView style={styles.background}>
                {user?.image ?
                    <Image source={{uri: `https://intimate-primate-master.ngrok-free.app/user/${user?.id}/image?reload=${Date.now()}`}} style={styles.userImage} />
                    :
                    <ThemedIcon IconComponent={User} width={200} height={200} style={{marginVertical: 10}} />
                }
                <ThemedText style={styles.userNickName}>{user?.username}</ThemedText>

                <Button title="Trocar imagem" onPress={pickImage} />
                <Button title="Remover imagem" onPress={removeImage} />

                <View style={styles.favorites}>
                    <ThemedIcon IconComponent={FilledStar} lightColor={Colors.light.Red} darkColor={Colors.dark.Red} width={27} height={27}/>
                    <ThemedText style={styles.favoritesText}>Favoritos</ThemedText>
                </View>

                <View style={styles.content}>
                    {!loading ? (
                        <>
                            {/* <LeaguesSection 
                            text='Jogadores'
                            leagues={favoriteLeagues}
                            icon={{ IconComponent: Boot, width: 30, height: 30, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                            emptyMessage="Favorite um jogador para que ele apareça aqui."
                            /> */}
                            <Section 
                                text='Principais'
                                icon={{
                                    IconComponent: Trophy,
                                    width: 25,
                                    height: 25,
                                    darkColor: Colors.dark.Red,
                                    lightColor: Colors.light.Red,
                                    style: styles.favoriteSectionsIcons
                                }}
                            >
                                {leagues && leagues.length ? (
                                    leagues.map((league, index) => (
                                        <LeagueCard  {...league} key={index} />
                                    ))
                                ) : (
                                    <InfoMessage text='Nenhuma liga encontrada.'/>
                                )}
                            </Section>
                            {/* <LeaguesSection 
                                text='Times'
                                leagues={favoriteLeagues}
                                icon={{ IconComponent: Shield, width: 30, height: 30, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                                emptyMessage="Favorite um time para que ele apareça aqui."
                            /> */}
                        </>
                    ) : (
                        <LoadingIcon />
                    )}
                </View>    

                <ThemedButton IconComponent={{ Icon: Ionicons, name: "exit-outline" }} title="Sair" backgroundColor="Red" textColor="ButtonText" handleClick={handleLogout} style={styles.logoutButton} />
                {/* <ThemedText onPress={} style={{textAlign: 'center', marginTop: 20, padding: 10}}>SAIR</ThemedText> */}
            </ThemedView>
        </ThemedScrollView>
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