import { StyleSheet, View } from 'react-native'
import { Colors } from '@/constants/Colors'

import { ThemedView } from '../DefaultComponents/ThemedView'
import { ThemedIcon, ThemedIconProps } from '../DefaultComponents/ThemedIcon'
import { ThemedText } from '@/components/DefaultComponents/ThemedText'
import MatchCard, { MatchCardI } from './MatchCard'


interface LeaguesSectionProps {
    text: string
    matches: MatchCardI[]
    icon: ThemedIconProps
};

export default function MatchSection({ text, matches, icon, ...rest }: LeaguesSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.titleSection}>
                <ThemedIcon {...icon}/>
                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                    {text}
                </ThemedText>
            </View>
            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
            {matches.map((matche, index) => (
                    <MatchCard {...matche} key={index}/>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingBottom: 30
    },
    titleSection: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: 1
    },
    sectionTitle: {
        fontFamily: "Kdam",
        fontSize: 18,
    },
    divisor: {
        height: .4,
        bottom: 3
    },
});