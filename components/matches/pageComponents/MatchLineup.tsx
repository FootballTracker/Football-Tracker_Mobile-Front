//Default Imports
import { StyleSheet } from "react-native";
import { memo, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { MatchCardI } from "../MatchCard";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";
import api from "@/lib/Axios";

//Components
import { View, Image, Pressable } from "react-native";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import LoadingIcon from "@/components/LoadingIcon";
import InfoMessage from "@/components/InfoMessage";
import Section from "@/components/Section";
import Card from "@/components/Card";

//Icons
import WhiteField from "@/assets/Icons/WhiteField.svg";
import BlackField from "@/assets/Icons/BlackField.svg";
import Swap from "@/assets/Icons/Swap.svg";
import Shield from "@/assets/Icons/Shield.svg";
import Shirt from "@/assets/Icons/Shirt.svg";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { useTheme } from "@/context/ThemeContext";

//Types
interface MatchLineupI {
    match: MatchCardI,
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
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<FullLineup>();
    const [selectedTeam, setSelectedTeam] = useState<Lineup>();

    useEffect(() => {
        getData();
    }, []);

    function accessPlayer(id: string) {
        router.push(`/(pages)/match/${match.id}/${id}`);
    }

    async function getData() {
        await api.get(`match/${match.id}/lineups`)
        .then((response) => {
            setData(response.data);
            setSelectedTeam(response.data.home);
        }).catch((e) => {
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
                        text: "Erro ao buscar escalações"
                    }
                });
            }
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
                                <ThemedText colorName='Text' style={{width: "80%", textAlign: "center", fontSize: 13}} numberOfLines={1} ellipsizeMode="tail">
                                    {match.home_team.name}
                                </ThemedText>
                            </Pressable>

                            <Pressable style={[styles.teamSelectOption, selectedTeam === data.home && {opacity: 0.4}]} onPress={() => setSelectedTeam(data.away)}>
                                <Image source={{uri: match.away_team.logo}} width={28} height={35} resizeMode="contain"/>
                                <ThemedText colorName='Text' style={{width: "80%", textAlign: "center", fontSize: 13}} numberOfLines={1} ellipsizeMode="tail">
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
                                                        <ThemedText colorName='DarkerText' style={styles.playerNumber}>{player.number}</ThemedText>
                                                    </View>
                                                </Pressable>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                            {theme === 'light' ? (
                                <BlackField strokeWidth={5} width={"100%"} height={"100%"} style={{position: "absolute", top: 0, left: 0}}/>
                            ) : (
                                <WhiteField strokeWidth={5} width={"100%"} height={"100%"} style={{position: "absolute", top: 0, left: 0}}/>
                            )}
                        </View>

                        <View style={styles.coachView}>
                            {selectedTeam.coach.image !== "" && <Image source={{uri: selectedTeam.coach.image}} width={35} height={35} resizeMode="contain" borderRadius={5}/>}
                            <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 15}}>{selectedTeam.coach.name}</ThemedText>
                        </View>
                    </View>

                    <Section icon={{IconComponent: Shirt, width: 30, height: 37, Stroke: true, strokeWidth: 1.5}} text="Titulares">

                        {selectedTeam?.initial.map((line) => (
                            line.map((player) => (
                                <Card
                                    handleOpen={() => accessPlayer(player.id)}
                                    info={`${player.name} - ${player.number}`}
                                    image={`https://media.api-sports.io/football/players/${player.id}.png`}
                                    key={player.id}
                                />
                            ))
                            
                        ))}

                    </Section>

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