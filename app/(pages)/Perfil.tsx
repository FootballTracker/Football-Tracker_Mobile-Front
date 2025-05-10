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

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import LeaguesSection from "@/components/leagues/LeaguesSection";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { usePage } from "@/context/PageContext";

//Consts
const windowWidth = Dimensions.get('window').width;

export default function Perfil() {
    const { user, logout } = useUserContext();
    const { setPage, setPreviousPage } = usePage();

    const handleLogout = () => {
        logout();
        setPage("Ligas");
        setPreviousPage(null);
        router.back()
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
                    {/* <LeaguesSection 
                        text='Jogadores'
                        leagues={favoriteLeagues}
                        icon={{ IconComponent: Boot, width: 30, height: 30, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                        emptyMessage="Favorite um jogador para que ele apareça aqui."
                    /> */}
                    <LeaguesSection 
                        text='Ligas'
                        leagues={favoriteLeagues}
                        icon={{ IconComponent: Trophy, width: 25, height: 25, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                    />
                    {/* <LeaguesSection 
                        text='Times'
                        leagues={favoriteLeagues}
                        icon={{ IconComponent: Shield, width: 30, height: 30, darkColor: Colors.dark.Red, lightColor: Colors.light.Red, style: styles.favoriteSectionsIcons}}
                        emptyMessage="Favorite um time para que ele apareça aqui."
                    /> */}
                </View>

                <ThemedButton IconComponent={{ Icon: Ionicons, name: "exit-outline" }} title="Sair" backgroundColor="Red" textColor="Text" handleClick={handleLogout} style={styles.logoutButton} />
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

const favoriteLeagues = [
    {
        id: '71',
        image: "https://media.api-sports.io/football/leagues/71.png",
        name: "Serie A",
        favoritie: true
    },
    {
        id: '140',
        image: "https://media.api-sports.io/football/leagues/140.png",
        name: "La Liga",
        favoritie: true
    },
    {
        id: '39',
        image: "https://media.api-sports.io/football/leagues/39.png",
        name: "Premier League",
        favoritie: true
    }
]