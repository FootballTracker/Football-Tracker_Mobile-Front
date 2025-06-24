//Default Imports
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import FavoriteStar from "@/components/FavoriteStar";
import LoadingIcon from "@/components/LoadingIcon";
import Section from "@/components/Section";
import SingleInfo from "@/components/SingleInfo";
import { SwapFavorites } from "@/constants/Favorites";
import { useItemsContext } from "@/context/ItemsContext";
import api from "@/lib/Axios";
import { AxiosResponse } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";

//Icon
import Statistics from "@/assets/Icons/Statistics.svg";
import { AnimatedThemedScrollView } from "@/components/DefaultComponents/AnimatedThemedScrollView";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

//Consts
const windowWidth = Dimensions.get('window').width;

//Type
interface matchTeamI {
    name: string,
    logo_url: string,
    score: string,
}

interface playerInMatchI {
    name: string,
    player_url: string,
    team_logo: string,
    player_isfavorite: boolean,
    fixture_id: string,
    jersey_number: string,
    is_starter: string,
    game_minute: string,
    game_number: string,
    position: string,
    game_captain: string,
    game_substitute: string,
    offsides: string,
    shots_total: string,
    shots_on: string,
    goals: string,
    goals_conceded: string,
    assists: string,
    goals_saves: string,
    passes_total: string,
    passes_key: string,
    passes_accuracy: string,
    tackles_total: string,
    tackles_blocks: string,
    tackles_interceptions: string,
    duels_total: string,
    duels_won: string,
    dribbles_attempts: string,
    dribbles_success: string,
    fouls_drawn: string,
    fouls_committed: string,
    cards_yellow: string,
    cards_red: string,
    penalty_won: string,
    penalty_commited: string,
    penalty_scored: string,
    penalty_missed: string,
    penalty_saved: string,
    dribbles_past: string,
    rating: string,
    grid: string,
}

interface playerInMatchResponse {
    home_team: matchTeamI,
    away_team: matchTeamI,
    player_stats: playerInMatchI
}

