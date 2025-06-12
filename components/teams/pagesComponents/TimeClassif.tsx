import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import Record from "@/assets/Icons/Record.svg";
import Statistics from "@/assets/Icons/Statistics.svg";
import Formation from "@/assets/Icons/Formation.svg";

import { Select } from '@/components/Select';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import LoadingIcon from '@/components/LoadingIcon';
import InfoMessage from '@/components/InfoMessage';
import Section from '@/components/Section';
import SingleInfo from '@/components/SingleInfo';

interface TeamClassI {
    id: string
}

interface Leagues {
    id: string;
    name: string;
    seasons: number[];
}

interface Info {
    name: string;
    home: number;
    away: number;
    total: number;
}

interface TeamLeague {
    infos: Info[]
    form: string;
    statistics: {
        mostWinsSeq: number;
        mostDrawsSeq: number;
        mostLosesSeq: number;
        biggestWinHome: string;
        biggestWinAway: string;
        biggestLoseHome: string;
        biggestLoseAway: string;
        mostGoalsForHome: number;
        mostGoalsForAway: number;
        mostGoalsAgainstHome: number
        mostGoalsAgainstAway: number;
        penaltyGoals: number;
        penaltyMisses: number;
    }
    formations: {
        formation: string;
        times: number;
    }[]
}

