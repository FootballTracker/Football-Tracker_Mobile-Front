import { Colors } from '@/constants/Colors';
import { useTheme } from "@/context/ThemeContext";
import { Foundation } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Toast as T } from 'toastify-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { ThemedIcon, ThemedIconProps } from '@/components/DefaultComponents/ThemedIcon';

interface ToastProps {
    type: "info" | "success" | "error" | "warn";
    title?: string;
    text?: string;
    icon?: ThemedIconProps;
    backgroundColor?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight;
    textColor?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight;
    visibilityTime: number;
    showCloseButton: boolean;
    showProgressBar?: boolean
}

export default function Toast({type = "info", title, text, icon, backgroundColor, textColor, visibilityTime, showCloseButton = true, showProgressBar = true}: ToastProps) {
    const { theme } = useTheme();
    const opacityValue = useRef(new Animated.Value(0)).current;
    const barWidth = useRef(new Animated.Value(100)).current;
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const typeTitles = {
        info: "Alerta",
        success: "Sucesso",
        error: "Erro",
        warn: "Aviso"
    }

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
        timeout.current = setTimeout(() => {
            hideToast();
        }, visibilityTime - 200);
    }, []);

    useEffect(() => {
        if (showProgressBar) {
                Animated.timing(barWidth, {
                toValue: 0,
                duration: visibilityTime,
                useNativeDriver: false
            }).start();
        }
    }, [visibilityTime, barWidth, showProgressBar]);

    function hideToast() {
        if(timeout.current) {
            clearTimeout(timeout.current)
            timeout.current = null;
        }
        Animated.timing(opacityValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            T.hide();
        });
    }

    const styles = StyleSheet.create({
        toast: {
            position: "relative",
            width: '90%',
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 5,
        },
        textView: {
            flex: 1,
            marginLeft: 10,
        },
        title: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        text: {
            fontSize: 14,
            marginTop: 4,
        },
        progressBarView: {
            flexDirection: "row",
            position: "absolute",
            height: 4,
            width: "100%",
            bottom: 0,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            overflow: 'hidden',
        }
    });

    return (
        <Animated.View style={{opacity: opacityValue}}>
            <ThemedView style={styles.toast} colorName={backgroundColor ? backgroundColor : "DarkBackground"}>
                {icon ? (
                    <ThemedIcon {...icon} />
                ) : type === "info" ? (
                    <ThemedIcon IconComponent={Foundation} name="info" size={26} colorName="DarkerText" />
                ) : type === "success" ? (
                    <ThemedIcon IconComponent={AntDesign} name='checkcircle' size={20} colorName="Green" />
                ) : type === "error" ? (
                    <ThemedIcon IconComponent={MaterialIcons} name='error' size={25} colorName="Red" />
                ) : (
                    <ThemedIcon IconComponent={Ionicons} name='warning' size={24} colorName="Yellow" />
                )}
                <View style={styles.textView}>
                    <ThemedText style={styles.title} colorName={textColor ? textColor : "Text"}>{title ? title : typeTitles[type]}</ThemedText>
                    {text && <ThemedText style={styles.text} colorName={textColor ? textColor : "Text"}>{text}</ThemedText>}
                </View>
                {showCloseButton && (
                    <TouchableOpacity onPress={hideToast} style={{padding: 2, backgroundColor: Colors[theme].Red, borderRadius: 100}}>
                        <ThemedIcon IconComponent={AntDesign} name="close" size={16} colorName="DarkBackground" onPress={hideToast}/>
                    </TouchableOpacity>
                )}
                {showProgressBar && (
                    <View style={styles.progressBarView}>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: 0,
                                width: barWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%']
                                }),
                                backgroundColor: Colors[theme].Red,
                                height: '100%'
                            }}
                        />
                    </View>
                )}
            </ThemedView>
        </Animated.View>
    )
}