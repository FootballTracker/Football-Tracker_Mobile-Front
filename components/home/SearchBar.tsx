import { StyleSheet, Dimensions } from "react-native";
import { ThemedInput } from "../DefaultComponents/ThemedInput";

const windowWidth = Dimensions.get('window').width;

interface SearchBarProps {
    handleSearch: () => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
    return (
        <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: windowWidth*0.9,
        marginHorizontal: 'auto',
        height: 40,
    },
})