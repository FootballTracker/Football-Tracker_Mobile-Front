import { StyleSheet, Dimensions  } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import TeamCard, { TeamCardI } from '../teams/TeamCard';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';
import LoadingIcon from '../LoadingIcon';
import Section from '../Section';
import InfoMessage from '../InfoMessage';
import SearchBar from './SearchBar';

const windowWidth = Dimensions.get('window').width;

export default function Times() {

    const { user, logged } = useUserContext();
    const [favorite, setFavorite] = useState<TeamCardI[] | undefined>();
    const [teams, setTeams] = useState<TeamCardI[]>();
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
            setFavorite(response.data.favorite_team);
            setTeams(response.data.teams);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar times.');
        }).finally(() => {
            setLoading(false);
        });
    }

    async function searchTeams() {
        
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <SearchBar handleSearch={searchTeams}/>

                <Section
                    text='Favorito'
                    icon={{
                        IconComponent: FilledStar,
                        width: 27,
                        height: 27,
                        style: styles.starIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                    }}
                >
                    {favorite ? (
                        favorite.map((team, index) => (
                            <TeamCard {...team} key={index} />
                        ))
                    ) : (
                        <InfoMessage text='Favorite um time para que ele apareça aqui.'/>
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
                        lightColor: Colors.light.Red,
                    }}
                    style={{
                        marginBottom: 50
                    }}
                >
                    {teams && teams.length ? (
                        teams.map((team, index) => (
                            <TeamCard  {...team} key={index} />
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