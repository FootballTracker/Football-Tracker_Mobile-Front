import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from "../../../components/DefaultComponents/ThemedText";
import { ThemedView } from "../../../components/DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";

const windowHeight = Dimensions.get('window').height;

export default function Times() {
    return (
        <ThemedView lightColor={Colors.light.LightBackground} darkColor={Colors.dark.LightBackground} style={styles.background}>
            <ThemedText>Times</ThemedText>
            <TouchableOpacity onPress={() => router.navigate("/(pages)/Time")}>
                <ThemedText>Ir para Time</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        minHeight: windowHeight
    },
});