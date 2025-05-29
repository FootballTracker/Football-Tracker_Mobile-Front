import { useEffect, useState, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import api from "@/lib/Axios"
import { LeagueTableProps } from '../table/LeagueTable';

import LoadingIcon from '@/components/LoadingIcon';
import LeagueTable from '../table/LeagueTable';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

interface LigaClassificacaoProps {
    season: number
    leagueId: number
}

function LigaClassificacao({ season, leagueId } : LigaClassificacaoProps) {

    const [classi, setClassi] = useState<LeagueTableProps>();

    useEffect(() => {
        return;
        if(season === -1) return;
        getClassi();
    }, [season]);


    async function getClassi() {
        setClassi(undefined);
        
        await api.get('classification', {
            params: {
                id: leagueId,
                season: season
            }}
        ).then((response: any) => {
            setClassi(response.data);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar partidas.');
        });
    }

    return (
        <ThemedView style={{top: 25}}>

            <View style={styles.content}>
                { classi ?
                    <View>
                        <LoadingIcon />
                    </View> 
                :
                    <>
                        <LeagueTable 
                            teams={[
                                {
                                    rank: "1",
                                    teamName: "Palmeiras",
                                    teamLogo: "https://media.api-sports.io/football/teams/121.png",
                                    totalGames: "38",
                                    victories: "23",
                                    draws: "12",
                                    loses: "3",
                                    goalsFor: "66",
                                    goalsAgainst: "27",
                                    goalsDiff: "39",
                                    points: "81"
                                },
                                {
                                    rank: "2",
                                    teamName: "Internacional",
                                    teamLogo: "https://media.api-sports.io/football/teams/119.png",
                                    totalGames: "38",
                                    victories: "20",
                                    draws: "13",
                                    loses: "5",
                                    goalsFor: "58",
                                    goalsAgainst: "31",
                                    goalsDiff: "27",
                                    points: "73"
                                },
                                {
                                    rank: "3",
                                    teamName: "Fluminense",
                                    teamLogo: "https://media.api-sports.io/football/teams/124.png",
                                    totalGames: "38",
                                    victories: "21",
                                    draws: "7",
                                    loses: "10",
                                    goalsFor: "63",
                                    goalsAgainst: "41",
                                    goalsDiff: "22",
                                    points: "70"
                                },
                                {
                                    rank: "4",
                                    teamName: "Corinthians",
                                    teamLogo: "https://media.api-sports.io/football/teams/131.png",
                                    totalGames: "38",
                                    victories: "18",
                                    draws: "11",
                                    loses: "9",
                                    goalsFor: "44",
                                    goalsAgainst: "36",
                                    goalsDiff: "8",
                                    points: "65"
                                },
                                {
                                    rank: "5",
                                    teamName: "Palmeiras",
                                    teamLogo: "https://media.api-sports.io/football/teams/121.png",
                                    totalGames: "38",
                                    victories: "23",
                                    draws: "12",
                                    loses: "3",
                                    goalsFor: "66",
                                    goalsAgainst: "27",
                                    goalsDiff: "39",
                                    points: "81"
                                },
                                {
                                    rank: "6",
                                    teamName: "Internacional",
                                    teamLogo: "https://media.api-sports.io/football/teams/119.png",
                                    totalGames: "38",
                                    victories: "20",
                                    draws: "13",
                                    loses: "5",
                                    goalsFor: "58",
                                    goalsAgainst: "31",
                                    goalsDiff: "27",
                                    points: "73"
                                },
                                {
                                    rank: "7",
                                    teamName: "Fluminense",
                                    teamLogo: "https://media.api-sports.io/football/teams/124.png",
                                    totalGames: "38",
                                    victories: "21",
                                    draws: "7",
                                    loses: "10",
                                    goalsFor: "63",
                                    goalsAgainst: "41",
                                    goalsDiff: "22",
                                    points: "70"
                                },
                                {
                                    rank: "8",
                                    teamName: "Corinthians",
                                    teamLogo: "https://media.api-sports.io/football/teams/131.png",
                                    totalGames: "38",
                                    victories: "18",
                                    draws: "11",
                                    loses: "9",
                                    goalsFor: "44",
                                    goalsAgainst: "36",
                                    goalsDiff: "8",
                                    points: "65"
                                },
                                {
                                    rank: "9",
                                    teamName: "Palmeiras",
                                    teamLogo: "https://media.api-sports.io/football/teams/121.png",
                                    totalGames: "38",
                                    victories: "23",
                                    draws: "12",
                                    loses: "3",
                                    goalsFor: "66",
                                    goalsAgainst: "27",
                                    goalsDiff: "39",
                                    points: "81"
                                },
                                {
                                    rank: "10",
                                    teamName: "Internacional",
                                    teamLogo: "https://media.api-sports.io/football/teams/119.png",
                                    totalGames: "38",
                                    victories: "20",
                                    draws: "13",
                                    loses: "5",
                                    goalsFor: "58",
                                    goalsAgainst: "31",
                                    goalsDiff: "27",
                                    points: "73"
                                },
                                {
                                    rank: "11",
                                    teamName: "Fluminense",
                                    teamLogo: "https://media.api-sports.io/football/teams/124.png",
                                    totalGames: "38",
                                    victories: "21",
                                    draws: "7",
                                    loses: "10",
                                    goalsFor: "63",
                                    goalsAgainst: "41",
                                    goalsDiff: "22",
                                    points: "70"
                                },
                                {
                                    rank: "12",
                                    teamName: "Corinthians",
                                    teamLogo: "https://media.api-sports.io/football/teams/131.png",
                                    totalGames: "38",
                                    victories: "18",
                                    draws: "11",
                                    loses: "9",
                                    goalsFor: "44",
                                    goalsAgainst: "36",
                                    goalsDiff: "8",
                                    points: "65"
                                },
                                {
                                    rank: "13",
                                    teamName: "Palmeiras",
                                    teamLogo: "https://media.api-sports.io/football/teams/121.png",
                                    totalGames: "38",
                                    victories: "23",
                                    draws: "12",
                                    loses: "3",
                                    goalsFor: "66",
                                    goalsAgainst: "27",
                                    goalsDiff: "39",
                                    points: "81"
                                },
                                {
                                    rank: "14",
                                    teamName: "Internacional",
                                    teamLogo: "https://media.api-sports.io/football/teams/119.png",
                                    totalGames: "38",
                                    victories: "20",
                                    draws: "13",
                                    loses: "5",
                                    goalsFor: "58",
                                    goalsAgainst: "31",
                                    goalsDiff: "27",
                                    points: "73"
                                },
                                {
                                    rank: "15",
                                    teamName: "Fluminense",
                                    teamLogo: "https://media.api-sports.io/football/teams/124.png",
                                    totalGames: "38",
                                    victories: "21",
                                    draws: "7",
                                    loses: "10",
                                    goalsFor: "63",
                                    goalsAgainst: "41",
                                    goalsDiff: "22",
                                    points: "70"
                                },
                                {
                                    rank: "16",
                                    teamName: "Corinthians",
                                    teamLogo: "https://media.api-sports.io/football/teams/131.png",
                                    totalGames: "38",
                                    victories: "18",
                                    draws: "11",
                                    loses: "9",
                                    goalsFor: "44",
                                    goalsAgainst: "36",
                                    goalsDiff: "8",
                                    points: "65"
                                },
                                {
                                    rank: "17",
                                    teamName: "Palmeiras",
                                    teamLogo: "https://media.api-sports.io/football/teams/121.png",
                                    totalGames: "38",
                                    victories: "23",
                                    draws: "12",
                                    loses: "3",
                                    goalsFor: "66",
                                    goalsAgainst: "27",
                                    goalsDiff: "39",
                                    points: "81"
                                },
                                {
                                    rank: "18",
                                    teamName: "Internacional",
                                    teamLogo: "https://media.api-sports.io/football/teams/119.png",
                                    totalGames: "38",
                                    victories: "20",
                                    draws: "13",
                                    loses: "5",
                                    goalsFor: "58",
                                    goalsAgainst: "31",
                                    goalsDiff: "27",
                                    points: "73"
                                },
                                {
                                    rank: "19",
                                    teamName: "Fluminense",
                                    teamLogo: "https://media.api-sports.io/football/teams/124.png",
                                    totalGames: "38",
                                    victories: "21",
                                    draws: "7",
                                    loses: "10",
                                    goalsFor: "63",
                                    goalsAgainst: "41",
                                    goalsDiff: "22",
                                    points: "70"
                                },
                                {
                                    rank: "20",
                                    teamName: "Corinthians",
                                    teamLogo: "https://media.api-sports.io/football/teams/131.png",
                                    totalGames: "38",
                                    victories: "18",
                                    draws: "11",
                                    loses: "9",
                                    goalsFor: "44",
                                    goalsAgainst: "36",
                                    goalsDiff: "8",
                                    points: "65"
                                }
                            ]}
                        />
                    </>
                }
            </View>

        </ThemedView>
    )
}


const styles = StyleSheet.create({
    content: {
        marginBottom: 40
    },
});

// Memoiza o componente para evitar re-renderizações desnecessárias com o TabView
export default memo(LigaClassificacao, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});