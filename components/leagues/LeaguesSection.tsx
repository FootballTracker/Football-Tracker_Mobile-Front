import { StyleSheet, View } from 'react-native'

import { ThemedView } from '../DefaultComponents/ThemedView'
import { ThemedIcon, ThemedIconProps } from '../DefaultComponents/ThemedIcon'
import { ThemedText } from '@/components/DefaultComponents/ThemedText'
import { Colors } from '@/constants/Colors'
import LeagueCard, { LeagueCardI} from './LeagueCard'


interface LeaguesSectionProps {
    text: string
    leagues?: LeagueCardI[]
    icon: ThemedIconProps
}

export default function LeaguesSection({ text, leagues, icon }: LeaguesSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.titleSection}>
                <ThemedIcon IconComponent={icon.IconComponent} name={icon.name} size={icon.size} style={icon.style} darkColor={icon.darkColor} lightColor={icon.lightColor}/>
                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                    {text}
                </ThemedText>
            </View>
            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
            {leagues && (
                leagues.map((league, index) => (
                    <LeagueCard id={league.id} image={league.image} name={league.name} favoritie={league.favoritie} key={index}/>
                ))
            )}
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
    },
    sectionTitle: {
        fontFamily: "Kdam",
        fontSize: 21,
    },
    divisor: {
        height: 1,
    }
});