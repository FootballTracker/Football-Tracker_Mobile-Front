import { Image, StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView } from 'react-native-tab-view';
import api from '@/lib/Axios';
import { formatDate, formatTime } from '@/lib/format';
import { MatchCardI } from '@/components/matches/MatchCard';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import MatchInfo from '@/components/matches/pageComponents/MatchInfo';
import MatchStatistcs from '@/components/matches/pageComponents/MatchStatistcs';
import MatchEvents from '@/components/matches/pageComponents/MatchEvents';
import MatchLineup from '@/components/matches/pageComponents/MatchLineup';
import { AxiosResponse } from 'axios';

interface MatchI {
    match: MatchCardI;
    info: {
        referee: string;
        venue: string;
        city: string;
        status: string;
        matchTime: string;
        league: string;
        leagueLogo: string;
        country: string;
        countryFlag: string;
        season: number;
        round: number;
    }
}

const data: MatchI = {
    match: {
        id: 1,
        home_team: {
            id: 1062,
            name: "Atlético-MG",
            logo: "https://media.api-sports.io/football/teams/1062.png",
            score: 0
        },
        away_team: {
            id: 151,
            name: "Goiás",
            logo: "https://media.api-sports.io/football/teams/151.png",
            score: 1
        },
        date: "2022-08-20T19:30:00"
    },
    info: {
        referee: "Vinicius Gonçalves Dias Araujo",
        venue: "Estádio Governador Magalhães Pinto",
        city: "Belo Horizonte, Minas Gerais",
        status: "Match Finished",
        matchTime: "90 min",
        league: "Serie A",
        leagueLogo: "https://media.api-sports.io/football/leagues/71.png",
        country: "Brazil",
        countryFlag: "https://media.api-sports.io/football/contries/5.png",
        season: 2022,
        round: 23
    }
}

export default function Match() {
    const { matchId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(true);
    const [index, setIndex] = useState(0); //initial route index
    const [match, setMatch] = useState<MatchI>(data);
    const [result, setResult] = useState<number | undefined>(2);
    
    //routes to render
    const [routes] = useState([
        { key: 'informacoes', title: 'Informações' },
        { key: 'estatisticas', title: 'Estatísticas' },
        { key: 'eventos', title: 'Eventos' },
        { key: 'escalacoes', title: 'Escalações' },
    ]);

    const renderScene = ({ route }: any) => {

        if(!match) return;

        switch (route.key) {
            case 'informacoes':
                return <MatchInfo />;
            case 'estatisticas':
                return <MatchStatistcs />;
            case 'eventos':
                return <MatchEvents />;
            case 'escalacoes':
                return <MatchLineup />;
            default:
                return null;
        }
    };

    //search match
    useEffect(() => {
        // getMatch();
    }, []);

    async function getMatch() {
        await api.get('match', {
            params: {
                match_id: Number(matchId)
            }}
        ).then((response: AxiosResponse<MatchI>) => {
            setMatch(response.data);
            setResult(response.data.match.home_team.score == response.data.match.away_team.score ? 1 : Number(response.data.match.home_team.score) > Number(response.data.match.away_team.score) ? 0 : 2);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar partida.');
        }).finally(() => {
            setContentLoaded(true);
        });
    }

    function accessTeam(id?: number) {
        console.log("aqui");
        id && router.push(`/(pages)/team/${id}`);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <View style={styles.header}>

                    <Pressable onPress={() => accessTeam(match?.match.home_team.id)}>
                        <View style={[styles.teamView, result === 2 && styles.loser]}>
                            <Image source={{uri: match?.match.home_team.logo}} style={styles.teamLogo} resizeMode='contain'/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{match?.match.home_team.name}</ThemedText>
                        </View>
                    </Pressable>

                    <View style={styles.timeAndResultView}>
                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.timeText}>
                            {match?.match.date && formatTime(match.match.date)}
                        </ThemedText>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <ThemedText style={[styles.result, result === 2 && styles.loser]}>{match?.match.home_team.score} </ThemedText>
                            <ThemedText style={styles.result}>x</ThemedText>
                            <ThemedText style={[styles.result, result === 0 && styles.loser]}> {match?.match.away_team.score}</ThemedText>
                        </View>
                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.timeText}>
                            {match?.match.date && formatDate(match.match.date)}
                        </ThemedText>
                    </View>
                    
                    <Pressable onPress={() => accessTeam(match?.match.away_team.id)}>
                        <View style={[styles.teamView, result === 0 && styles.loser]}>
                            <Image source={{uri:  match?.match.away_team.logo}} style={styles.teamLogo} resizeMode='contain'/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{match?.match.away_team.name}</ThemedText>
                        </View>
                    </Pressable>

                </View>
                
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                        <CustomTabBar {...props} />
                    )}
                    style={{
                        top: 25
                    }}
                    lazy
                    renderLazyPlaceholder={() => (
                        <View>
                            <LoadingIcon />
                        </View>
                        )
                    }
                />
            </ThemedView>
        ) : (
            <LoadingIcon />
        )

    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 25,
    },
    teamView: {
        alignItems: "center",
        gap: 8,
        width: 110,
    },
    teamLogo: {
        width: 45,
        height: 45,
    },
    teamName: {
        fontSize: 17.5,
        fontFamily: "Kdam",
        marginTop: -5,
    },
    loser: {
        opacity: 0.6,
    },
    timeAndResultView: {
        alignItems: "center",
        marginTop: 3,
    },
    timeText: {
        fontSize: 11,
        height: 13,
        fontWeight: "700",
    },
    result: {
        fontFamily: "Kdam",
        fontSize: 18,
        height: 32,
    },
});