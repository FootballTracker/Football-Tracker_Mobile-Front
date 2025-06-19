//Default Imports
import { Control, Controller, FieldErrors } from "react-hook-form"
import { Colors } from "@/constants/Colors"
import { StyleSheet, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

//Components
import { ThemedInput } from "./DefaultComponents/ThemedInput"
import { ThemedText } from "./DefaultComponents/ThemedText"
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";

//Types
type FormInputProps = {
    control: any;
    errors: any;
    name: string;
    placeHolder: string;
    isPassword?: boolean;
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url"
}

export function FormInput({ control, errors, name, placeHolder, isPassword = false, keyboardType = "default" } : FormInputProps ) {
    return (
        <>
            <Controller control={control} name={name} render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput style={{width: '100%'}} placeholder={placeHolder} onChangeText={onChange} onBlur={onBlur} value={value} isPassword={isPassword} keyboardType={keyboardType}/>
            )} />

            {errors[name] ? (
                <View style={styles.view}>
                    <ThemedIcon IconComponent={Ionicons} name="alert-circle-outline" lightColor={Colors.light.Red} darkColor={Colors.dark.Red} size={16} style={styles.icon} />
                    <ThemedText lightColor={Colors.light.Red} darkColor={Colors.dark.Red} style={styles.errorText} >{errors[name].message}</ThemedText>
                </View>
            ) : (
                // <ThemedText style={styles.errorText}> </ThemedText>
                <ThemedText style={{height: 10}}> </ThemedText>
            )}
        </>
    )
}   

const styles = StyleSheet.create({
    errorText: {
        fontSize: 13,
        fontFamily: 'Kdam'
    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    icon: {
        marginLeft: 4,
        marginRight: 1,
        marginBottom: 1,
    }
})