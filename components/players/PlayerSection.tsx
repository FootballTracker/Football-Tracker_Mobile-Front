import { StyleSheet, View } from 'react-native'
import { Colors } from '@/constants/Colors'

import { ThemedView } from '../DefaultComponents/ThemedView'
import { ThemedIcon, ThemedIconProps } from '../DefaultComponents/ThemedIcon'
import { ThemedText } from '@/components/DefaultComponents/ThemedText'
import PlayerCard, { PlayerCardI } from './PlayerCard'
import { Feather } from '@expo/vector-icons'


interface PlayerSectionProps {
    text: string
    players?: PlayerCardI[]
    icon: ThemedIconProps
};

export default function PlayerSection({ text, players, icon, ...rest }: PlayerSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.titleSection}>
                <ThemedIcon {...icon}/>
                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                    {text}
                </ThemedText>
            </View>
            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
            {players?.length ? (
                players.map((player, index) => (
                    <PlayerCard id={player.id} image={player.image} name={player.name} favorite={player.favorite} key={index}/>
                ))
            ) : (
                <ThemedText style={styles.favoritesInfoText} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText}>
                    <ThemedIcon IconComponent={Feather} name="info" size={15} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText} />
                    {' '}
                    Favorite um jogador para que ele apareça aqui.
                </ThemedText>
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
        paddingBottom: 1
    },
    sectionTitle: {
        fontFamily: "Kdam",
        fontSize: 18,
    },
    divisor: {
        height: .4,
        // bottom: 3
    },
    favoritesInfoText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 14,
    },
});