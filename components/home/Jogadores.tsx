//Default Imports
import { useUserContext } from '@/context/UserContext';
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
    favorite: boolean,
    photo: string,
}

export default function Jogadores() {
    const { user, logged } = useUserContext();
    const [favorites, setFavorites] = useState<player[] | undefined>(favoritePlayersMock);
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
            setFavorites(response.data.favorite_players);
            setPlayers(response.data.players);
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

    const changeFavorite = (id: string) => {
        // alert("trocar favorito");
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <SearchBar handleSearch={searchPlayers}/>

                    <Section text='Favoritos' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                        {favorites && favorites.length ? (
                            favorites.map((player, index) => (
                                <Card
                                    favorite
                                    handleOpen={() => {accessPlayer(player.id)}}
                                    handleFavorite={() => {changeFavorite(player.id)}}
                                    info={player.name}
                                    image={player.photo}
                                    key={index}
                                />
                            ))
                        ) : (
                            <InfoMessage text='Favorite um jogador para que ele apareça aqui.'/>
                        )}
                    </Section>

                    <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                        {players && players.length ? (
                            players.map((player, index) => (
                                <Card
                                    favorite={false}
                                    handleOpen={() => {accessPlayer(player.id)}}
                                    handleFavorite={() => {changeFavorite(player.id)}}
                                    info={player.name}
                                    image={player.photo}
                                    key={index}
                                />
                            ))
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
    {
        id: '276',
        name: 'Neymar',
        favorite: true,
        photo: 'https://media.api-sports.io/football/players/276.png',
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        favorite: true,
        photo: 'https://media.api-sports.io/football/players/629.png',
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        favorite: true,
        photo: 'https://media.api-sports.io/football/players/874.png',
    },
]

const playersMock : player[] = [
    {
        id: '276',
        name: 'Neymar',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
    },
    {
        id: '276',
        name: 'Neymar',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
    },
    {
        id: '276',
        name: 'Neymar',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
    },
]