function TimeClassificacao({ id } : TeamClassI) {
    const { theme } = useTheme();
    const [data, setData] = useState<TeamLeague | undefined>(TeamData);
    const [leagues, setLeagues] = useState<Leagues[] | undefined>(LeaguesData);
    const [loading, setLoading] = useState(true);
    const [leagueModalOpened, setLeagueModalOpened] = useState(false);
    const [leagueSeasonsModalOpened, setLeagueSeasonsModalOpened] = useState(false);
    const [leagueIndex, setLeagueIndex] = useState(0);
    const [seasonIndex, setSeasonIndex] = useState(0);

    function selectLeagueIndex(value: string) {
        setLeagueIndex(Number(value));
        setSeasonIndex(leagues ? leagues[Number(value)].seasons.length-1 : 0);
    }

    function selectSeasonIndex(value: string) {
        setSeasonIndex(Number(value));
    }

    useEffect(() => {
        getLeagues();
        setLoading(false);
    }, []);

    async function getLeagues() {
        
    }

    return (
        !loading ? (
            <ThemedScrollView style={{top: 30}}>
                {leagues ? (
                    <>
                        <View style={styles.selectsView}>
                            <View>
                                <Select modalOpened={leagueModalOpened} setModalOpened={setLeagueModalOpened} setSelected={selectLeagueIndex} title="Selecione uma liga:"
                                    values={leagues.map((league, index) => {
                                        return {
                                            name: league.name,
                                            value: `${index}`
                                        };
                                    })}
                                />
                                <TouchableOpacity onPress={() => setLeagueModalOpened(!leagueModalOpened)}>
                                    <View style={styles.select}>
                                        <Image source={{uri: `https://media.api-sports.io/football/leagues/${leagues[leagueIndex].id}.png`}} width={30} height={35} resizeMode='contain' style={{marginRight: 10}}/>
                                        <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 18}}>
                                            {leagues[leagueIndex].name}
                                        </ThemedText>
                                        <ThemedIcon
                                            IconComponent={MaterialIcons}
                                            name='keyboard-arrow-down'
                                            darkColor={Colors.dark.Text}
                                            lightColor={Colors.light.Text}
                                            size={22}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View>
                                <Select modalOpened={leagueSeasonsModalOpened} setModalOpened={setLeagueSeasonsModalOpened} setSelected={selectSeasonIndex} title={`Selecione uma temporada de ${leagues[leagueIndex].name}:`}
                                    values={leagues[leagueIndex].seasons.map((season, index) => {
                                        return {
                                            name: `${season}`,
                                            value: `${index}`
                                        };
                                    })}
                                />
                                <TouchableOpacity onPress={() => setLeagueSeasonsModalOpened(!leagueSeasonsModalOpened)}>
                                    <View style={styles.select}>
                                        <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 13}}>
                                            {leagues[leagueIndex].seasons[seasonIndex]}
                                        </ThemedText>
                                        <ThemedIcon
                                            IconComponent={MaterialIcons}
                                            name='keyboard-arrow-down'
                                            darkColor={Colors.dark.Text}
                                            lightColor={Colors.light.Text}
                                            size={18}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.table}>
                            <View style={styles.header}>
                                <View style={[styles.leftColumn, {height: "auto"}]}/>
                                <View style={{flex: 1}}>
                                    <View style={styles.rightColumns}>
                                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.tableText}>Casa</ThemedText>
                                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.tableText}>Fora</ThemedText>
                                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.tableText}>Total</ThemedText>
                                    </View>
                                    <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                                </View>
                            </View>
                            {data?.infos.map((info, index) => (
                                <View style={styles.line} key={index}>
                                    <View style={[styles.leftColumn, {borderRightColor: Colors[theme].Red}]}>
                                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={[styles.tableText, {fontSize: 15}]}>{info.name}</ThemedText>
                                    </View>
                                    <View style={styles.rightColumns}>
                                        <ThemedText style={[styles.tableText, {fontSize: 14}]}>{info.home}</ThemedText>
                                        <ThemedText style={[styles.tableText, {fontSize: 14}]}>{info.away}</ThemedText>
                                        <ThemedText style={[styles.tableText, {fontSize: 14}]}>{info.total}</ThemedText>
                                    </View>
                                </View>
                            ))}
                        </View>


                        <Section icon={{IconComponent: Record, width: 28, height: 28}} text='Sequência de Partidas' style={{marginTop: 40}}>
                            <View style={{flexDirection: "row", width: "95%", justifyContent: "center", flexWrap: "wrap", gap: 10}}>
                                {data?.form.split('').map((letter, index) => (
                                    <View style={styles.formView} key={index}>
                                        <ThemedText style={{textAlign: "center", fontFamily: "Kdam", fontSize: 13}}>{index+1}º</ThemedText>
                                        <View
                                            style={[styles.letterView, letter === "D" ?
                                                {backgroundColor: Colors[theme].Red}
                                                : letter === "V" ? {backgroundColor: Colors[theme].Green}
                                                : {backgroundColor: Colors[theme].DarkerText}]}
                                            >
                                            <ThemedText style={{textAlign: "center", marginTop: -1, fontFamily: "Kdam", marginLeft: -0.5, fontSize: 14}}>{letter}</ThemedText>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </Section>

                        <Section icon={{IconComponent: Statistics, width: 28, height: 28}} text='Estatísticas'>
                            <SingleInfo infoName='Maior sequência de vitórias:' info={data?.statistics.mostWinsSeq.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior sequência de empates:' info={data?.statistics.mostDrawsSeq.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior sequência de derrotas:' info={data?.statistics.mostLosesSeq.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior vitória em casa:' info={data?.statistics.biggestWinHome.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior vitória fora:' info={data?.statistics.biggestWinAway.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior derrota em casa:' info={data?.statistics.biggestLoseHome.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Maior derrota fora:' info={data?.statistics.biggestLoseAway.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Mais gols em casa:' info={data?.statistics.mostGoalsForHome.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Mais gols fora:' info={data?.statistics.mostGoalsForAway.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Mais gols tomados em casa:' info={data?.statistics.mostGoalsAgainstHome.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Mais gols tomados fora:' info={data?.statistics.mostGoalsAgainstAway.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Pênaltis convertidos:' info={data?.statistics.penaltyGoals.toString() || "Indísponível"}/>
                            <SingleInfo infoName='Pênaltis perdidos:' info={data?.statistics.penaltyMisses.toString() || "Indísponível"}/>
                        </Section>

                        <Section icon={{IconComponent: Formation, width: 25, height: 25}} text='Formações' style={{marginBottom: 90}}>
                            {data?.formations.length ? data.formations.map((formation, index) => (
                                <SingleInfo infoName={formation.formation} info={`${formation.times.toString()} vez(es) usada`} key={index}/>
                            )) : (
                                <InfoMessage text='Formações indisponíveis'/>
                            )}
                        </Section>
                    </>          
                ) : (
                    <View style={{justifyContent: "center"}}>
                        <InfoMessage text='Sem classificações disponíveis para o time no momento.'/>
                    </View>
                )}
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
        
    )
}

export default memo(TimeClassificacao);

const styles = StyleSheet.create({
    selectsView: {
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    select: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        width: "90%",
        marginTop: 25,
        marginHorizontal: "auto"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftColumn: {
        width: 100,
        borderRightWidth: .6,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        paddingRight: 15,
    },
    rightColumns: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
    },
    divisor: {
        height: .6,
        marginTop: 8,
        marginBottom: 0,
    },
    tableText: {
        fontWeight: 700,
        textAlign: "center",
    },
    line: {
        flexDirection: "row",
        alignItems: "center",
    },
    formView: {
        marginBottom: 3,
    },
    letterView: {
        width: 23,
        height: 23,
        borderRadius: 100,
        marginTop: -4,
    }
});

const TeamData: TeamLeague = {
    infos: [
        {
            name: "Partidas",
            home: 19,
            away: 19,
            total: 38
        },
        {
            name: "Vitórias",
            home: 13,
            away: 7,
            total: 20,
        },
        {
            name: "Empates",
            home: 5,
            away: 8,
            total: 13,
        },
        {
            name: "Derrotas",
            home: 1,
            away: 4,
            total: 5,
        },
        {
            name: "GP",
            home: 40,
            away: 18,
            total: 58,
        },
        {
            name: "Média GP",
            home: 2.1,
            away: 0.9,
            total: 1.5,
        },
        {
            name: "GC",
            home: 14,
            away: 17,
            total: 31,
        },
        {
            name: "Média GC",
            home: 0.7,
            away: 0.9,
            total: 0.8,
        },
    ],
    form: "DVVEEEEEVEVVDVEVEEDVDVVVEVVEVEVVEVDVVV",
    statistics: {
        mostWinsSeq: 3,
        mostDrawsSeq: 5,
        mostLosesSeq: 1,
        biggestWinHome: "4 x 0",
        biggestWinAway: "0 x 2",
        biggestLoseHome: "2 x 3",
        biggestLoseAway: "3 x 0",
        mostGoalsForHome: 4,
        mostGoalsForAway: 2,
        mostGoalsAgainstHome: 3,
        mostGoalsAgainstAway: 3,
        penaltyGoals: 8,
        penaltyMisses: 0
    },
    formations: [
        {
            formation: "4-2-3-1",
            times: 18
        },
        {
            formation: "4-4-1-1",
            times: 9
        },
        {
            formation: "4-3-3",
            times: 8
        },
        {
            formation: "4-3-2-1",
            times: 6
        },
        {
            formation: "4-4-2",
            times: 1
        },
        {
            formation: "4-1-4-1",
            times: 1
        },
    ]
}


const LeaguesData: Leagues[] = [
    {
        id: "71",
        name: "Serie A",
        seasons: [
            2022,
            2023,
            2024
        ]
    },
    {
        id: "72",
        name: "Serie B",
        seasons: [
            2022,
            2023,
        ]
    },
    {
        id: "73",
        name: "Serie C",
        seasons: [
            2021,
        ]
    },
    {
        id: "110",
        name: "Serie H",
        seasons: [
            2025,
        ]
    },
]