//Default Imports
import { StyleSheet, View, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";
import api from "@/lib/Axios"
import { z } from 'zod';
import { UserContext, useUserContext } from "@/context/UserContext";

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
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    
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
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Ocorreu algum erro. Tente novamente');
        })
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        // Limpeza do listener quando o componente for desmontado
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} >
            <ScrollView>
                <ThemedView style={[styles.background, {minHeight: keyboardVisible ? '100%' : windowHeight}]}>
                    <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                        <ReturnArrow double={true} />
                    </View>

                    {!keyboardVisible && <LoginLogo />}

                    <View style={styles.form}>
                        <ThemedText style={styles.titleText}>Cadastrar</ThemedText>

                        <View style={{width: '80%'}}>
                            <FormInput placeHolder="Nome de usuário" name="user" control={control} errors={errors} />
                            <FormInput placeHolder="Email" name="email" control={control} errors={errors} />
                            <FormInput placeHolder="Senha" name="password" control={control} errors={errors} isPassword={true} />
                            <FormInput placeHolder="Confirmar Senha" name="confirmPassword" control={control} errors={errors} isPassword={true} />
                            <ThemedButton style={{width: '100%'}} IconComponent={{Icon: Feather, name: 'plus', size: 25}} backgroundMidnightcolor={Colors.dark.Green} textColor="LightBackground" title="Cadastrar" handleClick={handleSubmit(handleForm)} />
                        </View>

                        <ThemedText style={styles.loginText}>
                            Já tem uma conta?
                            {'  '}
                            <ThemedText
                                style={styles.loginText}
                                onPress={() => router.replace('/(auth)/Login')}
                                darkColor={Colors.dark.Green}
                                lightColor={Colors.light.Green}
                            >
                                Faça login
                            </ThemedText>
                        </ThemedText>
                    </View>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
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