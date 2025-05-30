import { StyleSheet, Dimensions, View  } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import api from '@/lib/Axios';
import LeagueCard, { LeagueCardI } from '../leagues/LeagueCard';
import { useUserContext } from '@/context/UserContext';

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';
import LoadingIcon from '../LoadingIcon';
import Section from '../Section';
import InfoMessage from '../InfoMessage';
import SearchBar from './SearchBar';

const windowWidth = Dimensions.get('window').width;

export default function Ligas() {

    const { user, logged } = useUserContext();
    const [favorites, setFavorites] = useState<LeagueCardI[]>();
    const [leagues, setLeagues] = useState<LeagueCardI[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(logged === null) return;

        setLoading(true);
        getLeagues();

    }, [logged]);


    async function getLeagues() {
        await api.get('leagues', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            setFavorites(response.data.favorite_leagues);
            setLeagues(response.data.all_leagues);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar ligas.');
        }).finally(() => {
            setLoading(false);
        });
    }

    async function searchLeagues() {
        
    }
    
    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <SearchBar handleSearch={searchLeagues}/>

                <Section 
                    text='Favoritas'
                    icon={{
                        IconComponent: FilledStar,
                        width: 27,
                        height: 27,
                        style: styles.starIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                    }}
                >
                    {favorites && favorites.length ? (
                        favorites.map((league, index) => (
                            <LeagueCard  {...league} key={index} />
                        ))
                    ) : (
                        <InfoMessage text='Favorite uma liga para que ela apareça aqui.'/>
                    )}
                    
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
                    {leagues && leagues.length ? (
                        leagues.map((league, index) => (
                            <LeagueCard  {...league} key={index} />
                        ))
                    ) : (
                        <InfoMessage text='Nenhuma liga encontrada.'/>
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
    starIcon: {
        marginTop: 2,
        marginRight: 5
    },
    crownIcon: {
        marginTop: 5,
        marginRight: 8
    }
});