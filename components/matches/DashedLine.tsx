//Default Imports
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ViewProps } from "react-native";

//Components
import Line from "react-native-dashed-line";
import { View } from "react-native";

export function DashedLine({...rest} : ViewProps) {
    const { theme } = useTheme();
    
    return (
        <View style={[{width: '100%', height: 15, justifyContent: 'flex-end', overflow: 'hidden'}, rest.style]}>
            <Line dashLength={6.46} dashGap={5.01} dashThickness={1} dashStyle={{borderRadius: 5}} dashColor={Colors[theme].Red} />
        </View>
    )
}