import { StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Toast } from 'toastify-react-native';

import { ThemedInput } from "../DefaultComponents/ThemedInput";

const windowWidth = Dimensions.get('window').width;

interface SearchBarProps {
    handleSearch: () => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
    const { theme } = useTheme();
    const [text, setText] = useState("");

    function handleFinishEdit() {
        if(text.length < 3) {
            Toast.show({
                props: {
                    type: "info",
                    text: "Digite pelo menos 3 caracteres",
                },
                visibilityTime: 5000,
            });
            return;
        }
        handleSearch();
    }

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