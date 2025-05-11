import { StyleSheet } from 'react-native';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

interface LigaRankingsProps {
    leagueId: string | string[]
    season: number
}

export default function LigaRankings({leagueId, season} : LigaRankingsProps) {
    return (
        <ThemedScrollView>
            <ThemedText>Rankings</ThemedText>
        </ThemedScrollView>
    )
}