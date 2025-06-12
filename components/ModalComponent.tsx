import { StyleSheet, View, ViewProps, Animated } from "react-native"
import { useEffect, useRef, useState } from "react"
import Modal from 'react-native-modal';

import { ThemedView, ThemedViewProps } from "./DefaultComponents/ThemedView"
import { Portal } from "react-native-portalize"

interface ModalProps extends ViewProps {
    modalOpened: boolean
    setModalOpened: any
    backgroundViewOpacity?: number
    modalViewProps?: ThemedViewProps
}

export function ModalComponent({ modalOpened, setModalOpened, backgroundViewOpacity, modalViewProps, children } : ModalProps) {
    const indicatorOpacity = useRef(new Animated.Value(0)).current;
    const backgroundOpacity = backgroundViewOpacity ? backgroundViewOpacity : .8;

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
                backdropOpacity={0}
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                animationInTiming={300}
                animationOutTiming={200}
                useNativeDriver={true}
                isVisible={modalOpened}
                onBackdropPress={() => {
                    setModalOpened(false);
                }}
                style={{
                    width: "100%",
                    marginHorizontal: "auto",
                    height: "100%",
                }}
                >
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView} {... modalViewProps && modalViewProps }>
                    {children}
                    {/* {buttonProps ? (
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
                    )} */}
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
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    modalView: {
        margin: 20,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: "90%",
        maxWidth: 400,
        position: 'absolute',
    },
    button: {
        marginTop: 15,
        borderRadius: 14,
        height: 45,
        width: 100,
    },
});