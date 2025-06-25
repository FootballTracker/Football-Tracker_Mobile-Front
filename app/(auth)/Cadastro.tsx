//Default Importss
import { StyleSheet, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { router } from "expo-router";
import api from "@/lib/Axios"
import { z } from 'zod';
import { useUserContext } from "@/context/UserContext";
import { Toast } from "toastify-react-native";

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { FormInput } from "@/components/FormInput";

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
    )
}

const styles = StyleSheet.create({
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