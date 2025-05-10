import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { LeagueSelect } from '@/components/LeagueSelect';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

//scenes to render
import LigaPartidas from '../../../components/leagues/pagesComponents/LigaPartidas';
import LigaClassificacao from '../../../components/leagues/pagesComponents/LigaClassificacao';
import LigaRankings from '../../../components/leagues/pagesComponents/LigaRankings';

export default function Match() {
    const { matchId } = useLocalSearchParams();

    return (
        <View><ThemedText>Partida {matchId}</ThemedText></View>
    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative"
    },
    leagueImage: {
        width: 55,
        height: 45,
        marginRight: 5
    },
    star: {
        marginTop: -2,
        paddingLeft: 3,
        paddingRight: 3
    },
});