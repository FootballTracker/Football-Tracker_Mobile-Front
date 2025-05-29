//Default Imports
import { useUserContext } from "@/context/UserContext";
import { router } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import User from "@/assets/Icons/User.svg"
import FilledStar from '@/assets/Icons/FilledStar.svg'
import Boot from '@/assets/Icons/Boot.svg'
import Trophy from '@/assets/Icons/Trophy.svg'
import Shield from '@/assets/Icons/Shield.svg'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LeagueCardI } from "@/components/leagues/LeagueCard";
import { useEffect, useState } from "react";
import api from '@/lib/Axios';

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import LeaguesSection from "@/components/leagues/LeaguesSection";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import LoadingIcon from "@/components/LoadingIcon";

//Consts
const windowWidth = Dimensions.get('window').width;

export default function Profile() {
    const { user, logout } = useUserContext();
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

    return (
        <ScrollView>
            <ThemedView style={styles.background}>
                <ThemedIcon IconComponent={User} width={200} height={200} style={{marginVertical: 10}} />
                <ThemedText style={styles.userNickName}>{user?.username}</ThemedText>

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
                            <LeaguesSection 
                                text='Ligas'
                                leagues={[
                                    {
                                        id: '1',
                                        is_favorite: true,
                                        logo_url: 'https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png',
                                        name: "Brasileirão"
                                    }
                                ]}
                                
                                icon={{ IconComponent: Trophy, width: 25, height: 25, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                            />
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
        </ScrollView>
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
        width: windowWidth * 0.9,
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
    },
    logoutButton: {
        width: '80%',
        marginVertical: 25,
    },
})