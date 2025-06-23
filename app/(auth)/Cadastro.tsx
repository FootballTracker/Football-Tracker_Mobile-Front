//Default Imports
import { StyleSheet, View, Dimensions, ScrollView, Animated, Keyboard, KeyboardEvent } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import api from "@/lib/Axios"
import { useEffect, useRef, useState } from "react";
import { z } from 'zod';
import { useUserContext } from "@/context/UserContext";
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { Toast } from "toastify-react-native";

//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ReturnArrow } from "@/components/ReturnArrow";
import { FormInput } from "@/components/FormInput";

//Consts
const windowHeight = Dimensions.get('window').height;
const userData = z.object({
    user: z.string({message: 'Obrigatório'}).min(1, 'Obrigatório'),
    email: z.string({message: 'Obrigatório'}).email('Insira um email válido'),
    password: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
    confirmPassword: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres'),
}).refine(({password, confirmPassword}) => {return password === confirmPassword}, {message: 'As senhas não são iguais', path: ['confirmPassword']})

//Types
type userData = z.infer<typeof userData>

export default function Cadastro() {
    const { login } = useUserContext();
    const keyboard = useAnimatedKeyboard({isStatusBarTranslucentAndroid: true});
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const translateAnim = useRef(new Animated.Value(0)).current;

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
    
    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

    const handleForm = async ({user, email, password}:userData) => {
        await api.post('auth/signup', {
            username: user,
            email: email,
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
                <ThemedView style={[styles.background]}>
                    <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                        <ReturnArrow double={true} />
                    </View>

                    <LoginLogo />

                    <View style={styles.form}>
                        <ThemedText style={styles.titleText}>Cadastrar</ThemedText>

                        <View style={{width: '80%'}}>
                            <FormInput placeHolder="Nome de usuário" name="user" control={control} errors={errors} />
                            <FormInput placeHolder="Email" name="email" control={control} errors={errors} keyboardType="email-address"/>
                            <FormInput placeHolder="Senha" name="password" control={control} errors={errors} isPassword={true} />
                            <FormInput placeHolder="Confirmar Senha" name="confirmPassword" control={control} errors={errors} isPassword={true} />
                            <ThemedButton style={{width: '100%'}} IconComponent={{Icon: Feather, name: 'plus', size: 25}} textColor="LightBackground" title="Cadastrar" handleClick={handleSubmit(handleForm)} />
                        </View>

                        <ThemedText style={[styles.loginText]}>
                            Já tem uma conta?
                            {'  '}
                            <ThemedText
                                style={styles.loginText}
                                onPress={() => router.replace('/(auth)/Login')}
                                colorName="Green"
                            >
                                Faça login
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
        paddingBottom: 20,
        paddingTop: 25,
    },
    titleText: {
        fontFamily: 'Koulen',
        fontSize: 23,
    },
    infoText: {
        fontFamily: 'Kokoro,',
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
    loginText: {
        fontFamily: 'Kokoro',
        fontSize: 13,
        lineHeight: 13,
    }
});