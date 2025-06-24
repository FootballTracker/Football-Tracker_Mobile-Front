import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { memo, useEffect, useRef, useState } from 'react';
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
import api from '@/lib/Axios';
import { AxiosResponse } from 'axios';
import { Toast } from 'toastify-react-native';

interface TeamClassI {
    teamId: string;
    teamName: string;
}

interface Leagues {
    api_id: string;
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

function TimeClassificacao({ teamId, teamName } : TeamClassI) {
    const { theme } = useTheme();
    const [data, setData] = useState<TeamLeague | undefined>();
    const [leagues, setLeagues] = useState<Leagues[]>([]);
    const leaguesRef = useRef<Record<string, TeamLeague>>({}); //key string example>: api_id/season
    const [loading, setLoading] = useState(true);
    const [leagueModalOpened, setLeagueModalOpened] = useState(false);
    const [leagueSeasonsModalOpened, setLeagueSeasonsModalOpened] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState<{league: number, season: number}>({league: -1, season: -1});

    function selectLeagueIndex(value: string) {
        const previousSelectedLeague = leagues[selectedIndexes.league];
        const newSelectedLeague = leagues[Number(value)];
        const selectedSeason = previousSelectedLeague.seasons[selectedIndexes.season];

        const indexFound = newSelectedLeague.seasons.findIndex(element => element === selectedSeason)

        setSelectedIndexes({
            league: Number(value),
            season: indexFound !== -1 ? indexFound : newSelectedLeague.seasons.length - 1,
        })
    }

    function selectSeasonIndex(value: string) {
        setSelectedIndexes({
            ...selectedIndexes,
            season: Number(value),
        });
    }

    useEffect(() => {
        getLeagues();
    }, []);

    async function getLeagues() {
        await api.get(`team/${teamId}/leagues`).then((response: AxiosResponse<Leagues[]>) => {
            if(!response.data.length)
            Toast.show({
                props: {
                    type: "warn",
                    text: `${teamName} não participou de nenhuma liga`
                }
            });
            else {
                setLeagues(response.data);
                setSelectedIndexes({
                    league: 0,
                    season: response.data[0].seasons.length - 1,
                });
            }
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
                        text: `Não foi possível buscas as ligas que ${teamName} participou`
                    }
                });
            }
        });
    }

    async function getLeagueData() {
        if (leaguesRef.current[`${selectedIndexes.league}/${selectedIndexes.season}`]) {
            setData(leaguesRef.current[`${selectedIndexes.league}/${selectedIndexes.season}`]);
            return;
        }

        setLoading(true);
        const selectedLeague = leagues[selectedIndexes.league];

        await api.get(`team/${teamId}/league/${selectedLeague.api_id}`, {
            params: {
                season: selectedLeague.seasons[selectedIndexes.season]
            }}
        ).then((response: AxiosResponse<TeamLeague>) => {
            setData(response.data);
            leaguesRef.current[`${selectedIndexes.league}/${selectedIndexes.season}`] = response.data;
        }).catch((e: any) => {
            if(e.response.data.detail.ok) {
                Toast.show({
                    props: {
                        type: "warn",
                        text: e.response.data.detail.message
                    }
                });
            }
            else if(e.response.data.detail) {
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
                        text: `Não foi possível buscar os dados do time`
                    }
                });
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        getLeagueData();
    }, [selectedIndexes]);

    return (
        !loading ? (
            <ThemedScrollView>
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
                                        <Image source={{uri: `https://media.api-sports.io/football/leagues/${leagues[selectedIndexes.league].api_id}.png`}} width={30} height={35} resizeMode='contain' style={{marginRight: 10}}/>
                                        <ThemedText colorName='Text' style={{fontSize: 18}}>
                                            {leagues[selectedIndexes.league].name}
                                        </ThemedText>
                                        <ThemedIcon
                                            IconComponent={MaterialIcons}
                                            name='keyboard-arrow-down'
                                            colorName='Text'
                                            size={22}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View>
                                <Select modalOpened={leagueSeasonsModalOpened} setModalOpened={setLeagueSeasonsModalOpened} setSelected={selectSeasonIndex} title={`Selecione uma temporada de ${leagues[selectedIndexes.league].name}:`}
                                    values={leagues[selectedIndexes.league].seasons.map((season, index) => {
                                        return {
                                            name: `${season}`,
                                            value: `${index}`
                                        };
                                    })}
                                />
                                <TouchableOpacity onPress={() => setLeagueSeasonsModalOpened(!leagueSeasonsModalOpened)}>
                                    <View style={styles.select}>
                                        <ThemedText colorName='Text' style={{fontSize: 13}}>
                                            {leagues[selectedIndexes.league].seasons[selectedIndexes.season]}
                                        </ThemedText>
                                        <ThemedIcon
                                            IconComponent={MaterialIcons}
                                            name='keyboard-arrow-down'
                                            colorName='Text'
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
                                        <ThemedText colorName="Red" style={styles.tableText}>Casa</ThemedText>
                                        <ThemedText colorName="Red" style={styles.tableText}>Fora</ThemedText>
                                        <ThemedText colorName="Red" style={styles.tableText}>Total</ThemedText>
                                    </View>
                                    <ThemedView colorName="Red" style={styles.divisor}/>
                                </View>
                            </View>
                            {data?.infos.map((info, index) => (
                                <View style={styles.line} key={index}>
                                    <View style={[styles.leftColumn, {borderRightColor: Colors[theme].Red}]}>
                                        <ThemedText colorName="Red" style={[styles.tableText, {fontSize: 15}]}>{info.name}</ThemedText>
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
                                                : {backgroundColor: theme === 'light' ? '#999' : Colors[theme].DarkerText}]}
                                            >
                                            {/* <ThemedText color={theme === 'light' && letter !== 'E' ? Colors.dark.Text : Colors.light.Text} style={{textAlign: "center", marginTop: -1, marginLeft: -0.5, fontSize: 14}}>{letter}</ThemedText> */}
                                            <ThemedText color={theme === 'light' ? Colors.dark.Text : Colors.light.Text} style={{textAlign: "center", marginTop: -1, marginLeft: -0.5, fontSize: 14}}>{letter}</ThemedText>
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

                        <Section icon={{IconComponent: Formation, width: 25, height: 25}} text='Formações' style={{marginBottom: 50}}>
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
        marginTop: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: 23,
        height: 23,
        borderRadius: 100,
        marginTop: -4,
    }
});