//Default Imports
import { TouchableOpacity, StyleSheet } from "react-native"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { FontAwesome6 } from "@expo/vector-icons"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { router } from "expo-router"

type ReturnArrowProps = {
    path?: any;
}

export function ReturnArrow({path} : ReturnArrowProps) {
    const returnRoute = () => {
        path ? router.replace(path) : router.back();
    }

    return (
        <TouchableOpacity onPress={returnRoute}>
            <ThemedIcon
                IconComponent={FontAwesome6}
                name="arrow-left" size={22}
                darkColor={Colors.dark.Text}
                lightColor={Colors.light.Text}
                style={styles.backIcon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        marginLeft: 9,
        paddingLeft: 12,
        marginRight: 8,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },
})