import { StyleSheet } from 'react-native';
import React from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

interface LigaRankingsProps {
    leagueId: string | string[]
    season: number
}

function LigaRankings({leagueId, season} : LigaRankingsProps) {
    return (
        <ThemedScrollView>
            <ThemedText>Rankings</ThemedText>
        </ThemedScrollView>
    )
}

export default React.memo(LigaRankings, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});