export default function PlayerMatch() {
    const { theme } = useTheme();
    const { matchId, playerId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [player, setPlayer] = useState<playerInMatchI>();
    const scrollY = useRef<any>(new Animated.Value(0)).current;
    const scrollValue = useRef(0);
    const scrollRef = useRef<ScrollView>(null);
    const animationHeight = 165;

    const animatedOpacity = scrollY.interpolate({
        inputRange: [0, animationHeight * 0.8],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const animatedPlayerTextTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -158],
        extrapolate: 'clamp',
    });

    const animatedTeamImageTranslateY = scrollY.interpolate({
        inputRange: [animationHeight * 0.6, animationHeight],
        outputRange: [0, -10],
        extrapolate: 'clamp',
    });

    const animatedTeamImageOpacity = scrollY.interpolate({
        inputRange: [animationHeight * 0.6, animationHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const animatedPhotoTranslateX = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -155],
        extrapolate: 'clamp',
    });

    const animatedPhotoTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -79],
        extrapolate: 'clamp',
    });
    
    const animatedPhotoScale = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [1, .3],
        extrapolate: 'clamp',
    });
    
    const animatedStatisticsTransalteY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -165],
        extrapolate: 'clamp',
    });

    const animatedStyles = StyleSheet.create({
        photo: {
            transform: [
                {translateX: animatedPhotoTranslateX},
                {translateY: animatedPhotoTranslateY},
                {scale: animatedPhotoScale},
            ],
        },
        teamImage: {
            transform: [
                {translateY: animatedTeamImageTranslateY},
            ],
            opacity: animatedTeamImageOpacity,
        },
        playerText: {
            transform: [
                {translateY: animatedPlayerTextTranslateY},
            ],
        },
        opacity: {
            opacity: animatedOpacity,
        },
        statistics: {
            transform: [
                {translateY: animatedStatisticsTransalteY},
            ],
        },
    });

    const onScrollHandler = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    const handleValidScrollPoints = () => {
        
        if (scrollValue.current <= 84) {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }

        else if(scrollValue.current <= 168) {
            scrollRef.current?.scrollTo({
                y: 168,
                animated: true,
            });
        }
    };

    useEffect(() => {
        const listenerId = scrollY.addListener((v: any) => {
            scrollValue.current = v.value;
        });

        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY]);

    //search match
    useEffect(() => {
        getMatch();
    }, []);

    async function getMatch() {
        await api.get(`/get_player_match_statistics/${matchId}/player/${playerId}`
        ).then((response: AxiosResponse<playerInMatchResponse>) => {
            setPlayer(response.data.player_stats);
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

    const accessPlayer = () => {
        router.push(`/(pages)/player/${playerId}` as any);;
    }

    return (
        contentLoaded && player ? (
            <AnimatedThemedScrollView scrollRef={scrollRef} stickyHeaderIndices={[0]} style={{flex: 1}} scrollEventThrottle={16} onScroll={onScrollHandler} onMomentumScrollEnd={handleValidScrollPoints}>
                <View style={{display: 'flex', alignItems: 'center', gap: 5}}>
                    <ThemedView style={{width: windowWidth * 0.95, height: 80, position: 'absolute'}} />
                    
                    <Animated.Image resizeMode='contain' source={{uri: player?.team_logo}} style={[styles.teamLogo, animatedStyles.teamImage]} />

                    <ThemedText style={[styles.text, animatedStyles.opacity, {marginTop: 10}]} >Pontuação: {player?.rating}</ThemedText>

                    <Animated.View style={[animatedStyles.photo, {alignItems: 'center'}]}>
                            <Pressable onPress={accessPlayer}>
                                <Image resizeMode='contain' source={{uri: player?.player_url}} style={styles.playerPhoto} />
                            </Pressable>
                    </Animated.View>

                    <ThemedText style={[styles.text, animatedStyles.playerText]} onPress={accessPlayer} >{player?.name} - {player?.jersey_number}</ThemedText>

                    <Animated.View style={[styles.statistics, animatedStyles.statistics]}>
                        <ThemedView>
                            <ThemedText style={[styles.text, styles.statisticsText]}>Estatísticas na partida</ThemedText>
                            <ThemedView colorName="Red" style={styles.statisticsLine}/>
                        </ThemedView>
                    </Animated.View>
                </View>

                {/* <Section style={{marginBottom: 70}} icon={{IconComponent: Statistics}} text="Estatísticas"> */}
                <Section style={{marginBottom: 50, marginTop: 0}}>
                    <SingleInfo infoName='Minutos jogados: ' info={player.game_minute ?? '0'} />
                    <SingleInfo infoName='Impedimentos: ' info={player.offsides ?? '0'} />
                    <SingleInfo infoName='Total de chutes: ' info={player.shots_total ?? '0'} />
                    <SingleInfo infoName='Chutes no gol: ' info={player.shots_on ?? '0'} />
                    <SingleInfo infoName='Gols: ' info={player.goals ?? '0'} />
                    <SingleInfo infoName='Chutes: ' info={player.shots_total ?? '0'} />
                    <SingleInfo infoName='Chutes no gol: ' info={player.shots_on ?? '0'} />
                    <SingleInfo infoName='Assistências: ' info={player.assists ?? '0'} />
                    <SingleInfo infoName='Gols concedidos: ' info={player.goals_conceded ?? '0'} />
                    <SingleInfo infoName='Defesas: ' info={player.goals_saves ?? '0'} />
                    <SingleInfo infoName='Passes: ' info={player.passes_total ?? '0'} />
                    <SingleInfo infoName='Passes chave: ' info={player.passes_key ?? '0'} />
                    <SingleInfo infoName='Precisão: ' info={player.passes_accuracy ?? '0'} />
                    <SingleInfo infoName='Tackles: ' info={player.tackles_total ?? '0'} />
                    <SingleInfo infoName='Bloqueios: ' info={player.tackles_blocks ?? '0'} />
                    <SingleInfo infoName='Interceptações: ' info={player.tackles_interceptions ?? '0'} />
                    <SingleInfo infoName='Duelos: ' info={player.duels_total ?? '0'} />
                    <SingleInfo infoName='Duelos vencidos: ' info={player.duels_won ?? '0'} />
                    <SingleInfo infoName='Tentativas de drible: ' info={player.dribbles_attempts ?? '0'} />
                    <SingleInfo infoName='Dribles completos: ' info={player.dribbles_success ?? '0'} />
                    <SingleInfo infoName='Dribles adversários impedidos: ' info={player.dribbles_past ?? '0'} />
                    <SingleInfo infoName='Faltas sofridas: ' info={player.fouls_drawn ?? '0'} />
                    <SingleInfo infoName='Faltas cometidas: ' info={player.fouls_committed ?? '0'} />
                    <SingleInfo infoName='Cartões amarelos: ' info={player.cards_yellow ?? '0'} />
                    <SingleInfo infoName='Cartões vermelhos: ' info={player.cards_red ?? '0'} />
                    <SingleInfo infoName='Pênaltis sofridos: ' info={player.penalty_won ?? '0'} />
                    <SingleInfo infoName='Pênaltis cometidos: ' info={player.penalty_commited ?? '0'} />
                    <SingleInfo infoName='Gols de pênalti: ' info={player.penalty_scored ?? '0'} />
                    <SingleInfo infoName='Pênaltis perdidos: ' info={player.penalty_missed ?? '0'} />
                    <SingleInfo infoName='Pênaltis salvos: ' info={player.penalty_saved ?? '0'} />
                </Section>
            </AnimatedThemedScrollView>
        ) : (
            <LoadingIcon />
        )
    );
}

const styles = StyleSheet.create({
    playerPhoto: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    teamLogo: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        right: 10,
        width: 36,
        height: 36,
    },
    text: {
        fontFamily: 'Kdam',
        fontSize: 20,
        textAlign: 'center',
    },
    centerView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statistics: {
        marginTop: 20,
    },
    statisticsText: {
        textAlign: 'center',
        fontFamily: 'Karla',
    },
    statisticsLine: {
        height: .6,
        width: windowWidth * 0.9,
        marginTop: 5,
    },
});