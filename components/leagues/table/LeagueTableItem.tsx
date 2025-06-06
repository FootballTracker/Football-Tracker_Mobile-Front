import { Image, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { router } from "expo-router";

export interface LeagueTableItemProps {
    teamId: string;
    teamName: string;
    teamLogo: string;
    rank: string;
    totalGames: string;
    victories: string;
    draws: string;
    loses: string;
    goalsFor: string;
    goalsAgainst: string;
    goalsDiff: string;
    points: string;
}

export default function LeagueTableItem({ teamId, teamName, teamLogo, rank, totalGames, victories, draws, loses, goalsFor, goalsAgainst, goalsDiff, points }: LeagueTableItemProps ) {
    
    function accessTeam() {
        router.push(`/(pages)/team/${teamId}` as any);
    }
    
    return (
        <View style={styles.row}>
                <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode="tail" onPress={accessTeam}>{teamName}</ThemedText>
                <ThemedText style={styles.item}>{totalGames}</ThemedText>
                <ThemedText style={styles.item}>{victories}</ThemedText>
                <ThemedText style={styles.item}>{draws}</ThemedText>
                <ThemedText style={styles.item}>{loses}</ThemedText>
                <ThemedText style={styles.item}>{goalsFor}</ThemedText>
                <ThemedText style={styles.item}>{goalsAgainst}</ThemedText>
                <ThemedText style={styles.item}>{goalsDiff}</ThemedText>
                <ThemedText style={styles.item}>{points}</ThemedText>
            </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        height: 40
    },
    teamName: {
        fontSize: 14.5,
        width: 153,
        marginRight: 17,
    },
    teamLogo: {
        height: 25,
        width: 25,
        marginRight: 13
    },
    item: {
        width: 25,
        textAlign: "center",
        fontFamily: "Kdam",
        fontSize: 14
    }
});