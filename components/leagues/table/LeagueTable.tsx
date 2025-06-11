import { Dimensions, StyleSheet, View } from "react-native";
import LeagueTableItem, { LeagueTableItemProps } from "./LeagueTableItem";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "@/components/DefaultComponents/ThemedScrollView";
import { ThemedView } from "@/components/DefaultComponents/ThemedView";

export interface LeagueTableProps {
    teams: LeagueTableItemProps[]
}

const windowWidth = Dimensions.get('window').width;

export default function LeagueTable({ teams }: LeagueTableProps) {
    return (
        <>
            <ThemedScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 'auto'}}>
                <View style={styles.table}>
                    {/* <View style={styles.header}>
                        <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.index}>#</ThemedText>
                        <ThemedText style={styles.teamSection}>Equipe</ThemedText>
                        <ThemedText style={styles.item}>PT</ThemedText>
                        <ThemedText style={styles.item}>V</ThemedText>
                    </View> */}

                    <ThemedText style={styles.tableText}>Tabela de Classificação</ThemedText>

                    <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                    <ThemedScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
                        {teams.map((team, index) => (
                            <LeagueTableItem {...team} key={index}/>
                        ))}
                        <ThemedView style={{paddingBottom: 390}}/>
                    </ThemedScrollView>
                </View>
            </ThemedScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    table: {
        flexDirection: "column",
        width: windowWidth*0.9,
    },
    tableText: {
        textAlign: 'center',
        marginBottom: 3,
        fontSize: 17,
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
    divisor: {
        marginTop: 3,
        height: .6,
        width: "102%",
        marginLeft: "-1%"
        // bottom: 3
    },
});