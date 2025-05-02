import { TouchableOpacity, StyleSheet, Modal, View, Pressable, ViewProps, Dimensions, ScrollView } from "react-native"
import { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedText } from "./DefaultComponents/ThemedText"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { ThemedView } from "./DefaultComponents/ThemedView"
import { ThemedButton } from "./DefaultComponents/ThemedButton"

const windowWidth = Dimensions.get('window').width;

interface PickRoundProps extends ViewProps {
    values: {
        name: string
        value: string
    }[]
    selected: any
    setSelected: any
    selectFontSize?: number
    iconSize?: number
}

export function PickRound({ values, selected, setSelected, iconSize, ...otherProps } : PickRoundProps) {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            {modalOpened && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalOpened}
                    onRequestClose={() => {
                        setModalOpened(!modalOpened);
                    }}
                >
                <View style={styles.modalOverlay} />
                <View style={styles.centeredView}>
                  <ThemedView style={styles.modalView}>
                    <ThemedText style={styles.modalText}>Selecione uma rodada:</ThemedText>
                    <View style={styles.values}>
                        <ScrollView>
                            {values.map((option, index) => (
                                <Pressable
                                    onPress={() => {
                                        setSelected(Number(option.value));
                                        setModalOpened(!modalOpened);
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
                    <ThemedButton
                        title="Fechar"
                        backgroundColor='Red'
                        handleClick={() => setModalOpened(!modalOpened)}
                        textColor="Text"
                        style={styles.button}
                    >
                    </ThemedButton>
                  </ThemedView>
                </View>
              </Modal>
            )}


            <View style={styles.round}>
                <TouchableOpacity onPress={() => (
                    selected > 1 && setSelected((value: number) => value - 1)
                )}>
                    <ThemedIcon
                        IconComponent={MaterialIcons}
                        name='keyboard-arrow-left'
                        darkColor={Colors.dark.Text}
                        lightColor={Colors.light.Text}
                        size={21}
                        style={selected === 1 && {opacity: 0.3}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalOpened(!modalOpened)} {...otherProps}>
                    <View style={styles.currentRound}>
                        <ThemedText style={{fontFamily: "Kdam"}}>Rodada {selected}</ThemedText>
                        <ThemedIcon
                            IconComponent={Ionicons}
                            name='ellipsis-horizontal-circle-outline'
                            darkColor={Colors.dark.Text}
                            lightColor={Colors.light.Text}
                            size={21}
                            style={styles.pickRoundIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (
                        selected < 38 && setSelected((value: number) => value + 1)
                    )}>
                    <ThemedIcon
                        IconComponent={MaterialIcons}
                        name='keyboard-arrow-right'
                        darkColor={Colors.dark.Text}
                        lightColor={Colors.light.Text}
                        size={21}
                        style={selected === 38 && {opacity: 0.3}}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.7,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: "90%",
        maxWidth: 400,
        opacity: 1.5
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 19,
        fontFamily: "Kdam"
    },
    values: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        maxHeight: 300
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
    round: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: windowWidth*0.8,
        maxWidth: 300,
        marginLeft: "auto",
        marginRight: "auto"
    },
    currentRound: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    pickRoundIcon: {
        marginTop: -2,
        paddingHorizontal: 5
    }
});