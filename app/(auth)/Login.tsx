//Default Imports
import { StyleSheet, View, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import api from "@/lib/Axios";

//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText"
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ReturnArrow } from "@/components/ReturnArrow";
import { FormInput } from "@/components/FormInput";
import { useUserContext } from "@/context/UserContext";

//Consts
const windowHeight = Dimensions.get('window').height;
const userData = z.object({
    user: z.string({message: 'Obrigatório'}).min(1, 'Obrigatório'),
    password: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
})

//Types
type userData = z.infer<typeof userData>

export default function Login() {
    const { user, login } = useUserContext();

    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

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
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Ocorreu algum erro. Tente novamente');
        })
    }

    return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
                <ScrollView>
                    <ThemedView style={[styles.background]}>
                        <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                            <ReturnArrow />
                        </View>
                        
                        <LoginLogo />

                        <View style={styles.form}>
                            <ThemedText style={styles.titleText}>Login</ThemedText>
                            <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Faça login para personalizar sua experiência com jogadores, ligas e times favoritos.</ThemedText>
            
                            <View style={{width: '80%'}}>
                                <FormInput placeHolder="Usuário ou Email" name="user" control={control} errors={errors}  />
                                <FormInput placeHolder="Senha" name="password" isPassword control={control} errors={errors}  />
                                <ThemedButton style={{width: '100%'}} IconComponent={{Icon: Ionicons, name: 'enter-outline'}} backgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={handleSubmit(handleForm)} />
                            </View>
                            
                            <ThemedText style={styles.registerText}>
                                Ainda não tem uma conta?
                                {'  '}
                                <ThemedText
                                    style={styles.registerText}
                                    onPress={() => router.replace('/(auth)/Cadastro')}
                                    darkColor={Colors.dark.Green}
                                    lightColor={Colors.light.Green}
                                >
                                    Cadastre-se
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