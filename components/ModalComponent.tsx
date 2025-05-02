import { StyleSheet, Modal, View, ViewProps, Animated, Dimensions } from "react-native"
import { useEffect, useRef } from "react"

import { ThemedView, ThemedViewProps } from "./DefaultComponents/ThemedView"
import { ThemedButton, ThemedButtonProps } from "./DefaultComponents/ThemedButton"
import { Portal } from "react-native-portalize"

interface ModalProps extends ViewProps {
    modalOpened: boolean
    setModalOpened: any
    backgroundViewOpacity?: number
    modalViewProps?: ThemedViewProps
    buttonProps?: ThemedButtonProps
}

export function ModalComponent({ modalOpened, setModalOpened, backgroundViewOpacity, modalViewProps, buttonProps, children } : ModalProps) {

    const indicatorOpacity = useRef(new Animated.Value(0)).current;
    const backgroundOpacity = backgroundViewOpacity ? backgroundViewOpacity : 0.8;

    useEffect(() => {
        Animated.timing(indicatorOpacity, {
            toValue: modalOpened ? backgroundOpacity : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [modalOpened]);

    return (
        <>
        <Portal>
            <Animated.View
                pointerEvents={modalOpened ? "auto" : "none"}
                style={[styles.modalBackView,  {opacity: indicatorOpacity}]}
            />
        </Portal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpened}
                onRequestClose={() => {
                    setModalOpened(!modalOpened);
                }}
            >
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView} {... modalViewProps && modalViewProps }>
                    {children}
                    {buttonProps ? (
                        <ThemedButton
                            title={buttonProps.title}
                            backgroundColor={buttonProps.backgroundColor}
                            handleClick={() => setModalOpened(!modalOpened)}
                            textColor={buttonProps.textColor}
                            IconComponent={buttonProps.IconComponent && buttonProps.IconComponent}
                            style={buttonProps.style ? buttonProps.style : styles.button}
                        />
                    ) : (
                        <ThemedButton
                            title="Fechar"
                            backgroundColor='Red'
                            handleClick={() => setModalOpened(!modalOpened)}
                            textColor="Text"
                            style={styles.button}
                        />
                    )}
                    </ThemedView>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalBackView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: "90%",
        maxWidth: 400,
    },
    button: {
        marginTop: 15,
        borderRadius: 14,
        height: 45,
        width: 100,
    },
});