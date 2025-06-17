import { View, StyleSheet, Image, Pressable } from "react-native";
import { memo, useEffect, useState } from "react";
import Field from "@/assets/Icons/Field.svg";
import Swap from "@/assets/Icons/Swap.svg";
import Shield from "@/assets/Icons/Shield.svg";
import { Colors } from "@/constants/Colors";
import { MatchCardI } from "../MatchCard";
import api from "@/lib/Axios";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import LoadingIcon from "@/components/LoadingIcon";
import InfoMessage from "@/components/InfoMessage";
import Section from "@/components/Section";
import Card from "@/components/Card";

interface MatchLineupI {
    match: MatchCardI
}

interface Lineup {
    coach: {
        id: string;
        name: string;
        image: string;
    };
    initial: {
        id: string;
        name: string;
        number: string;
    }[][];
    substitutes: {
        id: string;
        name: string;
        number: string;
    }[]
}

interface FullLineup {
    home: Lineup,
    away: Lineup
}

function MatchLineup({ match }: MatchLineupI) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<FullLineup>();
    const [selectedTeam, setSelectedTeam] = useState<Lineup>();

    useEffect(() => {
        getData();
    }, []);

    function accessPlayer(id: string) {
        console.log("acessar jogador");
    }

    async function getData() {
        await api.get(`match/${match.id}/lineups`)
        .then((response) => {
            setData(response.data);
            setSelectedTeam(response.data.home);
        }).catch((e) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar escalações.');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        !loading ? (
            data && selectedTeam ? (
                <ThemedScrollView style={{flex: 1}}>

                    <Section icon={{IconComponent: Shield, width: 26, height: 26, Stroke: true, strokeWidth: 5}} text="Selecione um time:">
                        <View style={styles.teamsSelectView}>
                            <Pressable style={[styles.teamSelectOption, selectedTeam === data.away && {opacity: 0.4}]} onPress={() => setSelectedTeam(data.home)}>
                                <Image source={{uri: match.home_team.logo}} width={28} height={35} resizeMode="contain"/>
                                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{width: "80%", textAlign: "center", fontSize: 13}} numberOfLines={1} ellipsizeMode="tail">
                                    {match.home_team.name}
                                </ThemedText>
                            </Pressable>

                            <Pressable style={[styles.teamSelectOption, selectedTeam === data.home && {opacity: 0.4}]} onPress={() => setSelectedTeam(data.away)}>
                                <Image source={{uri: match.away_team.logo}} width={28} height={35} resizeMode="contain"/>
                                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{width: "80%", textAlign: "center", fontSize: 13}} numberOfLines={1} ellipsizeMode="tail">
                                    {match.away_team.name}
                                </ThemedText>
                            </Pressable>
                        </View>
                    </Section>
                    
                    <InfoMessage text="Clique em um jogador para ver suas estatísticas na partida." fontSize={12.5} style={{
                        marginHorizontal: "auto", marginTop: 5, marginBottom: 10
                    }}/>

                    <View style={styles.container}>
                        <View style={{position: 'relative', top: 5, marginBottom: 15}}>
                            <View style={styles.fieldPlayers}>
                                <View style={styles.lineup}>
                                    {selectedTeam.initial.map((line, index) => (
                                        <View style={styles.line} key={index}>
                                            {line.map((player) => (
                                                <Pressable key={player.id} onPress={() => accessPlayer(player.id)}>
                                                    <View style={styles.player}>
                                                        <Image source={{uri: `https://media.api-sports.io/football/players/${player.id}.png`}} width={34} height={34} style={{borderRadius: 100}}/>
                                                        <ThemedText lightColor={Colors.light.DarkerText} darkColor={Colors.dark.DarkerText} midnightColor={Colors.midnight.DarkerText} style={styles.playerNumber}>{player.number}</ThemedText>
                                                    </View>
                                                </Pressable>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <Field strokeWidth={5} width={"100%"} height={"100%"} style={{position: "absolute", top: 0, left: 0}}/>
                        </View>

                        <View style={styles.coachView}>
                            {selectedTeam.coach.image !== "" && <Image source={{uri: selectedTeam.coach.image}} width={35} height={35} resizeMode="contain" borderRadius={5}/>}
                            <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 15}}>{selectedTeam.coach.name}</ThemedText>
                        </View>
                    </View>


                    <Section icon={{IconComponent: Swap, width: 25, height: 25, Stroke: true, strokeWidth: 5.5}} text="Substitutos" style={{marginBottom: 50, minHeight: 270}}>

                        {selectedTeam?.substitutes.map((sub) => (
                            <Card
                                handleOpen={() => accessPlayer(sub.id)}
                                info={`${sub.name} - ${sub.number}`}
                                image={`https://media.api-sports.io/football/players/${sub.id}.png`}
                                key={sub.id}
                            />
                        ))}

                    </Section>

                </ThemedScrollView>
            ) : (
                <InfoMessage text="Escalações indisponíveis" fontSize={12.5} style={{
                    marginHorizontal: "auto", marginTop: 40
                }}/>  
            )
        ) : (
            <LoadingIcon />
        )
    )
}

export default memo(MatchLineup, (prevProps, nextProps) => {
    return prevProps.match.id === nextProps.match.id
});

const styles = StyleSheet.create(({
    teamsSelectView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    teamSelectOption: {
        alignItems: "center",
        width: "40%",
    },
    container: {
        width: "90%",
        justifyContent: "center",
        marginHorizontal: "auto",
        flex: 1,
        position: "relative",
    },
    fieldPlayers: {
        width: "100%",
        height: 570,
        zIndex: 2,
        justifyContent: "flex-end",
        // marginVertical: 20,
    },
    lineup: {
        height: "81%",
        width: "100%",
        marginBottom: 15,
        justifyContent: "space-between",
    },
    line: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        height: 50,
    },
    player: {
        justifyContent: "center",
        alignItems: "center",
    },
    playerNumber: {
        fontSize: 13,
        lineHeight: 15,
    },
    coachView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginVertical: 5,
        gap: 10,
    },
}));

