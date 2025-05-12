//Default Imports
import { useState } from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";

//Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Password from '@/assets/Icons/Password.svg'
import Username from '@/assets/Icons/Username.svg'

//Components
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ConfigsCard } from '@/components/configsPage/ConfigCard';


export default function UserConfigs() {
    const { selectedTheme, setTheme, themes, themesNames } = useTheme();
    const [ modalOpened, setModalOpened ] = useState(false);

    return (
        <ScrollView>
            <ThemedView style={styles.background}>
                <View style={styles.container}>
                    <ConfigsCard
                        onPress={() => {alert("fazer")}}
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
                </View>
            </ThemedView>
        </ScrollView>
    )
}

    const styles = StyleSheet.create({
        background: {
            paddingTop: 25,
            display: 'flex',
            alignItems: 'center',
            minHeight: '100%',
            flexGrow: 1
        },
        container: {
            flex: 1,
            gap: 20,
        },
        deleteAccountButton: {
            width: '80%',
            marginVertical: 25,
        },
    })