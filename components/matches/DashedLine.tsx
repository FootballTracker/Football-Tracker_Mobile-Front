//Default Imports
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ViewProps } from "react-native";
import { Dimensions } from "react-native";
import Svg, { G, Rect } from "react-native-svg";

export function DashedLine({...rest} : ViewProps) {
    const { theme } = useTheme();
    const { width } = Dimensions.get("screen");
    const spacing = 11.48;

    const dashes = new Array(Math.floor(width / spacing)).fill(null);
    
    return (
        <>
            <Svg style={[{width: '100%', height: 1, overflow: 'hidden'}, rest.style]}>
                <G>
                    {dashes.map((_, index) => (
                        <Rect
                            key={index}
                            x={0}
                            y={0}
                            width={6.46}
                            height={1}
                            rx={0.5}
                            ry={0.5}
                            fill={Colors[theme].Red}
                            translateX={spacing * index}
                            
                        />
                    ))}
                </G>
            </Svg>
        </>
    )
}