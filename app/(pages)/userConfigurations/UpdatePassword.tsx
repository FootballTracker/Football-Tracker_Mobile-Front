//Default Imports
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useUserContext } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";
import { z } from "zod";
import api from "@/lib/Axios";

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
    password: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
    newPassword: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
    confirmNewPassword: z.string({message: 'Obrigatório'}).min(8, 'Mínimo 8 caracteres').regex(new RegExp('(?=.*[a-z])'), 'Deve conter uma letra minúscula').regex(new RegExp('(?=.*[A-Z])'), 'Deve conter uma letra maiúscula').regex(new RegExp('(?=.*[0-9])'), 'Deve conter um número').regex(new RegExp('(?=.*[!@#$%^&*()~`´])'), 'Deve conter um caractere especial'),
}).refine(({newPassword, confirmNewPassword}) => {return newPassword === confirmNewPassword}, {message: 'As senhas não são iguais', path: ['confirmNewPassword']})

//Types
type userData = z.infer<typeof userData>

export default function UpdatePassword() {
    const { user, logout, login } = useUserContext();
    const { theme } = useTheme();

    const { control, handleSubmit, formState: {errors} } = useForm<userData>({
        resolver: zodResolver(userData)
    });

    const handleForm = async ({password, newPassword}:userData) => {
        if(user) {
            await api.put('auth/update_user', null, {
                params: {
                    user_id: user.id,
                    new_password: newPassword,
                    password: password
                }
            }).then((response: any) => {
                Alert.alert(
                    'Sucesso',
                    'Sua senha foi atualizada.',
                    [
                        // { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel', },
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );

                router.back();
            }).catch((e: any) => {
                if(e.response.data.detail) {
                    Toast.show({
                        props: {
                            type: "error",
                            text: e.response.data.detail
                        }
                    });
                }
                else {
                    Toast.show({
                        props: {
                            type: "error",
                            text: "Ocorreu algum erro. Tente novamente"
                        }
                    });
                }
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
                    <FormInput placeHolder="Senha" control={control} errors={errors} name="password" isPassword />
                    <FormInput placeHolder="Nova senha" control={control} errors={errors} name="newPassword" isPassword />
                    <FormInput placeHolder="Confirmar nova senha" control={control} errors={errors} name="confirmNewPassword" isPassword />
                    <ThemedText style={styles.infoText}><ThemedIcon IconComponent={Feather} name="info" size={15} /> Para alterar sua senha, digite sua senha atual e sua nova senha acima</ThemedText>
                </View>
                <ThemedButton IconComponent={{ Icon: Feather, name: "edit-3", size: 26 }} title="Confirmar" backgroundColor="Green" backgroundMidnightcolor="rgb(200, 200, 200)" textColor="LightBackground" handleClick={handleSubmit(handleForm)} style={styles.deleteAccountButton} />
            </ThemedView>
        </ScrollView>
    )
}