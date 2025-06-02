import { StyleSheet } from 'react-native';
import { memo } from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

interface LigaRankingsProps {
    season: number
    leagueId: number
}

function LigaRankings({leagueId, season} : LigaRankingsProps) {
    return (
        <ThemedScrollView>
            <ThemedText>Rankings</ThemedText>
        </ThemedScrollView>
    )
}

export default memo(LigaRankings, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});