import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import Boot from '@/assets/Icons/Boot.svg';
import Shield from '@/assets/Icons/Shield.svg';
import Trophy from '@/assets/Icons/Trophy.svg';
import { useState } from "react";
import { router } from 'expo-router';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors"
import { useColorScheme } from '@/hooks/useColorScheme';

const windowWidth = Dimensions.get('window').width;

export default function BottomMenu() {
    const { theme } = useColorScheme();
    const [selected, setSelected] = useState(1);

    const getColor = (index: number) => {
        return index === selected ? Colors[theme].Red : Colors[theme].DarkerText
    }

    const getBackgroundColor = (index: number) => {
        return index === selected ? Colors[theme].Red : Colors[theme].DarkBackground
    }

    const getIconColor = (index: number) => {
        return index === selected ? Colors[theme].DarkBackground : Colors[theme].DarkerText
    }

    const changePage = (index: number, route: any) => {
        setSelected(index);
        router.replace(route);
    }

    const styles = StyleSheet.create({
        menu: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: windowWidth+2,
            height: 95,
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
            // backgroundColor: Colors[theme].Red,
            borderRadius: 10,
            paddingVertical: 3,
        }
    });

    return (
        <ThemedView darkColor={Colors.dark.LightBackground} lightColor={Colors.light.LightBackground}>
            <ThemedView style={styles.menu} darkColor={Colors.dark.DarkBackground} lightColor={Colors.light.DarkBackground}>

                <TouchableOpacity onPress={() => (changePage(0, "/Times"))}>
                    <View style={styles.item} >
                        <View style={[styles.selectedBackground, {backgroundColor: getBackgroundColor(0)}]}>
                            <Shield stroke={getIconColor(0)} strokeWidth={5} width={60} height={30} />
                        </View>
                        <ThemedText darkColor={getColor(0)}>Times</ThemedText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changePage(1, "/")}>
                    <View style={styles.item} >
                        <View style={[styles.selectedBackground, {backgroundColor: getBackgroundColor(1)}]}>
                            <Trophy fill={getIconColor(1)} width={60} height={30} />
                        </View>
                        <ThemedText darkColor={getColor(1)}>Ligas</ThemedText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changePage(2, "/Jogadores")}>
                    <View style={styles.item} >
                        <View style={[styles.selectedBackground, {backgroundColor: getBackgroundColor(2)}]}>
                            <Boot fill={getIconColor(2)} width={60} height={30} />
                        </View>
                        <ThemedText darkColor={getColor(2)}>Jogadores</ThemedText>
                    </View>
                </TouchableOpacity>

            </ThemedView>
        </ThemedView>
    );
}