//Default Imports
import { useUserContext } from '@/context/UserContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useEffect, useState } from 'react';
import { StyleSheet  } from 'react-native';
import { router } from 'expo-router';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import InfoMessage from '../InfoMessage';
import LoadingIcon from '../LoadingIcon';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
type player = {
    id: string,
    name: string,
    is_favorite: boolean,
    photo: string,
    show: boolean,
}

export default function Jogadores() {
    const { user, logged } = useUserContext();
    const [favorites, setFavorites] = useState<player[]>(favoritePlayersMock);
    const [players, setPlayers] = useState<player[]>(playersMock);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(logged === null) return;

        // setLoading(true);
        // getPlayers();

    }, [logged]);

    async function getPlayers() {
        await api.get('players', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            const mainPlayers : player[] = response.data.players;
            setFavorites(response.data.favorite_players ? response.data.favorite_players : []);
            setPlayers(mainPlayers.map(player => ({
                ...player,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar jogadores.');
        }).finally(() => {
            setLoading(false);
        });
    }

    async function searchPlayers() {
        
    }

    const accessPlayer = (id: string) => {
        router.push(`/(pages)/player/${id}` as any);
    }

    const changeFavorite = (player: player) => {
        SwapFavorites(setFavorites, setPlayers, player);
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={getPlayers}>
                <SearchBar handleSearch={searchPlayers}/>

                    <Section text='Favoritos' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                        {favorites && favorites.length ? (
                            favorites.filter(p => p.show).length ? 
                            favorites.map((player, index) => (
                                <Card
                                    favorite={player.is_favorite}
                                    handleOpen={() => {accessPlayer(player.id)}}
                                    handleFavorite={() => {changeFavorite(player)}}
                                    info={player.name}
                                    image={player.photo}
                                    show={player.show}
                                    key={index}
                                />
                            )) : <InfoMessage text='Favorite um jogador para que ele apareça aqui.'/>
                        ) : (
                            <InfoMessage text='Favorite um jogador para que ele apareça aqui.'/>
                        )}
                    </Section>

                    <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                        {players && players.length ? (
                            players.filter(p => p.show).length ? 
                            players.map((player, index) => (
                                <Card
                                    favorite={player.is_favorite}
                                    handleOpen={() => {accessPlayer(player.id)}}
                                    handleFavorite={() => {changeFavorite(player)}}
                                    info={player.name}
                                    image={player.photo}
                                    show={player.show}
                                    key={index}
                                />
                            )) : <InfoMessage text='Todos os jogadores foram favoritados.'/>
                        ) : (
                            <InfoMessage text='Nenhum jogador encontrado.'/>
                        )}
                    </Section>
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
    },
});

const favoritePlayersMock : player[] = [
    // {
    //     id: '276',
    //     name: 'Neymar',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/276.png',
    //     show: true,
    // },
    // {
    //     id: '629',
    //     name: 'K. De Bruyne',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/629.png',
    //     show: true,
    // },
    // {
    //     id: '874',
    //     name: 'Cristiano Ronaldo',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/874.png',
    //     show: true,
    // },
]

const playersMock : player[] = [
    {
        id: '276',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2761',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6291',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8741',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2762',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6292',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8742',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
]