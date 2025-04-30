//Default Imports
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { router } from 'expo-router';
import { Colors } from "@/constants/Colors";

//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText"
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedInput } from "@/components/DefaultComponents/ThemedInput";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ReturnArrow } from "@/components/ReturnArrow";

//Consts
const windowHeight = Dimensions.get('window').height;
const user = z.object({
    user: z.string().min(1, 'Obrigatório'),
    email: z.string().min(1, 'Obrigatório'),
    password: z.string().min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
    confirmPassword: z.string().min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
})

//Types
type user = z.infer<typeof user>

export default function Cadastro() {
    const { control, handleSubmit, formState: {errors} } = useForm<user>({
        resolver: zodResolver(user)
    });

    const handleForm = ({user, password}:user) => {
        alert('user');
        alert('password');
    }

    return (
        <ScrollView>
            <ThemedView style={styles.mainBlock}>
                <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                    <ReturnArrow />
                </View>

                <LoginLogo />

                <View style={styles.form}>
                    <ThemedText style={styles.titleText}>Cadastrar</ThemedText>

                    <Controller control={control} name="user" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Nome de usuário" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.user && <ThemedText>{errors.user.message}</ThemedText>}

                    <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Email" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.user && <ThemedText>{errors.user.message}</ThemedText>}

                    <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Senha" isPassword={true} value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.password && <ThemedText>{errors.password.message}</ThemedText>}

                    <Controller control={control} name="confirmPassword" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Confirmar Senha" isPassword={true} value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.password && <ThemedText>{errors.password.message}</ThemedText>}

                    <ThemedButton IconComponent={{Icon: Feather, name: 'plus', size: 25}} backgroundColor="Green" textColor="LightBackground" title="Cadastrar" handleClick={() => {handleSubmit(handleForm)}} />
                    {/* <ThemedButton bakckgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={() => {handleSubmit(handleForm)}} /> */}

                    {/* <ThemedText style={styles.loginText}>
                        Já tem uma conta?
                        {'  '}
                        <ThemedText
                            style={styles.loginText}
                            onPress={() => router.push('/Login')}
                            darkColor={Colors.dark.Green}
                            lightColor={Colors.light.Green}>
                            Faça login
                        </ThemedText>
                    </ThemedText> */}
                </View>
            </ThemedView>
        </ScrollView>
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