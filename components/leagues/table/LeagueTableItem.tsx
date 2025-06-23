//Default Imports
import { Colors } from "@/constants/Colors";
import { Animated, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useRef, useState } from "react";

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import LeagueTableItemInfo from "./LeagueTableItemInfo";
import { Image, Pressable, View } from "react-native";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

export interface LeagueTableItemProps {
    teamId: string;
    teamName: string;
    teamLogo: string;
    rank: string;
    totalGames: string;
    victories: string;
    draws: string;
    loses: string;
    goalsFor: string;
    goalsAgainst: string;
    goalsDiff: string;
    points: string;
}

export default function LeagueTableItem({ teamId, teamName, teamLogo, rank, totalGames, victories, draws, loses, goalsFor, goalsAgainst, goalsDiff, points }: LeagueTableItemProps ) {
    const [opened, setOpened] = useState<boolean>(false);
    const rotation = useRef(new Animated.Value(0)).current;

    Animated.timing(rotation, {
        toValue: opened ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
    }).start();

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    const handleOpen = () => {
        setOpened(!opened);
    }

    function accessTeam() {
        router.push(`/(pages)/team/${teamId}` as any);
    }
    
    return (
        <Pressable onPress={handleOpen}>
            <View style={styles.row}>
                <ThemedText style={styles.rank}
                    {...Number(rank) < 5 ?
                        {colorName: 'Green'}
                        : Number(rank) > 16 && 
                        {colorName: 'Red'}
                    }
                >
                    {rank}
                </ThemedText>
                <View style={styles.teamInfo}>
                    <Pressable onPress={accessTeam}><Image source={{uri: teamLogo}} style={styles.teamLogo} resizeMode='contain'/></Pressable>
                    <ThemedText onPress={accessTeam} style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">{teamName}</ThemedText>
                </View>

                <Animated.View style={[animatedStyle, {width: 25, height: 25}]}>
                    <ThemedIcon
                        onPress={handleOpen}
                        IconComponent={MaterialIcons}
                        name='expand-more'
                        colorName="Red"
                        size={25}
                    />
                </Animated.View>

                {/* <ThemedText style={styles.item}>{points}</ThemedText>
                <ThemedText style={styles.item}>{victories}</ThemedText> */}
            </View>
            
            <LeagueTableItemInfo
                draws={draws}
                goalsAgainst={goalsAgainst}
                goalsDiff={goalsDiff}
                goalsFor={goalsFor}
                loses={loses}
                points={points}
                totalGames={totalGames}
                victories={victories}
                opened={opened}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignContent: "center",
        gap: 25,
        width: '100%',
        marginTop: 10,
        marginVertical: 3,
    },
    rank: {
        fontFamily: "Kdam",
        textAlign: "center",
        fontSize: 13,
        width: 20
    },
    teamInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginLeft: -15,
    },
    teamName: {
        fontSize: 14.5,
    },
    teamLogo: {
        height: 25,
        width: 25,
        marginRight: 13
    },
    item: {
        width: 25,
        textAlign: "center",
        fontSize: 14,
    }
});