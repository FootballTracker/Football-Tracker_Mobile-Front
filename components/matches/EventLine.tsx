//Default Imports
import { Event, MinuteEvent } from "./pageComponents/MatchEvents";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

//Components
import { View } from "react-native";
import { SingleEvent } from "./SingleEvent";
import { ThemedText } from "../DefaultComponents/ThemedText";
import { DashedLine } from "./DashedLine";

export function EventLine({ time, home_team, away_team, scoreboard } : MinuteEvent) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        line: {
            alignItems: 'center',
            flexDirection: 'row',
            // marginTop: 15,
            marginTop: 14,
            marginBottom: 17,
        },
        midInformation: {
            alignItems: 'center',
            marginVertical: 'auto',
            gap: 10,  
        },
        minuteText: {
            fontSize: 12,
            borderRadius: 100,
            backgroundColor: Colors[theme].Red,
            padding: 5,
        },
        scoreboard: {
            fontSize: 12,
            borderRadius: 100,
            backgroundColor: Colors[theme].LightBackground,
            borderWidth: 2,
            borderColor: Colors[theme].Red,
            paddingTop: 1.5,
            paddingHorizontal: 7,
            fontFamily: 'Kdam'
        }
    })

    return (
        <View>
            <View style={styles.line}>
                <View style={{flex: 1, gap: 5}}>
                    {home_team.map((event, index) => (
                        <SingleEvent type={event.type} player={event.player} assist={event.assist} comments={event.comments} detail={event.detail} key={index} />
                    ))}
                </View>

                <View style={styles.midInformation}>
                    <ThemedText colorName="LightBackground" style={styles.minuteText}>{time} min</ThemedText>
                    {scoreboard &&
                        <ThemedText style={styles.scoreboard}>{scoreboard}</ThemedText>
                    }
                </View>

                <View style={{flex: 1, gap: 5}}>
                    {away_team.map((event, index) => (
                        <SingleEvent type={event.type} player={event.player} assist={event.assist} comments={event.comments} detail={event.detail} key={index} reverse />
                    ))}
                </View>

            </View>

            <DashedLine />
        </View>
    )
}