//Default Imports
import { StyleSheet, View, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useState } from "react";
import api from "@/lib/Axios"
import { z } from 'zod';

//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ReturnArrow } from "@/components/ReturnArrow";
import { FormInput } from "@/components/FormInput";
import { useUserContext } from "@/context/UserContext";

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
    const { user, login } = useUserContext();

    const [responseText, setResponseText] = useState('textin');
    
    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

    const handleForm = async ({user, email, password, confirmPassword}:userData) => {
        await api.post('auth/signup', {
            username: user,
            email: email,
            password: password
        }).then((response: any) => {
            // alert('foi');
            // console.log(response);
            login(response.data);
            router.replace('/');
        }).catch((response: any) => {
            alert('n foi');
            console.log(response);
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} >
            <ScrollView>
                <ThemedView style={styles.mainBlock}>
                    <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                        <ReturnArrow double={true} />
                    </View>

                    <LoginLogo />

                    <View style={styles.form}>
                        <ThemedText style={styles.titleText}>Cadastrar</ThemedText>

                        <View style={{width: '80%'}}>
                            <FormInput placeHolder="Nome de usuário" name="user" control={control} errors={errors} />
                            <FormInput placeHolder="Email" name="email" control={control} errors={errors} />
                            <FormInput placeHolder="Senha" name="password" control={control} errors={errors} isPassword={true} />
                            <FormInput placeHolder="Confirmar Senha" name="confirmPassword" control={control} errors={errors} isPassword={true} />
                            <ThemedButton style={{width: '100%'}} IconComponent={{Icon: Feather, name: 'plus', size: 25}} backgroundColor="Green" textColor="LightBackground" title="Cadastrar" handleClick={handleSubmit(handleForm)} />
                        </View>
                        {/* <ThemedText>{responseText}</ThemedText> */}

                        <ThemedText style={styles.loginText}>
                            Já tem uma conta?
                            {'  '}
                            <ThemedText
                                style={styles.loginText}
                                onPress={() => router.replace('/Login')}
                                darkColor={Colors.dark.Green}
                                lightColor={Colors.light.Green}>
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
    mainBlock: {
        display: 'flex',
        justifyContent: 'space-evenly',
        minHeight: windowHeight,
        paddingBottom: 20,
        paddingTop: 20,
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