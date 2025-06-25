//Default Imports
import { TouchableOpacity, StyleSheet } from "react-native"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { FontAwesome6 } from "@expo/vector-icons"
import { router } from "expo-router"
import { TouchableOpacityProps } from "react-native-gesture-handler"

type ReturnArrowProps = {
    double?: boolean;
    returnPage?: boolean;
} & TouchableOpacityProps

export function ReturnArrow({ double, ...rest } : ReturnArrowProps) {

    const returnRoute = () => {
        router.back();
        double && router.back();
    }

    return (
        <TouchableOpacity onPress={returnRoute} style={rest.style}>
            <ThemedIcon
                IconComponent={FontAwesome6}
                name="arrow-left" size={22}
                colorName='Text'
                style={styles.backIcon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        marginLeft: 9,
        paddingHorizontal: 10.2,
        marginRight: 8,
        paddingVertical: 5,
    },
})