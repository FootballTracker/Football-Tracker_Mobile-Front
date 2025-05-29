import { StyleSheet, Dimensions, View  } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import { PlayerCardI } from '../players/PlayerCard';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';

import PlayerSection from '@/components/players/PlayerSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';

const windowWidth = Dimensions.get('window').width;

export default function Jogadores() {

    const { user, logged } = useUserContext();
    const [favorities, setFavorities] = useState<PlayerCardI[] | undefined>();
    const [player, setPlayer] = useState<PlayerCardI[]>();
    const [loading, setLoading] = useState<boolean>(true);

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
            setFavorities(response.data.favorite_players);
            setPlayer(response.data.players);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar jogadores.');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <ThemedScrollView style={styles.background}>
            <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />

            <View style={styles.content}>

                <PlayerSection 
                    text='Favoritos'
                    players={[
                        {
                            id: '276',
                            image: "https://media.api-sports.io/football/players/276.png",
                            name: "Neymar",
                            favoritie: true
                        },
                        {
                            id: '629',
                            image: "https://media.api-sports.io/football/players/629.png",
                            name: "K. De Bruyne",
                            favoritie: true
                        },
                        {
                            id: '874',
                            image: "https://media.api-sports.io/football/players/874.png",
                            name: "Cristiano Ronaldo",
                            favoritie: true
                        },
                    ]}
                    icon={{
                        IconComponent: FilledStar,
                        width: 27,
                        height: 27,
                        style: styles.starIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                    }}
                />

                <PlayerSection 
                    text='Principais'
                    icon={{
                        IconComponent: FontAwesome5,
                        name: 'crown',
                        size: 20,
                        style: styles.crownIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red
                    }}
                    players={[
                        {
                            id: '276',
                            image: "https://media.api-sports.io/football/players/276.png",
                            name: "Neymar",
                            favoritie: false
                        },
                        {
                            id: '629',
                            image: "https://media.api-sports.io/football/players/629.png",
                            name: "K. De Bruyne",
                            favoritie: false
                        },
                        {
                            id: '874',
                            image: "https://media.api-sports.io/football/players/874.png",
                            name: "Cristiano Ronaldo",
                            favoritie: false
                        },
                        {
                            id: '276',
                            image: "https://media.api-sports.io/football/players/276.png",
                            name: "Neymar",
                            favoritie: false
                        },
                        {
                            id: '629',
                            image: "https://media.api-sports.io/football/players/629.png",
                            name: "K. De Bruyne",
                            favoritie: false
                        },
                        {
                            id: '874',
                            image: "https://media.api-sports.io/football/players/874.png",
                            name: "Cristiano Ronaldo",
                            favoritie: false
                        },
                        {
                            id: '276',
                            image: "https://media.api-sports.io/football/players/276.png",
                            name: "Neymar",
                            favoritie: false
                        },
                        {
                            id: '629',
                            image: "https://media.api-sports.io/football/players/629.png",
                            name: "K. De Bruyne",
                            favoritie: false
                        },
                        {
                            id: '874',
                            image: "https://media.api-sports.io/football/players/874.png",
                            name: "Cristiano Ronaldo",
                            favoritie: false
                        },
                    ]}
                />
            </View>
        </ThemedScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
    },
    searchBar: {
        width: windowWidth*0.9,
        marginHorizontal: 'auto',
        height: 40,
    },
    content: {
        top: 20,
        width: windowWidth*0.9,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 30
    },
    starIcon: {
        marginTop: 2,
        marginRight: 5
    },
    crownIcon: {
        marginTop: 5,
        marginRight: 8
    }
});