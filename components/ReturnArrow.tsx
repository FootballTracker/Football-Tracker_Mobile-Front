//Default Imports
import { TouchableOpacity, StyleSheet } from "react-native"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { FontAwesome6 } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { usePage } from "@/context/PageContext"

type ReturnArrowProps = {
    double?: boolean;
    returnPage?: boolean;
}

export function ReturnArrow({ double, returnPage = false } : ReturnArrowProps) {
    const { setPage, previousPage, setPreviousPage } = usePage();

    const returnRoute = () => {
        router.back();
        double && router.back();

        if(returnPage && previousPage) {
            setPage(previousPage);
            setPreviousPage(null);
        }

        // if(changePage) setPage(changePage.pageName);
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
        paddingHorizontal: 10.2,
        marginRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
    },
})