//Default Imports
import { Control, Controller, FieldErrors } from "react-hook-form"
import { Colors } from "@/constants/Colors"
import { StyleSheet, View } from "react-native"

//Components
import { ThemedInput } from "./DefaultComponents/ThemedInput"
import { ThemedText } from "@/components/DefaultComponents/ThemedText"

//Types
type FormInputProps = {
    control: any;
    errors: any;
    name: string;
    placeHolder: string;
}

export function FormInput({ control, errors, name, placeHolder } : FormInputProps ) {
    return (
        <>
            <Controller control={control} name={name} render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput style={{width: '100%'}} placeholder={placeHolder} onChangeText={onChange} onBlur={onBlur} value={value} />
            )} />
            {/* {errors[name] && <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.errorText}>{errors[name] ? errors[name].message : null}</ThemedText>} */}
            {<ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.errorText}>{errors[name] ? errors[name].message : ''}</ThemedText>}
        </>
    )
}   

const styles = StyleSheet.create({
    errorText: {
        marginLeft: 5,
        fontSize: 13,
        fontFamily: 'Kdam'
    }
})