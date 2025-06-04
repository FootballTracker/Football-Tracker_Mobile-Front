//Default Imports
import { useUserContext } from "@/context/UserContext";
import { router } from "expo-router";
import { useItemsContext } from "@/context/ItemsContext";
import { Dimensions, StyleSheet, View } from "react-native";
import User from "@/assets/Icons/User.svg"
import FilledStar from '@/assets/Icons/FilledStar.svg'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";

//Components
import Section from "@/components/Section";
import LoadingIcon from "@/components/LoadingIcon";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { FavoriteLeagues, FavoritePlayers, FavoriteTeams } from "@/components/Items";

//Icons
import Shield from '@/assets/Icons/Shield.svg'
import Trophy from '@/assets/Icons/Trophy.svg'
import Boot from '@/assets/Icons/Boot.svg'

//Consts
const windowWidth = Dimensions.get('window').width;

export default function Profile() {
    const { user, logout } = useUserContext();
    const { loading } = useItemsContext();

    const handleLogout = () => {
        logout();
        while (router.canGoBack()) {
            router.back();
        }
    }

    return (
        !loading ? (
            <ThemedScrollView>
                <ThemedView style={styles.background}>
                    <ThemedIcon IconComponent={User} width={200} height={200} style={{marginVertical: 10}} />
                    <ThemedText style={styles.userNickName}>{user?.username}</ThemedText>

                    <View style={styles.favorites}>
                        <ThemedIcon IconComponent={FilledStar} lightColor={Colors.light.Red} darkColor={Colors.dark.Red} width={27} height={27}/>
                        <ThemedText style={styles.favoritesText}>Favoritos</ThemedText>
                    </View>
                        

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