import { StyleSheet } from 'react-native';
import React from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

interface LigaClassificacaoProps {
    leagueId: string | string[]
    season: number
}

function LigaClassificacao({leagueId, season} : LigaClassificacaoProps) {
    return (
        <ThemedScrollView>
            <ThemedText>Classificação</ThemedText>
        </ThemedScrollView>
    )
}

export default React.memo(LigaClassificacao, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});