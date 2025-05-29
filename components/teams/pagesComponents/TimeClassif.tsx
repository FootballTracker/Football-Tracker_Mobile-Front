import { StyleSheet } from 'react-native';
import { memo } from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

function TimeClassificacao() {
    return (
        <ThemedScrollView>
            <ThemedText>Classificação</ThemedText>
        </ThemedScrollView>
    )
}

export default memo(TimeClassificacao);