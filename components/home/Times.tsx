import { StyleSheet, Dimensions, View  } from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import { TeamCardI } from '../teams/TeamCard';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';

import TeamSection from '@/components/teams/TeamSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';
import LoadingIcon from '../LoadingIcon';

const windowWidth = Dimensions.get('window').width;

export default function Times() {

    const { user, logged } = useUserContext();
    const [favoritie, setFavoritie] = useState<TeamCardI[] | undefined>();
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
            setFavoritie(response.data.favorite_team);
            setTeams(response.data.teams);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar times.');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />

                <View style={styles.content}>

                    <TeamSection 
                        text='Favorito'
                        teams={favoritie}
                        icon={{
                            IconComponent: FilledStar,
                            width: 27,
                            height: 27,
                            style: styles.starIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red,
                        }}
                    />

                    <TeamSection 
                        text='Principais'
                        icon={{
                            IconComponent: FontAwesome5,
                            name: 'crown',
                            size: 20,
                            style: styles.crownIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red
                        }}
                        teams={teams}
                    />
                </View>
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