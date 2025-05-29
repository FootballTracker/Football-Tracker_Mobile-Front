import { Image, Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/context/ThemeContext';

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { Colors } from '@/constants/Colors';

interface TeamI {
    score: number
    logo: string
    name: string
}

export interface MatchCardI {
    id: number
    home_team: TeamI
    away_team: TeamI
    date: string
}

export default function MatchCard({ id, home_team, away_team, date }: MatchCardI) {

    const { theme } = useTheme();
    const result = home_team.score == away_team.score ? 1 : Number(home_team.score) > Number(away_team.score) ? 0 : 2;

    const accessMatch = () => {
        //acessa partida
        // router.push(`/(pages)/match/${id}` as any);
    }

    const styles = StyleSheet.create({
        card: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: "auto",
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 8,
            paddingTop: 10,
            paddingBottom: 8,
            paddingHorizontal: 10,
            width: "100%"
        },
        timeText: {
            fontFamily: "Kdam",
            fontSize: 11,
            width: 50,
            textAlign: "right",
            marginLeft: 3,
            marginRight: -12
            // marginLeft: 12,
        },
        info: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly"
        },
        teamView: {
            width: 70
        },
        teamInfo: {
            justifyContent: "center",
            alignItems: "center"
        },
        loser: {
            opacity: 0.6
        },
        image: {
            width: 30,
            height: 30
        },
        teamName: {
            fontFamily: "Kdam",
            fontSize: 12,
            top: 1,
        },
        resultInfo: {
            flexDirection: "row",
            justifyContent: "center",
        },
        result: {
            fontFamily: "Kdam",
            fontSize: 14
        },
        arrow: {
            width: 30,
        }
    });

    return (
        <Pressable onPress={accessMatch}>
            <View style={styles.card}>
                <ThemedText style={styles.timeText} darkColor={Colors.dark.Red} lightColor={Colors.light.Red}>{date}</ThemedText>
                <View style={styles.info}>
                    <View style={styles.teamView}>
                        <View style={[styles.teamInfo, result === 2 && styles.loser]}>
                            <Image source={{uri: home_team.logo}} resizeMode="contain" style={styles.image}/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{home_team.name}</ThemedText>
                        </View>
                    </View>
                    
                    <View style={styles.resultInfo}>
                        <ThemedText style={[styles.result, result === 2 && styles.loser]}>{home_team.score} </ThemedText>
                        <ThemedText style={styles.result}>x</ThemedText>
                        <ThemedText style={[styles.result, result === 0 && styles.loser]}> {away_team.score}</ThemedText>
                    </View>

                    <View style={styles.teamView}>
                        <View style={[styles.teamInfo, result === 0 && styles.loser]}>
                            <Image source={{uri: away_team.logo}} resizeMode="contain" style={styles.image}/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{away_team.name}</ThemedText>
                        </View>
                    </View>
                    {/* <ThemedText numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{time}</ThemedText> */}
                </View>
                <View style={styles.arrow}>
                        <ThemedIcon
                            IconComponent={MaterialIcons}
                            name='keyboard-arrow-right'
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            size={21}
                        />
                </View>
            </View>
        </Pressable>
    );
}

