//Default Imports
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

//Components
import { ThemedText } from "./DefaultComponents/ThemedText";
import { ModalComponent } from "./ModalComponent";
import React from "react";

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
}

export function Select({ title, values, setSelected, modalOpened, setModalOpened } : SelectProps) {
    return (
        <ModalComponent modalOpened={modalOpened} setModalOpened={setModalOpened}>
            <ThemedText style={styles.modalText}>{title}</ThemedText>
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
                                <ThemedText style={{textAlign: "center"}}>{option.name}</ThemedText>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </ModalComponent>
    )
}

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 19,
        fontFamily: "Kdam"
    },
    values: {
        width: "100%",
        alignItems: "stretch",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        maxHeight: 500
    },
    option: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5
    },
});