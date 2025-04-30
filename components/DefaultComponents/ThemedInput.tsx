//Default Imports
import { StyleSheet, TextInput, Dimensions, View, TouchableOpacity, TextInputProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

//Type
type ThemedInputProps = {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur: () => void;
    isPassword?: boolean;
};

export function ThemedInput({ placeholder, value, onChangeText, onBlur, isPassword = false }: ThemedInputProps) {
    const theme = useColorScheme() ?? 'light';
    const windowWidth = Dimensions.get('window').width;
    const [showPassword, setShowPassword] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: .5,
            borderRadius: 10,
            backgroundColor: Colors[theme].LighterBackground,
            width: windowWidth * 0.8,
            paddingHorizontal: 10,
        },
        input: {
            flex: 1,
            color: Colors[theme].Text,
            fontFamily: 'Kdam',
            fontSize: 15,
            paddingVertical: 7,
        },
    })

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={Colors[theme].DarkerText} value={value} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={isPassword && !showPassword} />
            {isPassword && value && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors[theme].DarkerText} style={{marginLeft: 10}} />
                </TouchableOpacity>
            )}
        </View>
    );
}