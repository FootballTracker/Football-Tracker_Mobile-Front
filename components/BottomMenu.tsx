import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useState } from "react";
import { RelativePathString, router } from 'expo-router';

import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors"

const windowWidth = Dimensions.get('window').width;

interface Props {
    setText: React.Dispatch<React.SetStateAction<string>>
}

export default function BottomMenu({ setText }: Props) {

    const [selected, setSelected] = useState(1);

    const getColor = (index: number) => {
        return index === selected ? Colors.dark.Red : Colors.dark.DarkerWhite
    }

    const getIconColor = (index: number) => {
        return index === selected ? Colors.dark.DarkBackground : Colors.dark.DarkerWhite
    }

    const changePage = (index: number, text: string, route: any) => {
        setSelected(index);
        setText(text);
        router.navigate(route);
    }

    return (
        <ThemedView style={styles.menu} darkColor={Colors.dark.DarkBackground} lightColor={Colors.light.DarkBackground}>

            <TouchableOpacity onPress={() => (changePage(0, "Times", "/Times"))}>
                <View style={styles.item} >
                    <View style={[styles.selectedBackground, selected == 0 ? {opacity: 1} : {opacity: 0}]} />
                    <MaterialCommunityIcons name="shield-outline" size={30} color={getIconColor(0)} />
                    <ThemedText darkColor={getColor(0)}>Times</ThemedText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changePage(1, "Ligas", "/")}>
                <View style={styles.item} >
                    <View style={[styles.selectedBackground, selected == 1 ? {opacity: 1} : {opacity: 0}]} />
                    <SimpleLineIcons name="trophy" size={30} color={getIconColor(1)} />
                    <ThemedText darkColor={getColor(1)}>Ligas</ThemedText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changePage(2, "Jogadores", "/Jogadores")}>
                <View style={styles.item} >
                    <View style={[styles.selectedBackground, selected == 2 ? {opacity: 1} : {opacity: 0}]} />
                    <FontAwesome6 name="person-running" size={30} color={getIconColor(2)} />
                    <ThemedText darkColor={getColor(2)}>Jogadores</ThemedText>
                </View>
            </TouchableOpacity>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: windowWidth+2,
        height: 100,
        left: -1,
        bottom: -1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 0.5,
        borderColor: Colors.dark.Red
    },
    item: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Kokoro",
        gap: 8,
        minWidth: 20,
        maxWidth: 90,
        width: windowWidth * 0.25
    },
    selectedBackground: {
        position: "absolute",
        top: -2.5,
        backgroundColor: Colors.dark.Red,
        borderRadius: 12,
        width: 60,
        height: 35,
    }
});