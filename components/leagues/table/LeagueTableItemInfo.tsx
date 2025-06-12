//Default Imports
import { StyleSheet } from "react-native";
import { Animated } from "react-native";
import InfoRow from "./InfoRow";
import { useEffect, useRef, useState } from "react";

//Components
import { View } from "react-native";

//Type
type LeagueTableItemInfoProps = {
    totalGames: string;
    victories: string;
    draws: string;
    loses: string;
    goalsFor: string;
    goalsAgainst: string;
    goalsDiff: string;
    points: string;
    opened: boolean;
}

export default function LeagueTableItemInfo({ totalGames, victories, draws, loses, goalsFor, goalsAgainst, goalsDiff, points, opened } : LeagueTableItemInfoProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const scale = useRef(new Animated.Value(0)).current;
    const height = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(opened) {
            setVisible(true);
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(height, {
                    toValue: 230,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(height, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                }),
            ]).start(() => { setVisible(false) });
        }
    }, [opened])

    const animatedStyle = {
        transform: [{scaleY: scale}],
        transformOrigin: 'top',
        height: height,
        opacity: opacity,
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.infoBox, animatedStyle]}>
            <InfoRow infoName="Pontos" info={points} />
            <InfoRow infoName="Jogos" info={totalGames} />
            <InfoRow infoName="Vitórias" info={victories} />
            <InfoRow infoName="Empates" info={draws} />
            <InfoRow infoName="Derrotas" info={loses} />
            <InfoRow infoName="Gols" info={goalsFor} />
            <InfoRow infoName="Gols sofridos" info={goalsAgainst} />
            <InfoRow infoName="Saldo de gols" info={goalsDiff} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    infoBox: {
        marginLeft: 38,
    },
    text: {
        fontSize: 14.5,
    }
});