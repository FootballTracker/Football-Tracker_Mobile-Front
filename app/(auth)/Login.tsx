//Default Imports
import { StyleSheet, View, Dimensions, ScrollView, Animated, Keyboard, KeyboardEvent } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import api from "@/lib/Axios";
import { useUserContext } from "@/context/UserContext";
import { Toast } from "toastify-react-native";


//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText"
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ReturnArrow } from "@/components/ReturnArrow";
import { FormInput } from "@/components/FormInput";

//Consts
const windowHeight = Dimensions.get('window').height;
const userData = z.object({
    user: z.string({message: 'Obrigatório'}).min(1, 'Obrigatório'),
    password: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
})

//Types
type userData = z.infer<typeof userData>

export default function Login() {
    const { login } = useUserContext();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const translateAnim = useRef(new Animated.Value(0)).current;
    
    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (event: KeyboardEvent) => {
            setKeyboardHeight(event.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    Animated.timing(translateAnim, {
        toValue: -keyboardHeight,
        duration: 150,
        useNativeDriver: true,
    }).start();

    const handleForm = async ({user, password}:userData) => {
        await api.post('auth/signin', {
            username: user,
            password: password
        }).then((response: any) => {
            login(response.data);
            while (router.canGoBack()) {
                router.back();
            }
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    },
                    useModal: true
                })
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Ocorreu algum erro. Tente novamente"
                    },
                })
            }
        })
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <ThemedView style={{position: 'absolute', width: '100%', height: '100%'}} />

            <Animated.View style={{transform: [{translateY: translateAnim}]}}>
                <ThemedView style={styles.background}>
                    <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                        <ReturnArrow />
                    </View>
                        <LoginLogo />

                        <View style={styles.form}>
                            <ThemedText style={styles.titleText}>Login</ThemedText>
                            <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Faça login para personalizar sua experiência com jogadores, ligas e times favoritos.</ThemedText>
            
                            <View style={{width: '80%'}}>
                                <FormInput placeHolder="Usuário ou Email" name="user" control={control} errors={errors} keyboardType="email-address"/>
                                <FormInput placeHolder="Senha" name="password" isPassword control={control} errors={errors} />
                                <ThemedButton style={{width: '100%'}} IconComponent={{Icon: Ionicons, name: 'enter-outline'}} textColor="LightBackground" title="Entrar" handleClick={handleSubmit(handleForm)} />
                            </View>
                            
                            <ThemedText style={[styles.registerText]}>
                                Ainda não tem uma conta?
                                {'  '}
                                <ThemedText
                                    style={styles.registerText}
                                    onPress={() => router.replace('/(auth)/Cadastro')}
                                    colorName="Green"
                                >
                                    Cadastre-se
                                </ThemedText>
                            </ThemedText>
                        </View>
                </ThemedView>
            </Animated.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        justifyContent: 'space-evenly',
        minHeight: windowHeight,
        paddingTop: 25,
        paddingBottom: 20,
    },
    titleText: {
        fontFamily: 'Koulen',
        fontSize: 23,
    },
    infoText: {
        fontFamily: 'Kdam',
        fontSize: 12,
        marginHorizontal: 20,
        justifyContent: 'center',
        lineHeight: 20,
    },
    form: {
        alignItems: 'center',
        display: 'flex',
        gap: 20,
    },
    registerText: {
        fontFamily: 'Kokoro',
        fontSize: 13,
        lineHeight: 13,
        paddingVertical: 2
    },
    errorText: {

    },
});