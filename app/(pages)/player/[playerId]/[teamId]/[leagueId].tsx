import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Toast } from 'toastify-react-native';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { Image, Pressable } from 'react-native';
import Section from '@/components/Section';
import InfoMessage from '@/components/InfoMessage';
import LoadingIcon from '@/components/LoadingIcon';
import SingleInfo from '@/components/SingleInfo';

interface PlayerStats {
    team: {
        api_id: string,
        name: string,
        logo_url: string,
    },
    league: {
        id: string,
        name: string,
        season: string,
        logo_url: string,
    },
    player_stats: {
        rating: string,
        appearances: string,
        minutes: string,
        lineups: string,
        position: string,
        captain: boolean,
        goals: string,
        assists: string,
        goals_saves: string,
        goals_conceded: string,
        shots_total: string,
        shots_on: string,
        passes_total: string,
        passes_key: string,
        passes_accuracy: string,
        fouls_drawn: string,
        fouls_committed: string,
        tackles_total: string,
        tackles_blocks: string,
        tackles_interceptions: string,
        cards_yellow: string,
        cards_red: string,
        duels_total: string,
        duels_won: string,
        dribbles_attempts: string,
        dribbles_completed: string,
        penalty_scored: string,
        penalty_missed: string
        penalty_saved: string,
        penalty_won: string,
        penalty_commited: string,
        substitute_in: string,
        substitutes_out: string,
    }
}

export default function PlayerTeamLeagueStats() {
    const { playerId, teamId, leagueId } = useLocalSearchParams();
    const [playerStats, setPlayerStats] = useState<PlayerStats | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlayerStats();
    }, []);

    async function getPlayerStats() {
        await api.get(`player/${playerId}/team/${teamId}/league/${leagueId}/stats`)
        .then((response) => {
            setPlayerStats(response.data);
        }).catch((error) => {
            if(error.response.data.ok) {
                Toast.show({
                    props: {
                        type: "warn",
                        text: "Não há dados disponíveis do jogador para essa liga"
                    }
                });
            } else if(error.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: error.response.data.detail
                    }
                });
            } else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao carregar dados do jogador"
                    }
                });
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    function accessTeam() {
        router.push(`/(pages)/team/${playerStats?.team.api_id}` as any)
    }

    function accessLeague() {
        router.push(`/(pages)/league/${playerStats?.league.id}` as any)
    }

    return (
        !loading ? (
            playerStats ? (
                    <ThemedScrollView>
                        
                        <Pressable style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, gap: 10}} onPress={accessTeam}>
                            <Image source={{uri: playerStats.team.logo_url}} resizeMode='contain' width={40} height={40}/>
                            <ThemedText style={{fontSize: 18}}>{playerStats.team.name}</ThemedText>
                        </Pressable>

                        <Pressable style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, gap: 10}} onPress={accessLeague}>
                            <Image source={{uri: playerStats.league.logo_url}} resizeMode='contain' width={30} height={30}/>
                            <ThemedText style={{fontSize: 14}}>{playerStats.league.name} - {playerStats.league.season}</ThemedText>
                        </Pressable>

                        <Section style={{marginBottom: 50, marginTop: 5}}>
                            <SingleInfo infoName='Nota: ' info={playerStats.player_stats.rating ?? 'Desconhecida'} />
                            <SingleInfo infoName='Partidas: ' info={playerStats.player_stats.appearances ?? '0'} />
                            <SingleInfo infoName='Minutos jogados: ' info={playerStats.player_stats.minutes ?? '0'} />
                            <SingleInfo infoName='Titular: ' info={playerStats.player_stats.lineups ?? '0'} />
                            <SingleInfo infoName='Posição: ' info={playerStats.player_stats.position ?? 'Desconhecida'} />
                            <SingleInfo infoName='Capitão: ' info={playerStats.player_stats.captain ? 'Sim' : 'Não'} />
                            <SingleInfo infoName='Gols: ' info={playerStats.player_stats.goals ?? '0'} />
                            <SingleInfo infoName='Assistências: ' info={playerStats.player_stats.assists ?? '0'} />
                            <SingleInfo infoName='Defesas: ' info={playerStats.player_stats.goals_saves ?? '0'} />
                            <SingleInfo infoName='Gols concedidos: ' info={playerStats.player_stats.goals_conceded ?? '0'} />
                            <SingleInfo infoName='Total de chutes: ' info={playerStats.player_stats.shots_total ?? '0'} />
                            <SingleInfo infoName='Chutes no gol: ' info={playerStats.player_stats.shots_on ?? '0'} />
                            <SingleInfo infoName='Passes: ' info={playerStats.player_stats.passes_total ?? '0'} />
                            <SingleInfo infoName='Passes chave: ' info={playerStats.player_stats.passes_key ?? '0'} />
                            <SingleInfo infoName='Precisão dos passes: ' info={playerStats.player_stats.passes_accuracy !== "None" ? `${playerStats.player_stats.passes_accuracy}%` : 'Desconhecida'} />
                            <SingleInfo infoName='Faltas sofridas: ' info={playerStats.player_stats.fouls_drawn ?? '0'} />
                            <SingleInfo infoName='Faltas cometidas: ' info={playerStats.player_stats.fouls_committed ?? '0'} />
                            <SingleInfo infoName='Tackles: ' info={playerStats.player_stats.tackles_total ?? '0'} />
                            <SingleInfo infoName='Bloqueios: ' info={playerStats.player_stats.tackles_blocks ?? '0'} />
                            <SingleInfo infoName='Interceptações: ' info={playerStats.player_stats.tackles_interceptions ?? '0'} />
                            <SingleInfo infoName='Cartões amarelos: ' info={playerStats.player_stats.cards_yellow ?? '0'} />
                            <SingleInfo infoName='Cartões vermelhos: ' info={playerStats.player_stats.cards_red ?? '0'} />
                            <SingleInfo infoName='Duelos: ' info={playerStats.player_stats.duels_total ?? '0'} />
                            <SingleInfo infoName='Duelos vencidos: ' info={playerStats.player_stats.duels_won ?? '0'} />
                            <SingleInfo infoName='Tentativas de drible: ' info={playerStats.player_stats.dribbles_attempts ?? '0'} />
                            <SingleInfo infoName='Dribles completos: ' info={playerStats.player_stats.dribbles_completed ?? '0'} />
                            <SingleInfo infoName='Gols de pênalti: ' info={playerStats.player_stats.penalty_scored ?? '0'} />
                            <SingleInfo infoName='Pênaltis perdidos: ' info={playerStats.player_stats.penalty_missed ?? '0'} />
                            <SingleInfo infoName='Pênaltis salvos: ' info={playerStats.player_stats.penalty_saved ?? '0'} />
                            <SingleInfo infoName='Pênaltis sofridos: ' info={playerStats.player_stats.penalty_won ?? '0'} />
                            <SingleInfo infoName='Pênaltis cometidos: ' info={playerStats.player_stats.penalty_commited ?? '0'} />
                            <SingleInfo infoName='Substituições entrando: ' info={playerStats.player_stats.substitute_in ?? '0'} />
                            <SingleInfo infoName='Substituições saindo: ' info={playerStats.player_stats.substitutes_out ?? '0'} />
                        </Section>
                    </ThemedScrollView>
                ) : (
                    <ThemedView style={{flex: 1, alignItems: "center"}}>
                        <InfoMessage text="Não foi possível carregar as estatísticas do jogador" style={{marginTop: 50}}/>
                    </ThemedView>
                )
        ) : (
            <LoadingIcon />
        )
    )
}