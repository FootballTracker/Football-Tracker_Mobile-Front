import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { useItemsContext } from '@/context/ItemsContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { SvgUri } from 'react-native-svg';
import { Toast } from 'toastify-react-native';
import { useUserContext } from '@/context/UserContext';
import { favoritesValues } from '@/constants/MaxFavorites';
import api from '@/lib/Axios';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import JogadorPerfil, { JogadorPerfilProps } from '@/components/players/pageComponents/JogadorPerfil';
import JogadorEstatisticas, { EstatisticasProps } from '@/components/players/pageComponents/JogadorEstatisticas';
import FavoriteStar from '@/components/FavoriteStar';
import { differenceInYears } from 'date-fns';

//Type
type PlayerData = JogadorPerfilProps & EstatisticasProps;

export default function Player() {
    const { playerId } = useLocalSearchParams();
    const { setFavoritePlayers, setPlayers, favoritePlayers } = useItemsContext();
    const { user } = useUserContext();
    
    const [player, setPlayerData] = useState<PlayerData>();
    const [favoriteState, setFavoriteState] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [index, setIndex] = useState(0);
    
    //routes to render
    const [routes] = useState([
        { key: 'perfil', title: 'Perfil' },
        { key: 'estatisticas', title: 'Competições' },
    ]);

    const renderScene = ({ route }: any) => {
        if(player) {
            switch (route.key) {
            case 'perfil':
                return <JogadorPerfil player={player.player} teams={player.teams}/>;
            case 'estatisticas':
                return <JogadorEstatisticas playerCompetitions={player.playerCompetitions}/>;
            default:
                return null;
            }
        }
    };

    useEffect(() => {
        getPlayerData();
    }, []);

    async function getPlayerData() {
        await api.get(`players/${playerId}`, {
            params: {
                user_id: user?.id
            }
        }).
        then((response: any) => {
            const age = response.data.birth_date ? differenceInYears(new Date(), new Date(response.data.birth_date)) : -1;
            const teams = [];
            for(const team of response.data.teams) teams.push(team.team);
            setPlayerData({player: {age: age, ...response.data}, teams: teams, playerCompetitions: response.data.teams});
            setFavoriteState(response.data.is_favorite);
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar dados do jogador"
                    }
                });
            }
        }).finally(() => {
            setContentLoaded(true);
        });
    }


    const changeFavoritie = () => {
        if(!player) return;
        if(!favoriteState && favoritePlayers.filter(player => player.show !== false).length === favoritesValues.players) {
            Toast.show({
                props: {
                    type: "warn",
                    text: `${favoritesValues.players} jogadores já estão favoritados. Desfavorite um jogador caso deseje favoritar algum outro`
                },
                visibilityTime: 6000
            });
            return false;
        }
        SwapFavorites(setFavoritePlayers, setPlayers, {id: player.player.id, name: player.player.name, photo: player.player.photo_url, is_favorite: player.player.is_favorite, show: true}, "player", user?.id);
        setFavoriteState(!favoriteState);
    }

    return (

        contentLoaded && player ? (
            <ThemedView style={styles.background}>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image source={{uri: player.player.photo_url}} style={styles.playerPhoto} />

                    <View style={[styles.centerView, {gap: 0}]}>
                        <ThemedText style={styles.playerName} >{player.player.name}</ThemedText>
                        <FavoriteStar favorite={favoriteState} handleClick={changeFavoritie} />
                    </View>

                    <View style={styles.centerView}>
                        {player.player.age === -1 ? <ThemedText>Idade desconhecida</ThemedText>
                        : <ThemedText>{player.player.age} anos</ThemedText>}
                        
                        <SvgUri uri={player.player.birth_country.flag_url} width={'25'} height={'20'} />
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

const playerMock = {
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