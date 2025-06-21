import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useItemsContext } from '@/context/ItemsContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SvgUri } from 'react-native-svg';
import { useUserContext } from '@/context/UserContext';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import JogadorPerfil from '@/components/players/pageComponents/JogadorPerfil';
import JogadorEstatisticas from '@/components/players/pageComponents/JogadorEstatisticas';
import FavoriteStar from '@/components/FavoriteStar';

export default function Player() {
    const { playerId } = useLocalSearchParams();

    const { setFavoritePlayers, setPlayers } = useItemsContext();
    const { user } = useUserContext();
    
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const [index, setIndex] = useState(0);
    
    //routes to render
    const [routes] = useState([
        { key: 'perfil', title: 'Perfil' },
        { key: 'estatisticas', title: 'Estatísticas' },
    ]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'perfil':
                return <JogadorPerfil player={player.player}/>;
            case 'estatisticas':
                return <JogadorEstatisticas />;
            default:
                return null;
        }
    };

    useEffect(() => {
        //fazer requisição para o back

        setContentLoaded(true);
    }, []);


    const changeFavoritie = () => {
        // alert("trocar favorito");
        SwapFavorites(setFavoritePlayers, setPlayers, {id: player.player.id, name: player.player.name, photo: player.player.photo_url, is_favorite: player.player.is_favorite, show: true}, "player", user?.id)
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image source={{uri: player.player.photo_url}} style={styles.playerPhoto} />

                    <View style={[styles.centerView, {gap: 0}]}>
                        <ThemedText style={styles.playerName} >{player.player.firstname}</ThemedText>
                        <FavoriteStar favorite={player.player.is_favorite} handleClick={changeFavoritie} />
                    </View>

                    <View style={styles.centerView}>
                        <ThemedText>{player.player.age} anos</ThemedText>
                        <SvgUri uri={player.player.flag_url} width={'25'} height={'20'} />
                    </View>
                </View>

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => ( <CustomTabBar {...props} /> )}
                    style={{ top: 25 }}
                    lazy
                    renderLazyPlaceholder={() => (
                        <LoadingIcon />
                    )}
                />
            </ThemedView>
        ) : (
            <LoadingIcon />
        )

    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1
    },
    playerPhoto: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    playerName: {
        fontFamily: 'Kdam',
        fontSize: 20,
    },
    centerView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

const player = {
    player: {
        id: '276',
        name: "Neymar",
        firstname: "Neymar",
        lastname: "da Silva Santos Júnior",
        age: 33,
        birth_date : "1992-02-05",
        birth_place: "Mogi das Cruzes",
        birth_country: "Brazil",
        nationality: "Brazil",
        height: "175 cm",
        weight: "68 kg",
        number: 10,
        position: "Attacker",
        photo_url: "https://media.api-sports.io/football/players/276.png",
        flag_url: "https://media.api-sports.io/flags/br.svg",
        is_favorite: true,
    }
}