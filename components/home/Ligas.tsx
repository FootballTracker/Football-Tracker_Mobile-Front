import { StyleSheet, Dimensions, View  } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import api from '@/lib/Axios';
import { LeagueCardI } from '../leagues/LeagueCard';
import { useUserContext } from '@/context/UserContext';

import LeaguesSection from '@/components/leagues/LeaguesSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';
import LoadingIcon from '../LoadingIcon';

const windowWidth = Dimensions.get('window').width;

export default function Ligas() {

    const { user, logged } = useUserContext();
    const [favorities, setFavorities] = useState<LeagueCardI[]>();
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
            setFavorities(response.data.favorite_leagues);
            setLeagues(response.data.all_leagues);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar ligas.');
        }).finally(() => {
            setLoading(false);
        });
    }
    
    return (
        !loading ? (
            <ThemedScrollView style={styles.background}>
                <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />

                <View style={styles.content}>

                    <LeaguesSection 
                        text='Favoritas'
                        leagues={favorities}
                        icon={{
                            IconComponent: FilledStar,
                            width: 27,
                            height: 27,
                            style: styles.starIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red,
                        }}
                    />

                    <LeaguesSection 
                        text='Principais'
                        icon={{
                            IconComponent: FontAwesome5,
                            name: 'crown',
                            size: 20,
                            style: styles.crownIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red
                        }}
                        leagues={leagues}
                    />
                </View>
            </ThemedScrollView>
        ): (
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