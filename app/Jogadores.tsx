import { StyleSheet, Dimensions } from 'react-native';

import { ThemedText } from "../components/DefaultComponents/ThemedText";
import { ThemedView } from "../components/DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Jogadores() {
    return (
        <ThemedText>Jogadores</ThemedText>
    );
}

const styles = StyleSheet.create({

});