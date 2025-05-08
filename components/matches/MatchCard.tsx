import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export interface MatchCardI {
    id: string
    time: string
    teamHomeName: string
    teamHomeImage: string
    teamOutName: string
    teamOutImage: string
    scoreHome: string
    scoreOut: string
}

export default function MatchCard({ id, time, teamHomeName, teamHomeImage, teamOutName, teamOutImage, scoreHome, scoreOut }: MatchCardI) {

    const theme = useColorScheme() ?? 'light';
    const result = scoreHome == scoreOut ? 1 : Number(scoreHome) > Number(scoreOut) ? 0 : 2;

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
            width: "98%",
            marginTop: 18,
            marginHorizontal: "auto",
            borderColor: Colors[theme].Red,
            borderWidth: .6,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        timeText: {
            fontFamily: "Kdam",
            fontSize: 11,
            width: 30,
            marginLeft: 12,
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
            width: 32,
            height: 32
        },
        teamName: {
            fontFamily: "Kdam",
            fontSize: 13,
            top: 3
        },
        resultInfo: {
            flexDirection: "row",
            justifyContent: "center",
        },
        result: {
            fontFamily: "Kdam",
            fontSize: 15
        },
        arrow: {
            width: 30,
        }
    });

    return (
        <Pressable onPress={accessMatch}>
            <View style={styles.card}>
                <ThemedText style={styles.timeText} darkColor={Colors.dark.Red} lightColor={Colors.light.Red}>{time}</ThemedText>
                <View style={styles.info}>
                    <View style={styles.teamView}>
                        <View style={[styles.teamInfo, result === 2 && styles.loser]}>
                            <Image source={{uri: teamHomeImage}} resizeMode="contain" style={styles.image}/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{teamHomeName}</ThemedText>
                        </View>
                    </View>
                    
                    <View style={styles.resultInfo}>
                        <ThemedText style={[styles.result, result === 2 && styles.loser]}>{scoreHome} </ThemedText>
                        <ThemedText style={styles.result}>x</ThemedText>
                        <ThemedText style={[styles.result, result === 0 && styles.loser]}> {scoreOut}</ThemedText>
                    </View>

                    <View style={styles.teamView}>
                        <View style={[styles.teamInfo, result === 0 && styles.loser]}>
                            <Image source={{uri: teamOutImage}} resizeMode="contain" style={styles.image}/>
                            <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode='tail'>{teamOutName}</ThemedText>
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

