//Default Imports
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'expo-router';
import { MatchCardI } from '@/components/matches/MatchCard';
import { Animated, StyleProp, StyleSheet } from 'react-native';

export interface TeamStatistics {
    shotsOnGoal: number;
    shotsOffGoal: number;
    shotsInsidebox: number;
    shotsOutsidebox: number;
    totalShots: number;
    blockedShots: number;
    fouls: number;
    cornerKicks: number;
    offsides: number;
    ballPossession: string;
    yellowCards: number;
    redCards: number;
    goalkeeperSaves: number;
    totalPasses: number;
    passesAccurate: number;
    passesPercentage: string;
}

export interface MatchI {
    match: MatchCardI;
    info: {
        referee: string;
        venue: string;
        city: string;
        status: string;
        matchTime: string;
        league: string;
        leagueLogo: string;
        country: string;
        countryFlag: string;
        season: number;
        round: number;
    }
    statistics: {
        home_team: TeamStatistics;
        away_team: TeamStatistics;
    } | null,
}

type matchContextType = {
    match: MatchI | undefined;
    setMatch: Dispatch<SetStateAction<MatchI | undefined>>;
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    animatedStyles: StyleProp<any>;
}

const MatchContext = createContext<matchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
    const [match, setMatch] = useState<MatchI | undefined>();
    const [index, setIndex] = useState<number>(0);

    const animationDuration = 150;
    const nativeDriver = true;

    const defaultTeamLogoTranslateY = 0;
    const changedTeamLogoTranslateY = -15;
    const defaultLeftTeamLogoTranslateX = 0;
    const changedLeftTeamLogoTranslateX = 35;
    const defaultRightTeamLogoTranslateX = 0;
    const changedRightTeamLogoTranslateX = -35;
    const defaultReamLogoScale = 1;
    const changedReamLogoScale = .8;
    const defaultOpacity = 1;
    const changedOpacity = 0;
    const defaultResultTranslateY = 0;
    const changedResultTranslateY = -25;
    const defaultTabViewMarginTop = 100;
    const changedTabViewMarginTop = 35;

    const teamLogoTranslateY = useRef(new Animated.Value(defaultTeamLogoTranslateY)).current;
    const leftTeamLogoTranslateX = useRef(new Animated.Value(defaultLeftTeamLogoTranslateX)).current;
    const rightTeamLogoTranslateX = useRef(new Animated.Value(defaultRightTeamLogoTranslateX)).current;
    const teamLogoScale = useRef(new Animated.Value(defaultReamLogoScale)).current;
    const opacity = useRef(new Animated.Value(defaultOpacity)).current;
    const resultTranslateY = useRef(new Animated.Value(defaultResultTranslateY)).current;
    const tabViewMarginTop = useRef(new Animated.Value(defaultTabViewMarginTop)).current;

    useEffect(() => {
        if(index) {
            Animated.parallel([
                Animated.timing(teamLogoTranslateY, {
                    toValue: changedTeamLogoTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(leftTeamLogoTranslateX, {
                    toValue: changedLeftTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(rightTeamLogoTranslateX, {
                    toValue: changedRightTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(teamLogoScale, {
                    toValue: changedReamLogoScale,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(opacity, {
                    toValue: changedOpacity,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(resultTranslateY, {
                    toValue: changedResultTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(tabViewMarginTop, {
                    toValue: changedTabViewMarginTop,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.timing(teamLogoTranslateY, {
                    toValue: defaultTeamLogoTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(leftTeamLogoTranslateX, {
                    toValue: defaultLeftTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(rightTeamLogoTranslateX, {
                    toValue: defaultRightTeamLogoTranslateX,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(teamLogoScale, {
                    toValue: defaultReamLogoScale,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(opacity, {
                    toValue: defaultOpacity,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(resultTranslateY, {
                    toValue: defaultResultTranslateY,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
                Animated.timing(tabViewMarginTop, {
                    toValue: defaultTabViewMarginTop,
                    duration: animationDuration,
                    useNativeDriver: nativeDriver
                }),
            ]).start();
        }
    }, [index]);

    const animatedStyles = StyleSheet.create({
        rightTeamLogo: {
            transform: [
                {translateY: teamLogoTranslateY},
                {translateX: leftTeamLogoTranslateX},
                {scale: teamLogoScale},
            ],
        },
        leftTeamLogo: {
            transform: [
                {translateY: teamLogoTranslateY},
                {translateX: rightTeamLogoTranslateX},
                {scale: teamLogoScale},
            ],
        },
        text: {
            opacity: opacity,
            transform: [
                {translateY: teamLogoTranslateY},
            ],
        },
        result: {
            transform: [
                {translateY: resultTranslateY},
            ],
        },
        tabView: {
            transform: [
                {translateY: tabViewMarginTop},
            ],
        },
    });

    return (
        <MatchContext.Provider value={{ match, setMatch, index, setIndex, animatedStyles }}>
            {children}
        </MatchContext.Provider>
    );
};

export const useMatch = (): matchContextType => {
    const context = useContext(MatchContext);

    if (!context) {
        throw new Error('useMatch deve ser usado dentro de um MatchProvider');
    }
    return context;
};