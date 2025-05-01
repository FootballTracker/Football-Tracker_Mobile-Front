import { TouchableOpacity, StyleSheet, Modal, View, Pressable, ViewProps } from "react-native"
import { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

import { ThemedText } from "./DefaultComponents/ThemedText"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { ThemedView } from "./DefaultComponents/ThemedView"
import { ThemedButton } from "./DefaultComponents/ThemedButton"

interface SelectProps extends ViewProps {
    values: {
        name: string
        value: string
    }[]
    selected: any
    setSelected: any
    selectFontSize?: number
    iconSize?: number
}

export function Select({ values, selected, setSelected, selectFontSize, iconSize, ...otherProps } : SelectProps) {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            {modalOpened && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalOpened}
                    onRequestClose={() => {
                        setModalOpened(!modalOpened);   
                    }}
                >
                <ThemedView style={styles.centeredView} darkColor="black" lightColor="black">
                  <ThemedView style={styles.modalView}>
                    <ThemedText style={styles.modalText}>Selecione uma temporada da liga:</ThemedText>
                    <View style={styles.values}>
                        {values.map((option, index) => (
                            <Pressable
                                onPress={() => {
                                    setSelected(option.value);
                                    setModalOpened(!modalOpened);
                                }}
                                key={index}
                            >
                                <View style={styles.option}>
                                    <ThemedText style={{textAlign: "center"}}>{option.name}</ThemedText>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                    <ThemedButton
                        title="Fechar"
                        backgroundColor='Red'
                        handleClick={() => setModalOpened(!modalOpened)}
                        textColor="Text"
                        style={styles.button}
                    >
                    </ThemedButton>
                  </ThemedView>
                </ThemedView>
              </Modal>
            )}


            <TouchableOpacity onPress={() => setModalOpened(!modalOpened)} {...otherProps}>
                <View style={styles.select}>
                    <ThemedText lightColor={Colors.light.DarkerText} darkColor={Colors.dark.DarkerText} style={{fontSize: selectFontSize && selectFontSize}}>
                        {selected}
                    </ThemedText>
                    <ThemedIcon
                        IconComponent={MaterialIcons}
                        name='keyboard-arrow-down'
                        darkColor={Colors.dark.DarkerText}
                        lightColor={Colors.light.DarkerText}
                        size={iconSize ? iconSize : 22}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    select: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
      },
    modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: "90%",
    maxWidth: 400
    },
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
    },
    option: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5
    },
    button: {
        marginTop: 15,
        borderRadius: 14,
        height: 45,
        width: 100,
    },
});