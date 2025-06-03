//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useEffect, useState } from 'react';
import { StyleSheet  } from 'react-native';
import { router } from 'expo-router';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import LoadingIcon from '../LoadingIcon';
import InfoMessage from '../InfoMessage';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
export type league = {
    id: string
    logo_url: string
    name: string
    is_favorite: boolean
    show: boolean
}

export default function Ligas() {
    const { user, logged } = useUserContext();
    const { setFavoriteLeagues, favoriteLeagues, setLeagues, leagues } = useItemsContext();
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
            const mainLeagues : league[] = response.data.all_leagues;
            setFavoriteLeagues(response.data.favorite_leagues ? response.data.favorite_leagues : []);
            setLeagues(mainLeagues.map(league => ({
                ...league,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar ligas.');
        }).finally(() => {
            setLoading(false);
        });
    }

    async function searchLeagues() {
        
    }

    const accessLeague = (id: string) => {
        router.push(`/(pages)/league/${id}` as any);;
    }

    const changeFavorite = (league: league) => {
        SwapFavorites(setFavoriteLeagues, setLeagues, league);
    }
    
    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <SearchBar handleSearch={searchLeagues}/>

                <Section text='Favoritas' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                    {favoriteLeagues && favoriteLeagues.length && favoriteLeagues.filter(l => l.show).length ? (
                        favoriteLeagues.map((league, index) => (
                            <Card
                                favorite={league.is_favorite}
                                handleOpen={() => {accessLeague(league.id)}}
                                handleFavorite={() => {changeFavorite(league)}}
                                info={league.name}
                                image={league.logo_url}
                                show={league.show}
                                key={index}
                            />
                        ))
                    ) : (
                        <InfoMessage text='Favorite uma liga para que ela apareça aqui.'/>
                    )}
                    
                </Section>

                <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                    {leagues && leagues.length ? (
                        leagues.filter(l => l.show).length ? 
                        leagues.map((league, index) => (
                            <Card
                                favorite={league.is_favorite}
                                handleOpen={() => {accessLeague(league.id)}}
                                handleFavorite={() => {changeFavorite(league)}}
                                info={league.name}
                                image={league.logo_url}
                                show={league.show}
                                key={index}
                            />
                        )) : <InfoMessage text='Todas as ligas foram favoritadas.'/>
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