//Default Imports
import { TouchableOpacity, StyleSheet } from "react-native"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { FontAwesome6 } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"

type ReturnArrowProps = {
    double?: boolean;
    changePage?: {pageName: string | null, setPageName?: (page: string | null) => void, setPage: (page: string) => void};
}

export function ReturnArrow({ double, changePage } : ReturnArrowProps) {
    const returnRoute = () => {
        router.back();
        double && router.back();

        if(changePage && changePage.pageName) {
            changePage.setPage(changePage.pageName);
            changePage.setPageName && changePage.setPageName(null);
        }
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