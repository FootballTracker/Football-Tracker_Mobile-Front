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
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";

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
    const { matchId, playerId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [player, setPlayer] = useState<playerInMatchI>();

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
            <ThemedScrollView style={styles.background}>
                <View style={{display: 'flex', alignItems: 'center', gap: 5}}>
                    <ThemedText style={styles.text} >Score: {player?.rating}</ThemedText>

                    <Pressable onPress={accessPlayer}>
                        <Image source={{uri: player?.player_url}} style={styles.playerPhoto} />
                    </Pressable>

                    <View style={[styles.centerView, {gap: 10}]}>
                        <Image source={{uri: player?.team_logo}} style={styles.teamLogo} />
                        <ThemedText style={styles.text} onPress={accessPlayer} >{player?.name} - {player?.jersey_number}</ThemedText>
                    </View>
                </View>

                <Section style={{marginBottom: 80}}>
                    <ThemedText style={[styles.text, {textAlign: 'center', fontFamily: 'Karla'}]}>Estatísticas</ThemedText>
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
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1
    },
    playerPhoto: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    teamLogo: {
        width: 25,
        height: 25,
    },
    text: {
        fontFamily: 'Kdam',
        fontSize: 20,
    },
    centerView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});