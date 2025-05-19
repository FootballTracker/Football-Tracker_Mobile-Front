import { Image, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";

export interface LeagueTableItemProps {
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

export default function LeagueTableItem({ teamName, teamLogo, rank, totalGames, victories, draws, loses, goalsFor, goalsAgainst, goalsDiff, points }: LeagueTableItemProps ) {
    return (
        <View style={styles.row}>
            <ThemedText style={styles.rank}
                {...Number(rank) < 5 ?
                    {lightColor: Colors.light.Green, darkColor: Colors.dark.Green}
                    : Number(rank) > 16 && 
                    {lightColor: Colors.light.Red, darkColor: Colors.dark.Red}
                }
            >
                {rank}
            </ThemedText>
            <View style={styles.teamInfo}>
                <Image source={{uri: teamLogo}} style={styles.teamLogo} resizeMode='contain'/>
                <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">{teamName}</ThemedText>
            </View>
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
        alignContent: "center",
        gap: 25,
        // marginVertical: 5
        marginTop: 10,
    },
    rank: {
        fontFamily: "Kdam",
        textAlign: "center",
        fontSize: 13,
        width: 20
    },
    teamInfo: {
        flexDirection: "row",
        alignItems: "center",
        width: 190,
        marginLeft: -15
    },
    teamName: {
        fontSize: 14.5,
        width: "90%"
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