//Default Imports
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { useUserContext } from "@/context/UserContext";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from '@/constants/Colors';
import { View } from "react-native";

//Icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Password from '@/assets/Icons/Password.svg'
import Username from '@/assets/Icons/Username.svg'

//Components
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ConfigsCard } from '@/components/configsPage/ConfigCard';


export default function Configurations() {
    const { user, logout } = useUserContext();

    const styles = StyleSheet.create({
        background: {
            paddingTop: 25,
            display: 'flex',
            alignItems: 'center',
            minHeight: '100%',
            flexGrow: 1
        },
        container: {
            // justifyContent: 'center',
            flex: 1,
            gap: 20,
        },
        deleteAccountButton: {
            width: '80%',
            marginVertical: 25,
        },
    })

    return (
        <ScrollView>
            <ThemedView style={styles.background}>
                <View style={styles.container}>
                    <ConfigsCard
                        icon={{IconComponent: Username, height: 22, width: 22}}
                        text='Nome de Usuário'
                    />

                    <ConfigsCard
                        icon={{IconComponent: MaterialCommunityIcons, name: 'email-outline'}}
                        text='Email'
                    />

                    <ConfigsCard
                        icon={{IconComponent: Password}}
                        text='Senha'
                    />

                    <ConfigsCard
                        icon={{IconComponent: MaterialCommunityIcons, name: 'theme-light-dark'}}
                        text='Tema: Sistema'
                    />
                </View>
                <ThemedButton IconComponent={{ Icon: Ionicons, name: "trash-outline", size: 26 }} title="Excluir conta" backgroundColor="Red" textColor="Text" handleClick={() => {alert("fazer isso daqui")}} style={styles.deleteAccountButton} />
            </ThemedView>
        </ScrollView>
    )
}