//Default Imports
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

//Components
import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { ModalComponent } from "./ModalComponent";

//Icons
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Colors";

//Types
type SelectProps = {
    title: string;
    values: {
        name: string
        value: string
    }[];
    setSelected: (value: any) => void;
    modalOpened: boolean;
    setModalOpened: (value: boolean) => void;
    centered?: boolean;
}

export function Select({ title, values, setSelected, modalOpened, setModalOpened, centered = true } : SelectProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
    headerBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        width: "90%",
        fontSize: 17,
    },
    values: {
        width: "100%",
        marginTop: 16,
        paddingTop: 10,
        alignItems: "stretch",
        borderTopWidth: 0.5,
        borderBlockColor: Colors[theme].Red,
        maxHeight: 500
    },
    option: {
        width: "100%",
        paddingVertical: 7,
        // borderTopWidth: 0.5,
        // borderBottomWidth: 0.5,
        // borderColor: Colors[theme].DarkBackground,
    },
});

    return (
        <ModalComponent modalOpened={modalOpened} setModalOpened={setModalOpened}>
            <View style={styles.headerBox}>
                <ThemedText style={styles.modalText}>{title}</ThemedText>
                <ThemedIcon IconComponent={AntDesign} name="close" colorName="Red" onPress={() => {setModalOpened(false)}} />
            </View>
            <View style={styles.values}>
                <ScrollView>
                    {values.map((option, index) => (
                        <Pressable
                            onPress={() => {
                                setSelected(option.value);
                                setModalOpened(false);
                            }}
                            key={index}
                        >
                            <View style={styles.option}>
                                <ThemedText style={centered && {textAlign: "center"}}>{option.name}</ThemedText>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </ModalComponent>
    )
}