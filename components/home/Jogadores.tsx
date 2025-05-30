import { StyleSheet, Dimensions, View  } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import PlayerCard, { PlayerCardI } from '../players/PlayerCard';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';

import PlayerSection from '@/components/players/PlayerSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';
import Section from '../Section';
import SearchBar from './SearchBar';

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

    async function searchPlayers() {
        
    }

    return (
        <ThemedScrollView style={styles.background}>
            <SearchBar handleSearch={searchPlayers}/>

                <Section
                    text='Favoritos'
                    icon={{
                        IconComponent: FilledStar,
                        width: 27,
                        height: 27,
                        style: styles.starIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                    }}
                >
                    <PlayerCard id='276' image="https://media.api-sports.io/football/players/276.png" name="Neymar" favorite={true}/>
                    <PlayerCard id='629' image="https://media.api-sports.io/football/players/629.png" name="K. De Bruyne" favorite={true}/>
                    <PlayerCard id='874' image="https://media.api-sports.io/football/players/874.png" name="Cristiano Ronaldo" favorite={true}/>
                </Section>

                <Section
                    text='Principais'
                    icon={{
                        IconComponent: FontAwesome5,
                        name: 'crown',
                        size: 20,
                        style: styles.crownIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red
                    }}
                    style={{marginBottom: 50}}
                >
                    <PlayerCard id='276' image="https://media.api-sports.io/football/players/276.png" name="Neymar" favorite={false}/>
                    <PlayerCard id='629' image="https://media.api-sports.io/football/players/629.png" name="K. De Bruyne" favorite={false}/>
                    <PlayerCard id='874' image="https://media.api-sports.io/football/players/874.png" name="Cristiano Ronaldo" favorite={false}/>
                    <PlayerCard id='276' image="https://media.api-sports.io/football/players/276.png" name="Neymar" favorite={false}/>
                    <PlayerCard id='629' image="https://media.api-sports.io/football/players/629.png" name="K. De Bruyne" favorite={false}/>
                    <PlayerCard id='874' image="https://media.api-sports.io/football/players/874.png" name="Cristiano Ronaldo" favorite={false}/>
                    <PlayerCard id='276' image="https://media.api-sports.io/football/players/276.png" name="Neymar" favorite={false}/>
                    <PlayerCard id='629' image="https://media.api-sports.io/football/players/629.png" name="K. De Bruyne" favorite={false}/>
                    <PlayerCard id='874' image="https://media.api-sports.io/football/players/874.png" name="Cristiano Ronaldo" favorite={false}/>
                </Section>
        </ThemedScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
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