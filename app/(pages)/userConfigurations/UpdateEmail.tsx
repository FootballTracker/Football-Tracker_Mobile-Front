//Default Imports
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useUserContext } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import api from "@/lib/Axios";
import { z } from "zod";

//Icons
import { Feather } from "@expo/vector-icons";

//Components
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { FormInput } from "@/components/FormInput";

//Consts
const userData = z.object({
    email: z.string({message: 'Obrigatório'}).email('Insira um email válido'),
    password: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
})

//Types
type userData = z.infer<typeof userData>

export default function UpdateEmail() {
    const { user, logout, login } = useUserContext();
    const { theme } = useTheme();

    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

    const handleForm = async ({email, password}:userData) => {
        if(user) {
            await api.put('auth/update_user', null, {
                params: {
                    user_id: user.id,
                    email: email,
                    password: password
                }
            }).then((response: any) => {
                Alert.alert(
                    'Sucesso',
                    'Seu email foi atualizado.',
                    [
                        // { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel', },
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );

                logout();
                login({
                    id: user.id,
                    username: user.username,
                    email: email,
                    image: user.image,
                });
                router.back();
            }).catch((e: any) => {
                if(e.response.data.detail) alert(e.response.data.detail);
                else alert('Ocorreu algum erro. Tente novamente');
            })
        }
    }

    const styles = StyleSheet.create({
        background: {
            paddingTop: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            flexGrow: 1
        },
        container: {
            flex: 1,
            width: '80%',
        },
        deleteAccountButton: {
            width: '80%',
            marginVertical: 25,
        },
        titleBox: {
            marginBottom: 25,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        titleText: {
            fontFamily: 'Kdam',
            color: Colors[theme].Red,
            fontSize: 23,
        },
        infoText: {
            fontFamily: 'Kdam',
            fontSize: 13,
            justifyContent: 'center',
            textAlign: 'justify',
            lineHeight: 20,
            marginTop: 9,
        },
    })

    return (
        <ScrollView>
            <ThemedView style={styles.background}>
                <View style={styles.container}>
                    <FormInput placeHolder="Novo email" control={control} errors={errors} name="email" />
                    <FormInput placeHolder="Senha" control={control} errors={errors} name="password" isPassword />
                    <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Para alterar seu email, digite sua senha acima</ThemedText>
                </View>
                <ThemedButton IconComponent={{ Icon: Feather, name: "edit-3", size: 26 }} title="Confirmar" backgroundColor="Green" textColor="LightBackground" handleClick={handleSubmit(handleForm)} style={styles.deleteAccountButton} />
            </ThemedView>
        </ScrollView>
    )
}