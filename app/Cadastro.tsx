//Default Imports
import { StyleSheet, View, Dimensions } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

//Components
import LoginLogo from "@/components/LoginLogo"
import { ThemedText } from "@/components/DefaultComponents/ThemedText"
import { ThemedView } from "@/components/DefaultComponents/ThemedView"
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { ThemedInput } from "@/components/DefaultComponents/ThemedInput";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";

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
        <ThemedView style={styles.mainBlock}>
            <LoginLogo />

            <View style={styles.form}>
                <ThemedText style={{fontSize: 20}}>Cadastro</ThemedText>
                <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Faça login para personalizar sua experiência com jogadores, ligas e times favoritos.</ThemedText>

                <Controller control={control} name="user" render={({ field: { onChange, onBlur, value } }) => (
                    <ThemedInput placeholder="Usuário ou Email" value={value} onChangeText={onChange} onBlur={onBlur} />
                )} />
                {errors.user && <ThemedText>{errors.user.message}</ThemedText>}

                <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
                    <ThemedInput placeholder="Senha" isPassword={true} value={value} onChangeText={onChange} onBlur={onBlur} />
                )} />
                {errors.password && <ThemedText>{errors.password.message}</ThemedText>}

                {/* <ThemedButton IconComponent={{Icon: Ionicons, name: 'enter-outline'}} backgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={() => {handleSubmit(handleForm)}} /> */}
                <ThemedButton backgroundColor="Green" textColor="LightBackground" title="Entrar" handleClick={() => {handleSubmit(handleForm)}} />

                
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: windowHeight,
    },
    infoText: {
        fontSize: 12,
        marginHorizontal: 20,
        justifyContent: 'center',
        lineHeight: 20,
    },
    form: {
        alignItems: 'center',
        display: 'flex',
        gap: 20,
    }
});