import { StyleSheet, View  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

import { ThemedText } from './DefaultComponents/ThemedText'; 
import { ThemedIcon } from './DefaultComponents/ThemedIcon';

interface InfoMessageProps {
    text: string;
}

export default function InfoMessage({ text, ...rest }: InfoMessageProps) {
    return (
        <View {...rest}>
            <ThemedText style={styles.favoritesInfoText} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText}>
                <ThemedIcon IconComponent={Feather} name="info" size={15} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText} />
                {` ${text}`}
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    favoritesInfoText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
    },
});