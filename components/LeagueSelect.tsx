import { TouchableOpacity, StyleSheet, View, ViewProps } from "react-native"
import { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

import { ThemedText } from "./DefaultComponents/ThemedText"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon"
import { Select } from "./Select"

interface LeagueSelectProps extends ViewProps {
    values: {
        name: string
        value: string
    }[]
    selected: any
    setSelected: any
    selectFontSize?: number
    iconSize?: number
}

export function LeagueSelect({ values, selected, setSelected, selectFontSize, iconSize, ...otherProps } : LeagueSelectProps) {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={setSelected} title="Selecione uma temporada da liga:" values={values} />

            <TouchableOpacity onPress={() => setModalOpened(!modalOpened)} {...otherProps}>
                <View style={styles.select}>
                    <ThemedText lightColor={Colors.light.DarkerText} darkColor={Colors.dark.DarkerText} style={{fontSize: selectFontSize && selectFontSize, fontFamily: "Kdam"}}>
                        {selected}
                    </ThemedText>
                    <ThemedIcon
                        IconComponent={MaterialIcons}
                        name='keyboard-arrow-down'
                        darkColor={Colors.dark.DarkerText}
                        lightColor={Colors.light.DarkerText}
                        size={iconSize ? iconSize : 22}
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    select: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        marginTop: 15,
        borderRadius: 14,
        height: 45,
        width: 100,
    },
});