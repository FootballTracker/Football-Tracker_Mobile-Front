import { Image, StyleSheet, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Boot from "@/assets/Icons/Boot.svg";
import api from '@/lib/Axios';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { Select } from '@/components/Select';
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import LoadingIcon from '@/components/LoadingIcon';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import InfoMessage from '@/components/InfoMessage';

interface LigaRankingsProps {
    season: number
    leagueId: number
}

interface Rank {
    id: string;
    name: string;
    value: number;
    teamId: string;
}

interface Rankings {
    goals: Rank[];
    assists: Rank[];
    avgScores: Rank[];
}

function LigaRankings({leagueId, season} : LigaRankingsProps) {
    const [data, setData] = useState<Rankings | undefined>();
    const [currRank, setCurrRank] = useState<keyof Rankings>("goals");
    const [loading, setLoading] = useState(true);
    const [modalOpened, setModalOpened] = useState(false);

    function updateRank(value: string) {
        setCurrRank(value as any);
    }

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        await api.get("players/rankings")
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                if(error.response.data.detail) {
                    Toast.show({
                        props: {
                            type: "error",
                            text: error.response.data.detail
                        }
                    });
                }
                else {
                    Toast.show({
                        props: {
                            type: "error",
                            text: "Erro ao buscar rankings da liga"
                        }
                    });
                }
            }).finally(() => {
                setLoading(false);
            })
    }


    function accessPlayer(id: string) {
        router.push(`/(pages)/player/${id}`);
    }

    function accessTeam(id: string) {
        router.push(`/(pages)/team/${id}`);
    }

    return (
        <ThemedView style={{top: 35, marginBottom: 50}}>
            {!loading ? (
                data ? (
                    <View style={styles.container}>
                        <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={updateRank} title="Selecione um ranking:"
                            values={[{
                                name: "Artilheiros",
                                value: "goals"
                            },
                            {
                                name: "Assistências",
                                value: "assists"
                            },
                            {
                                name: "Melhores notas",
                                value: "avgScores"
                            }]}
                        />

                        <TouchableOpacity onPress={() => setModalOpened(!modalOpened)}>
                            <View style={styles.select}>
                                {currRank === "goals" ? (
                                    <>
                                        <ThemedIcon
                                            IconComponent={Boot}
                                            colorName="Red"
                                            size={26}
                                            style={{marginHorizontal: 10}}
                                        />
                                        <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 17}}>
                                            Artilheiros
                                        </ThemedText>
                                    </>
                                ) : currRank === "assists" ? (
                                    <>
                                        <ThemedIcon
                                            IconComponent={AntDesign}
                                            name={"team"}
                                            colorName="Red"
                                            size={26}
                                            style={{marginHorizontal: 7}}
                                        />
                                        <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 17}}>
                                            Assistências
                                        </ThemedText>
                                    </>
                                ) : (
                                    <>
                                        <ThemedIcon
                                            IconComponent={MaterialIcons}
                                            name={"grade"}
                                            colorName="Red"
                                            size={24}
                                            style={{marginHorizontal: 7, marginTop: -1, marginBottom: 2}}
                                        />
                                        <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 17}}>
                                            Melhores notas
                                        </ThemedText>
                                    </>
                                )}
                                <ThemedIcon
                                    IconComponent={MaterialIcons}
                                    name='keyboard-arrow-down'
                                    colorName="Text"
                                    size={22}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.table}>
                            <View style={styles.header}>
                                <ThemedText colorName="Red" style={styles.index}>#</ThemedText>
                                <ThemedText style={{flex: 1}}>Jogador</ThemedText>
                                <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{width: 70, textAlign: "center"}}>{currRank === "goals" ? "Gols" : (currRank === "assists" ? "Assistências" : "Notas")}</ThemedText>
                                <ThemedText style={{width: 50, textAlign: "center"}}>Time</ThemedText>
                            </View>

                            <ThemedView colorName="Red" style={styles.divisor}/>
                            
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {data[currRank].map((item, index) => (
                                    <View style={styles.tableItem} key={item.id}>
                                        <ThemedText style={{width: 25, textAlign: "center", fontWeight: 700, fontSize: 14, marginRight: 5}}>{index+1}</ThemedText>
                                        
                                        <Pressable onPress={() => accessPlayer(item.id)} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                            <Image source={{uri: `https://media.api-sports.io/football/players/${item.id}.png`}} width={28} height={28} resizeMode='contain' borderRadius={5}/>
                                            <ThemedText style={{marginLeft: 7, width: "80%", fontSize: 14}} numberOfLines={1} ellipsizeMode='tail'>{item.name}</ThemedText>
                                        </Pressable>
                                        
                                        <ThemedText style={{width: 70, fontWeight: 700, textAlign: "center", fontSize: 14}}>{item.value}</ThemedText>
                                        
                                        <Pressable onPress={() => accessTeam(item.teamId)} style={{width: 50}}>
                                                <Image source={{uri: `https://media.api-sports.io/football/teams/${item.teamId}.png`}} width={50} height={30} resizeMode='contain'/>
                                        </Pressable>
                                        
                                    </View>
                                ))}
                                <View style={{height: 230}}/>
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <InfoMessage text='Não possível carregar os rankings liga'/>
                )
            ) : (
                <View style={{height: 40}}>
                    <LoadingIcon />
                </View>
            )}
        </ThemedView>
    )
}

export default memo(LigaRankings, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    select: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        width: "90%",
        marginTop: 20,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 7,
    },
    index: {
        fontFamily: "Karla",
        fontSize: 18,
        width: 25,
        textAlign: "center",
        marginRight: 5,
    },
    divisor: {
        height: .6,
        marginTop: 8,
        marginBottom: 3,
    },
    tableItens: {
        width: "100%",
    },
    tableItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
        gap: 5,
    }
});