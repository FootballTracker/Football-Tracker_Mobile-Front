//Default Imports
import { useUserContext } from '@/context/UserContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
type team = {
    id: string
    name: string
    logo: string
    is_favorite: boolean
    show: boolean
}

export default function Times() {
    const { user, logged } = useUserContext();
    const [favorites, setFavorites] = useState<team[]>([]);
    const [teams, setTeams] = useState<team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(logged === null) return;

        setLoading(true);
        getTeams();

    }, [logged]);


    async function getTeams() {
        await api.get('teams', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            const mainTeams : team[] = response.data.teams;
            setFavorites(response.data.favorite_team);
            setTeams(mainTeams.map(team => ({
                ...team,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar times.');
        }).finally(() => {
            setLoading(false);
        });
    }

    async function searchTeams() {
        
    }

    const accessTeam = (id: string) => {
        router.push(`/(pages)/team/${id}` as any);
    }

    function changeFavorite(team: team) {
        const newTeams = SwapFavorites(favorites, teams, team);

        setFavorites(newTeams.favorites);
        setTeams(newTeams.normal);
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <SearchBar handleSearch={searchTeams}/>

                <Section text='Favorito' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                    {favorites && favorites.length ? (
                        favorites.map((team, index) => (
                            <Card
                                favorite={team.is_favorite}
                                handleOpen={() => {accessTeam(team.id)}}
                                handleFavorite={() => {changeFavorite(team)}}
                                info={team.name}
                                image={team.logo}
                                key={index}
                            />
                        ))
                    ) : (
                        <InfoMessage text='Favorite um time para que ele apareça aqui.'/>
                    )}
                </Section>

                <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                    {teams && teams.length ? (
                        teams.map((team, index) => (
                            team.show &&
                            <Card
                                favorite={team.is_favorite}
                                handleOpen={() => {accessTeam(team.id)}}
                                handleFavorite={() => {changeFavorite(team)}}
                                info={team.name}
                                image={team.logo}
                                key={index}
                            />
                        ))
                    ) : (
                        <InfoMessage text='Nenhum time encontrado.'/>
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
    },
    favoritesInfoText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 14,
    },
});