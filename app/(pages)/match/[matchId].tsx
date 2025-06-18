import { Image, StyleSheet, View, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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

export interface TeamStatistics {
    shotsOnGoal: number;
    shotsOffGoal: number;
    shotsInsidebox: number;
    shotsOutsidebox: number;
    totalShots: number;
    blockedShots: number;
    fouls: number;
    cornerKicks: number;
    offsides: number;
    ballPossession: string;
    yellowCards: number;
    redCards: number;
    goalkeeperSaves: number;
    totalPasses: number;
    passesAccurate: number;
    passesPercentage: string;
}

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
    statistics: {
        home_team: TeamStatistics;
        away_team: TeamStatistics;
    } | null,
}

export default function Match() {
    const { matchId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [index, setIndex] = useState(0); //initial route index
    const [match, setMatch] = useState<MatchI>();
    const [result, setResult] = useState<number>();

    const animationDuration = 150;
    const nativeDriver = true;

    const defaultTeamLogoTranslateY = 0;
    const changedTeamLogoTranslateY = -15;
    const defaultLeftTeamLogoTranslateX = 0;
    const changedLeftTeamLogoTranslateX = 35;
    const defaultRightTeamLogoTranslateX = 0;
    const changedRightTeamLogoTranslateX = -35;
    const defaultReamLogoScale = 1;
    const changedReamLogoScale = .8;
    const defaultOpacity = 1;
    const changedOpacity = 0;
    const defaultResultTranslateY = 0;
    const changedResultTranslateY = -25;
    const defaultTabViewMarginTop = 80;
    const changedTabViewMarginTop = 10;

    const teamLogoTranslateY = useRef(new Animated.Value(defaultTeamLogoTranslateY)).current;
    const leftTeamLogoTranslateX = useRef(new Animated.Value(defaultLeftTeamLogoTranslateX)).current;
    const rightTeamLogoTranslateX = useRef(new Animated.Value(defaultRightTeamLogoTranslateX)).current;
    const teamLogoScale = useRef(new Animated.Value(defaultReamLogoScale)).current;
    const opacity = useRef(new Animated.Value(defaultOpacity)).current;
    const resultTranslateY = useRef(new Animated.Value(defaultResultTranslateY)).current;
    const tabViewMarginTop = useRef(new Animated.Value(defaultTabViewMarginTop)).current;

    useEffect(() => {
        if(index) {
            Animated.parallel([
                Animated.timing(teamLogoTranslateY, {
                    toValue: changedTeamLogoTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(leftTeamLogoTranslateX, {
                    toValue: changedLeftTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(rightTeamLogoTranslateX, {
                    toValue: changedRightTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(teamLogoScale, {
                    toValue: changedReamLogoScale,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(opacity, {
                    toValue: changedOpacity,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(resultTranslateY, {
                    toValue: changedResultTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(tabViewMarginTop, {
                    toValue: changedTabViewMarginTop,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.timing(teamLogoTranslateY, {
                    toValue: defaultTeamLogoTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(leftTeamLogoTranslateX, {
                    toValue: defaultLeftTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(rightTeamLogoTranslateX, {
                    toValue: defaultRightTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(teamLogoScale, {
                    toValue: defaultReamLogoScale,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(opacity, {
                    toValue: defaultOpacity,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(resultTranslateY, {
                    toValue: defaultResultTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(tabViewMarginTop, {
                    toValue: defaultTabViewMarginTop,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
            ]).start();
        }
    }, [index]);

    //search match
    useEffect(() => {
        getMatch();
    }, []);
    
    //routes to render
    const [routes] = useState([
        { key: 'informacoes', title: 'Informações' },
        { key: 'estatisticas', title: 'Estatísticas' },
        { key: 'eventos', title: 'Eventos' },
        { key: 'escalacoes', title: 'Escalações' },
    ]);

    const animatedStyles = StyleSheet.create({
        rightTeamLogo: {
            transform: [
                {translateY: teamLogoTranslateY},
                {translateX: leftTeamLogoTranslateX},
                {scale: teamLogoScale},
            ],
        },
        leftTeamLogo: {
            transform: [
                {translateY: teamLogoTranslateY},
                {translateX: rightTeamLogoTranslateX},
                {scale: teamLogoScale},
            ],
        },
        text: {
            opacity: opacity,
            transform: [
                {translateY: teamLogoTranslateY},
            ],
        },
        result: {
            transform: [
                {translateY: resultTranslateY},
            ],
        },
        tabView: {
            transform: [
                {translateY: tabViewMarginTop},
            ],
        },
    })

    const renderScene = ({ route }: any) => {
        if(!match) return;

        switch (route.key) {
            case 'informacoes':
                return <MatchInfo {...match.info}/>;
            case 'estatisticas':
                return <MatchStatistcs match={match.match} home_team={match.statistics ? match.statistics.home_team : undefined} away_team={match.statistics ? match.statistics.away_team : undefined} />;
            case 'eventos':
                return <MatchEvents match={match.match} />;
            case 'escalacoes':
                return <MatchLineup match={match.match}/>;
            default:
                return null;
        }
    };

    async function getMatch() {
        await api.get(`match/${matchId}`
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
        id && router.push(`/(pages)/team/${id}`);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <Animated.View style={styles.header}>

                    <Pressable onPress={() => accessTeam(match?.match.home_team.id)}>
                        <View style={[styles.teamView, result === 2 && styles.loser]}>
                            <Animated.Image source={{uri: match?.match.home_team.logo}} style={[styles.teamLogo, animatedStyles.rightTeamLogo]} resizeMode='contain'/>
                            <ThemedText style={[styles.teamName, animatedStyles.text]} numberOfLines={1} ellipsizeMode='tail'>{match?.match.home_team.name}</ThemedText>
                        </View>
                    </Pressable>

                    <View style={styles.timeAndResultView}>
                        <ThemedText colorName='Red' style={[styles.timeText, animatedStyles.text]}>
                            {match?.match.date && formatTime(match.match.date)}
                        </ThemedText>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <ThemedText style={[styles.result, result === 2 && styles.loser, animatedStyles.result]}>{match?.match.home_team.score} </ThemedText>
                            <ThemedText style={[styles.result, animatedStyles.result]}>x</ThemedText>
                            <ThemedText style={[styles.result, result === 0 && styles.loser, animatedStyles.result]}> {match?.match.away_team.score}</ThemedText>
                        </View>
                        <ThemedText colorName='Red' style={[styles.timeText, animatedStyles.text]}>
                            {match?.match.date && formatDate(match.match.date)}
                        </ThemedText>
                    </View>
                    
                    <Pressable onPress={() => accessTeam(match?.match.away_team.id)}>
                        <View style={[styles.teamView, result === 0 && styles.loser]}>
                            <Animated.Image source={{uri:  match?.match.away_team.logo}} style={[styles.teamLogo, animatedStyles.leftTeamLogo]} resizeMode='contain'/>
                            <ThemedText style={[styles.teamName, animatedStyles.text]} numberOfLines={1} ellipsizeMode='tail'>{match?.match.away_team.name}</ThemedText>
                        </View>
                    </Pressable>

                </Animated.View>
                
                <Animated.View style={[{flex: 1, marginBottom: 10}, animatedStyles.tabView]}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        renderTabBar={props => (
                            <CustomTabBar {...props} />
                        )}
                        style={{top: 25}}
                        lazy
                        lazyPreloadDistance={1}
                        renderLazyPlaceholder={() => (
                            <View style={{height: 500, width: "100%"}}>
                                <LoadingIcon />
                            </View>
                            )
                        }
                    />
                </Animated.View>
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
        position: 'absolute',
        paddingTop: 25,
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
        countryFlag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: 23
    },
    statistics: {
        home_team: {
            shotsOnGoal: 7,
            shotsOffGoal: 16,
            shotsInsidebox: 28,
            shotsOutsidebox: 5,
            totalShots: 18,
            blockedShots: 10,
            fouls: 10,
            cornerKicks: 7,
            offsides: 0,
            ballPossession: '73%',
            yellowCards: 0,
            redCards: 0,
            goalkeeperSaves: 2,
            totalPasses: 591,
            passesAccurate: 504,
            passesPercentage: '1',
        },
        away_team: {
            shotsOnGoal: 3,
            shotsOffGoal: 2,
            shotsInsidebox: 5,
            shotsOutsidebox: 0,
            totalShots: 1,
            blockedShots: 4,
            fouls: 13,
            cornerKicks: 0,
            offsides: 2,
            ballPossession: '27%',
            yellowCards: 0,
            redCards: 0,
            goalkeeperSaves: 7,
            totalPasses: 233,
            passesAccurate: 147,
            passesPercentage: '63%',
        }
    },
}