import { Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import LeagueTableItem, { LeagueTableItemProps } from "./LeagueTableItem";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useRef } from "react";
import { router } from "expo-router";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";

export interface LeagueTableProps {
    teams: LeagueTableItemProps[]
}

export default function LeagueTable({ teams }: LeagueTableProps) {

    const { theme } = useTheme();
    const scrollLeftRef = useRef<ScrollView>(null);
    const scrollRightRef = useRef<ScrollView>(null);
    const isSyncingScroll = useRef(false);

    function setScrollSameHeight(left: boolean, event: NativeSyntheticEvent<NativeScrollEvent>) {

        if (isSyncingScroll.current) return;

        const y = event.nativeEvent.contentOffset.y;

        isSyncingScroll.current = true;
        if(left) {
            scrollLeftRef.current?.scrollTo({ y: y, animated: false });
        } else {
            scrollRightRef.current?.scrollTo({ y: y, animated: false });
        }

        setTimeout(() => {
            isSyncingScroll.current = false;
        }, 1);
    }

    function accessTeam(teamId: string) {
        router.push(`/(pages)/team/${teamId}` as any);
    }

    return (
        <ThemedView style={styles.fullTable}>

            <View style={{borderRightWidth: 0.5, borderColor: Colors[theme].Red}}>
                <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.index}>#</ThemedText>

                <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={[styles.divisor]}/>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 2}}
                    ref={scrollLeftRef}
                    scrollEventThrottle={1}
                    onScroll={(event) => {
                        setScrollSameHeight(false, event)
                    }}>
                    {teams.map((team, index) => (
                        <Pressable key={index} onPress={() => accessTeam(team.teamId)}>
                            <View style={styles.teamsLeft}>
                                <ThemedText style={styles.rank}
                                    {...Number(team.rank) < 5 ?
                                        {lightColor: Colors.light.Green, darkColor: Colors.dark.Green}
                                        : Number(team.rank) > 16 && 
                                        {lightColor: Colors.light.Red, darkColor: Colors.dark.Red}
                                    }
                                >
                                    {team.rank}
                                </ThemedText>

                                <Image source={{uri: team.teamLogo}} style={styles.teamLogo} resizeMode='contain'/>
                            </View>
                        </Pressable>
                    ))}
                    <ThemedView style={{paddingBottom: 30}}/>
                </ScrollView>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    <View style={styles.header}>
                        <ThemedText style={styles.teamSection}>Equipe</ThemedText>
                        <ThemedText style={styles.item}>J</ThemedText>
                        <ThemedText style={styles.item}>V</ThemedText>
                        <ThemedText style={styles.item}>E</ThemedText>
                        <ThemedText style={styles.item}>D</ThemedText>
                        <ThemedText style={styles.item}>GP</ThemedText>
                        <ThemedText style={styles.item}>GC</ThemedText>
                        <ThemedText style={styles.item}>SG</ThemedText>
                        <ThemedText style={styles.item}>P</ThemedText>
                    </View>

                    <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor1}/>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        ref={scrollRightRef}
                        scrollEventThrottle={1}
                        onScroll={(event) => {
                            setScrollSameHeight(true, event)
                        }}
                    >
                        <View>
                            {teams.map((team, index) => (
                                <LeagueTableItem {...team} key={index}/>
                            ))}
                            <ThemedView style={{paddingBottom: 30}}/>
                        </View>
                    </ScrollView>

                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    fullTable: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        width: "90%",
        marginHorizontal: "auto",
        flex: 1
    },
    index: {
        fontFamily: "Karla",
        fontSize: 18,
        textAlign: "center",
    },
    teamsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        height: 40
    },
    rank: {
        fontFamily: "Kdam",
        textAlign: "center",
        fontSize: 13,
        width: 20,
    },
    divisor: {
        marginTop: 5.5,
        height: .6,
        width: "104%",
        marginLeft: "-2%",
    },
    teamLogo: {
        height: 25,
        width: 25,
        marginRight: 16,
        marginLeft: 10
    },
    table: {
        flexDirection: "column",
        width: "100%",
        paddingRight: 15,
        paddingLeft: 10
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        marginBottom: 5
    },
    teamSection: {
        width: 170,
        fontSize: 14.5,
    },
    item: {
        width: 25,
        textAlign: "center",
        fontFamily: "Karla"
    },
    divisor1: {
        marginTop: 2.5,
        height: .6,
        width: "104%",
        marginLeft: "-2%",
    },
});