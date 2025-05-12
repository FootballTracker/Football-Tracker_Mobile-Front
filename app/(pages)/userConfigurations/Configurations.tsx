//Default Imports
import { useState } from 'react';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";

//Icons
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Username from '@/assets/Icons/Username.svg'

//Components
import { ThemedView } from "@/components/DefaultComponents/ThemedView";
import { ThemedButton } from "@/components/DefaultComponents/ThemedButton";
import { ConfigsCard } from '@/components/configsPage/ConfigCard';
import { Select } from '@/components/Select';


export default function Configurations() {
    const { selectedTheme, setTheme, themes, themesNames } = useTheme();
    const [ modalOpened, setModalOpened ] = useState(false);

    return (
        <ScrollView>
            <ThemedView style={styles.background}>
                <View style={styles.container}>
                    <ConfigsCard
                        onPress={() => {router.navigate('/(pages)/userConfigurations/UserConfigs')}}
                        icon={{IconComponent: FontAwesome5, name: 'user-cog', size: 20}}
                        text='Meus Dados'
                    />

                    <ConfigsCard
                        onPress={() => {setModalOpened(true)}}
                        icon={{IconComponent: MaterialCommunityIcons, name: 'theme-light-dark'}}
                        text={'Tema: ' + themesNames[selectedTheme]}
                    />
                    <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={setTheme} title='Selecione o tema desejado:' values={themes} />

                    <ConfigsCard
                        onPress={() => {router.navigate('/(pages)/userConfigurations/DeleteUser')}}
                        icon={{IconComponent: Ionicons, name: 'trash-outline'}}
                        text={'Excluir Conta'}
                    />

                </View>
                {/* <ThemedButton IconComponent={{ Icon: Ionicons, name: "trash-outline", size: 26 }} title="Excluir conta" backgroundColor="Red" textColor="ButtonText" handleClick={() => {router.navigate('/(pages)/userConfigurations/DeleteUser')}} style={styles.deleteAccountButton} /> */}
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
            // justifyContent: 'center',
            flex: 1,
            gap: 20,
        },
        deleteAccountButton: {
            width: '80%',
            marginVertical: 25,
        },
    })