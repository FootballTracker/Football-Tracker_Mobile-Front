import { StyleProp, StyleSheet, View, ViewProps, ViewStyle  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

import { ThemedText } from './DefaultComponents/ThemedText'; 
import { ThemedIcon } from './DefaultComponents/ThemedIcon';

interface InfoMessageProps extends ViewProps {
    text: string;
    fontSize?: number;
    viewStyle?: StyleProp<ViewStyle>;
}

export default function InfoMessage({ text, fontSize = 14, style, ...rest }: InfoMessageProps) {

    return (
        <View style={[styles.view, style]} {...rest}>
            <ThemedIcon IconComponent={Feather} name="info" size={15} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText} />
            <ThemedText style={[styles.favoritesInfoText, {fontSize: fontSize}]} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText}>
                {` ${text}`}
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 10,
    },
    favoritesInfoText: {
        textAlign: "center",
        height: 20,
    },
});