const Lineups: FullLineup = {
    home: {
        coach: {
            id: "2417",
            name: "Cuca",
            image: "https://media.api-sports.io/football/coachs/2417.png"
        },
        initial: [
            [
                {
                    id: "9978",
                    name: "Everson",
                    number: "22",
                }
            ],
            [
                {
                    id: "434",
                    name: "Mariano",
                    number: "25",
                },
                {
                    id: "2499",
                    name: "J. Alonso",
                    number: "3",
                },
                {
                    id: "2038",
                    name: "Guilherme Arana",
                    number: "13",
                },
                {
                    id: "9697",
                    name: "Nathan Silva",
                    number: "40",
                },
            ],
            [
                {
                    id: "5997",
                    name: "I. Fernández",
                    number: "26",
                }
            ],
            [
                {
                    id: "10319",
                    name: "Allan",
                    number: "29",
                },
                {
                    id: "2477",
                    name: "M. Zaracho",
                    number: "15",
                },
                {
                    id: "12705",
                    name: "Hulk",
                    number: "7",
                },
                {
                    id: "16847",
                    name: "Keno",
                    number: "11",
                },
            ],
            [
                {
                    id: "5981",
                    name: "C. Pavón",
                    number: "30",
                }
            ]
        ],
        substitutes: [
            {
                id: "12825",
                name: "Alan Kardec",
                number: "14",
            },
            {
                id: "10244",
                name: "Pedrinho",
                number: "37",
            },
            {
                id: "9854",
                name: "Ademir",
                number: "19",
            },
        ]
    },
    away: {
        coach: {
            id: "3054",
            name: "Jair Ventura",
            image: "https://media.api-sports.io/football/coachs/3054.png"
        },
        initial: [
            [
                {
                    id: "9329",
                    name: "Pedro Raul",
                    number: "11",
                }
            ],
            [
                {
                    id: "9660",
                    name: "Vinícius",
                    number: "7",
                },
                {
                    id: "159920",
                    name: "Diego",
                    number: "20",
                },
                {
                    id: "64364",
                    name: "Dadá Belmonte",
                    number: "27",
                },
                {
                    id: "63980",
                    name: "Matheus Sales",
                    number: "36",
                },
            ],
            [
                {
                    id: "78045",
                    name: "Auremir",
                    number: "5",
                }
            ],
            [
                {
                    id: "80534",
                    name: "Caetano",
                    number: "4",
                },
                {
                    id: "54093",
                    name: "Hugo",
                    number: "66",
                },
                {
                    id: "54230",
                    name: "Reynaldo",
                    number: "29",
                },
                {
                    id: "32948",
                    name: "Maguinho",
                    number: "2",
                },
            ],
            [
                {
                    id: "10335",
                    name: "Tadeu",
                    number: "23",
                }
            ]
        ],
        substitutes: [
            {
                id: "10312",
                name: "Caio Vinícius",
                number: "15",
            },
            {
                id: "10120",
                name: "Lucas Halter",
                number: "25",
            },
            {
                id: "238554",
                name: "Danilo",
                number: "21",
            },
        ]
    }
}