import { StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Toast } from 'toastify-react-native';

import { ThemedInput } from "../DefaultComponents/ThemedInput";

const windowWidth = Dimensions.get('window').width;

interface SearchBarProps {
    handleSearch: (text: string) => void;
    clearInputState: boolean;
    minLength?: number;
}

export default function SearchBar({ handleSearch, clearInputState, minLength = 1 }: SearchBarProps) {
    const { theme } = useTheme();
    const [text, setText] = useState("");

    function handleFinishEdit() {
        const value = text.trim();
        if(value && value.length < minLength) {
            Toast.show({
                props: {
                    type: "info",
                    text: "Digite pelo menos 3 caracteres",
                },
                visibilityTime: 5000,
            });
            return;
        }
        handleSearch(value);
    }

    useEffect(() => {
        setText("");
    }, [clearInputState])

    return (
        <ThemedInput
            isSearch={true}
            numberOfLines={1}
            style={styles.searchBar}
            onChangeText={newText => setText(newText)}
            maxLength={40}
            selectionColor={Colors[theme].Red}
            selectTextOnFocus
            onSubmitEditing={handleFinishEdit}
            value={text}
        />
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: windowWidth*0.9,
        marginHorizontal: 'auto',
        height: 40,
    },
})