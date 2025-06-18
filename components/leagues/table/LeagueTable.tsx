import { Dimensions, StyleSheet, View, ViewProps } from "react-native";
import LeagueTableItem, { LeagueTableItemProps } from "./LeagueTableItem";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";

export interface LeagueTableProps {
    teams: LeagueTableItemProps[],
}

const windowWidth = Dimensions.get('window').width;

export default function LeagueTable({ teams, ...rest }: LeagueTableProps & ViewProps) {
    return (
        <View style={[styles.table, rest.style]}>
            <ThemedScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                {teams.map((team, index) => (
                    <LeagueTableItem {...team} key={index}/>
                ))}
            </ThemedScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    table: {
        flexDirection: "column",
        width: windowWidth*0.9,
        marginHorizontal: 'auto',
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
        flex: 1,
        marginLeft: -15,
        fontSize: 14.5,
    },
    item: {
        width: 25,
        textAlign: "center",
        fontFamily: "Karla"
    },
});