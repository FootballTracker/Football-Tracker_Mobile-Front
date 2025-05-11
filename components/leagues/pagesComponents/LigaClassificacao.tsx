import { StyleSheet } from 'react-native';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

interface LigaClassificacaoProps {
    leagueId: string | string[]
    season: number
}

export default function LigaClassificacao({leagueId, season} : LigaClassificacaoProps) {
    return (
        <ThemedScrollView>
            <ThemedText>Classificação</ThemedText>
        </ThemedScrollView>
    )
}