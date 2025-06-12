import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Boot from "@/assets/Icons/Boot.svg";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { Select } from '@/components/Select';
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import LoadingIcon from '@/components/LoadingIcon';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

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

function LigaRankings({leagueId, season} : LigaRankingsProps) {
    const [rank, setRank] = useState(0);
    const [data, setData] = useState<Rank[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [modalOpened, setModalOpened] = useState(false);

    function updateRank(value: string) {
        setRank(Number(value));
    }

    useEffect(() => {
        getData();
    }, [rank]);

    async function getData() {
        setTimeout(() => {
            setLoading(false);
            setData(data1);
        }, 1000);
    }

    return (
        <ThemedView style={{top: 35, marginBottom: 50}}>
            {!loading ? (
                <View style={styles.container}>
                    <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={updateRank} title="Selecione um ranking:"
                        values={[{
                            name: "Artilheiros",
                            value: "0"
                        },
                        {
                            name: "Assistências",
                            value: "1"
                        },
                        {
                            name: "Melhores notas",
                            value: "2"
                        }]}
                    />

                    <TouchableOpacity onPress={() => setModalOpened(!modalOpened)}>
                        <View style={styles.select}>
                            {rank === 0 ? (
                                <>
                                    <ThemedIcon
                                        IconComponent={Boot}
                                        darkColor={Colors.dark.Red}
                                        lightColor={Colors.light.Red}
                                        size={26}
                                        style={{marginHorizontal: 10}}
                                    />
                                    <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={{fontSize: 17}}>
                                        Artilheiros
                                    </ThemedText>
                                </>
                            ) : rank === 1 ? (
                                <>
                                    <ThemedIcon
                                        IconComponent={AntDesign}
                                        name={"team"}
                                        darkColor={Colors.dark.Red}
                                        lightColor={Colors.light.Red}
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
                                        darkColor={Colors.dark.Red}
                                        lightColor={Colors.light.Red}
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
                                darkColor={Colors.dark.Text}
                                lightColor={Colors.light.Text}
                                size={22}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.table}>
                        <View style={styles.header}>
                            <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} midnightColor={Colors.midnight.Red} style={styles.index}>#</ThemedText>
                            <ThemedText style={{flex: 1}}>Jogador</ThemedText>
                            <ThemedText numberOfLines={1} ellipsizeMode='tail' style={{width: 70, textAlign: "center"}}>{rank === 0 ? "Gols" : (rank === 1 ? "Assistências" : "Notas")}</ThemedText>
                            <ThemedText style={{width: 50, textAlign: "center"}}>Time</ThemedText>
                        </View>

                        <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                        
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {data?.map((item, index) => (
                                <View style={styles.tableItem} key={item.id}>
                                    <ThemedText style={{width: 25, textAlign: "center", fontWeight: 700, fontSize: 14, marginRight: 5}}>{index+1}</ThemedText>
                                    <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                        <Image source={{uri: `https://media.api-sports.io/football/players/${item.id}.png`}} width={28} height={28} resizeMode='contain' borderRadius={5}/>
                                        <ThemedText style={{marginLeft: 7, width: "80%", fontSize: 14}} numberOfLines={1} ellipsizeMode='tail'>{item.name}</ThemedText>
                                    </View>
                                    <ThemedText style={{width: 70, fontWeight: 700, textAlign: "center", fontSize: 14}}>{item.value}</ThemedText>
                                    <View style={{width: 50}}>
                                        <Image source={{uri: `https://media.api-sports.io/football/teams/${item.teamId}.png`}} width={50} height={30} resizeMode='contain'/>
                                    </View>
                                </View>
                            ))}
                            <View style={{height: 230}}/>
                        </ScrollView>
                    </View>
                </View>
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

const data1 : Rank[] = [
    {
        id: "13523",
        name: "G. Cano",
        teamId: "124",
        value: 26
    },
    {
        id: "13570",
        name: "Pedro Raul",
        teamId: "151",
        value: 19
    },
    {
        id: "5331",
        name: "J. Calleri",
        teamId: "126",
        value: 18
    },
    {
        id: "613",
        name: "Bissoli",
        teamId: "145",
        value: 14
    },
    {
        id: "857",
        name: "Marcos Leonardo",
        teamId: "128",
        value: 13
    },
]