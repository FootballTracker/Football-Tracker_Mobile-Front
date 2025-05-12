//Default Imports
import { useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";

//Icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Password from '@/assets/Icons/Password.svg'
import Username from '@/assets/Icons/Username.svg'

//Components
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ConfigsCard } from '@/components/configsPage/ConfigCard';
import { Select } from '@/components/Select';
import { useTheme } from '@/context/ThemeContext';


export default function Configurations() {
    const { selectedTheme, setTheme, themes, themesNames } = useTheme();
    const [ modalOpened, setModalOpened ] = useState(false);

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
                        onPress={() => {setModalOpened(true)}}
                        icon={{IconComponent: MaterialCommunityIcons, name: 'theme-light-dark'}}
                        text={'Tema: ' + themesNames[selectedTheme]}
                        // text={'Tema: '}
                    />
                    <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={setTheme} title='Selecione o tema desejado:' values={themes} />
                </View>
                <ThemedButton IconComponent={{ Icon: Ionicons, name: "trash-outline", size: 26 }} title="Excluir conta" backgroundColor="Red" textColor="ButtonText" handleClick={() => {alert("fazer isso daqui")}} style={styles.deleteAccountButton} />
            </ThemedView>
        </ScrollView>
    )
}