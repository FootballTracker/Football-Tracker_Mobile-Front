//Default Imports
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    password: z.string().min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
})

//Types
type user = z.infer<typeof user>

export default function Login() {
    const { control, handleSubmit, formState: {errors} } = useForm<user>({
        resolver: zodResolver(user)
    });

    const handleForm = ({user, password}:user) => {
        alert('user');
        alert('password');
    }

    return (
        <KeyboardAwareScrollView extraScrollHeight={20} keyboardShouldPersistTaps="handled">
            <ThemedView style={styles.mainBlock}>
                <View style={{display: 'flex', flexDirection: "row", marginLeft: 5, position: 'absolute', top: 20}}>
                    <ReturnArrow />
                </View>
                
                <LoginLogo />

                <View style={styles.form}>
                    <ThemedText style={styles.titleText}>Login</ThemedText>
                    <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Faça login para personalizar sua experiência com jogadores, ligas e times favoritos.</ThemedText>

                    <Controller control={control} name="user" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Usuário ou Email" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.user && <ThemedText>{errors.user.message}</ThemedText>}

                    <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput placeholder="Senha" isPassword={true} value={value} onChangeText={onChange} onBlur={onBlur} />
                    )} />
                    {errors.password && <ThemedText>{errors.password.message}</ThemedText>}

                    <ThemedButton IconComponent={{Icon: Ionicons, name: 'enter-outline'}} backgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={() => {handleSubmit(handleForm)}} />
                    {/* <ThemedButton bakckgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={() => {handleSubmit(handleForm)}} /> */}

                    <ThemedText style={styles.registerText}>
                        Ainda não tem uma conta?
                        {'  '}
                        <ThemedText
                            style={styles.registerText}
                            onPress={() => router.push('/Cadastro')}
                            darkColor={Colors.dark.Green}
                            lightColor={Colors.light.Green}
                        >
                            Cadastre-se
                        </ThemedText>
                    </ThemedText>
                </View>
            </ThemedView>
        </KeyboardAwareScrollView>
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
    registerText: {
        fontFamily: 'Kokoro',
        fontSize: 13,
        lineHeight: 13,
    }
});