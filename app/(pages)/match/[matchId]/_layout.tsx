//Default Imports
import { router, useLocalSearchParams } from 'expo-router';
import { MatchI, useMatch } from '@/context/MatchContext';
import { formatDate, formatTime } from '@/lib/format';
import { Animated, StyleSheet } from 'react-native';
import { Toast } from 'toastify-react-native';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import api from '@/lib/Axios';

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import LoadingIcon from '@/components/LoadingIcon';
import { Pressable, View } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
    const { matchId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const { match, setMatch, setIndex, animatedStyles } = useMatch();
    const [result, setResult] = useState<number>();

    //search match
    useEffect(() => {
        getMatch();
        setIndex(0);
    }, []);

    async function getMatch() {
        await api.get(`match/${matchId}`
        ).then((response: AxiosResponse<MatchI>) => {
            setMatch(response.data);
            setResult(response.data.match.home_team.score == response.data.match.away_team.score ? 1 : Number(response.data.match.home_team.score) > Number(response.data.match.away_team.score) ? 0 : 2);
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar partida"
                    }
                });
            }
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

                <Animated.View style={[{zIndex: 1}, animatedStyles.tabView]}>
                    <ThemedView colorName='LightBackground' style={{height: 1}}></ThemedView>
                </Animated.View>
                
                <Animated.View style={[{flex: 1, marginBottom: 10}, animatedStyles.tabView]}>
                    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}/>
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