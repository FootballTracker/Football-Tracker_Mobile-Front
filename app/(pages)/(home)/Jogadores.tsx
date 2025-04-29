import { StyleSheet, Dimensions } from 'react-native';

import { ThemedText } from "../../../components/DefaultComponents/ThemedText";
import { ThemedView } from "../../../components/DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Jogadores() {
    return (
        <ThemedView lightColor={Colors.light.LightBackground} darkColor={Colors.dark.LightBackground} style={styles.background}>
            <ThemedText>Jogadores</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        minHeight: windowHeight
    },
});