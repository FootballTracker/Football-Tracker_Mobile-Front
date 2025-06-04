//Default Imports
import { StyleSheet, TextInput, Dimensions, View, TouchableOpacity, TextInputProps } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { StyleProps } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

//Type
type ThemedInputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    isPassword?: boolean;
    isSearch?: boolean;
    style?: StyleProps
} & TextInputProps;

export function ThemedInput({ placeholder, value, onChangeText, onBlur, isPassword = false, isSearch = false, style, ...rest }: ThemedInputProps) {
    const { theme } = useTheme();
    const windowWidth = Dimensions.get('window').width;
    const [showPassword, setShowPassword] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: Colors[theme].BorderColor,
            borderWidth: .5,
            borderRadius: 10,
            backgroundColor: Colors[theme].LighterBackground,
            width: windowWidth * 0.8,
            paddingHorizontal: 10,
        },
        input: {
            flex: 1,
            color: Colors[theme].Text,
            // fontFamily: 'Kdam',
            fontSize: 15,
            paddingVertical: 7,
            height: 45,
        },
    })

    return (
        <View style={[styles.container, style]}>
            {isSearch && (
                <MaterialIcons name='search' size={20} color={Colors[theme].DarkerText} style={{marginRight: 5}} />
            )}
            <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={Colors[theme].DarkerText} value={value} onChangeText={onChangeText} onBlur={onBlur} secureTextEntry={isPassword && !showPassword} {...rest} />
            {isPassword && value && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors[theme].DarkerText} style={{marginLeft: 10}} />
                </TouchableOpacity>
            )}
        </View>
    );
}