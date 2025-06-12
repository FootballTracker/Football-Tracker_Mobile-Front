//Default Imports
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { StyleSheet } from "react-native";
import { TeamI } from "./MatchCard";

//Components
import { ThemedText } from "../DefaultComponents/ThemedText";
import { Image, View } from "react-native";

//Types
type TeamsLogosInformationProps = {
    home_team: TeamI;
    away_team: TeamI;
    children?: React.ReactNode;
} & ViewProps;

export function TeamsLogosInformation({ home_team, away_team, children, ...rest } : TeamsLogosInformationProps) {
    return (
        <View style={[styles.container, rest.style]}>
            <View style={styles.team}>
                <Image source={{uri: home_team.logo}} width={35} height={35} resizeMode='contain' />
                <ThemedText style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{home_team.name}</ThemedText>
            </View>

            {children}

            <View style={[styles.team, {justifyContent: 'flex-end'}]}>
                <ThemedText style={[styles.text, {textAlign: 'right'}]} numberOfLines={1} ellipsizeMode='tail'>{away_team.name}</ThemedText>
                <Image source={{uri: away_team.logo}} width={35} height={35} resizeMode='contain' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    team: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontFamily: 'Kokoro',
        fontSize: 13,
        flex: 1,
    }
})