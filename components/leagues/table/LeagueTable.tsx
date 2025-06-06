import { StyleSheet, View } from "react-native";
import LeagueTableItem, { LeagueTableItemProps } from "./LeagueTableItem";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";

export interface LeagueTableProps {
    teams: LeagueTableItemProps[]
}

export default function LeagueTable({ teams }: LeagueTableProps) {
    return (
        <>
            <ThemedScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    <View style={styles.header}>
                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.index}>#</ThemedText>
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
                    <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                    <ThemedScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {teams.map((team, index) => (
                                <LeagueTableItem {...team} key={index}/>
                            ))}
                            <ThemedView style={{paddingBottom: 400}}/>
                        </View>
                    </ThemedScrollView>
                </View>
            </ThemedScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    table: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        marginBottom: 5
    },
    index: {
        fontFamily: "Karla",
        fontSize: 18,
        width: 20,
        textAlign: "center"
    },
    teamSection: {
        width: 190,
        marginLeft: -15,
        fontSize: 14.5,
    },
    item: {
        width: 25,
        textAlign: "center",
        fontFamily: "Karla"
    },
    divisor: {
        marginTop: 3,
        height: .6,
        width: "102%",
        marginLeft: "-1%"
        // bottom: 3
    },
});