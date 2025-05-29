import { StyleSheet } from 'react-native';
import { memo } from 'react'

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

function TimeEquipe() {
    return (
        <ThemedScrollView>
            <ThemedText>Time equipe</ThemedText>
        </ThemedScrollView>
    )
}

export default memo(TimeEquipe);