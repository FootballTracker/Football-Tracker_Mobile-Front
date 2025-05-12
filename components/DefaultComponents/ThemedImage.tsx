//Default Imports
import { useTheme } from '@/context/ThemeContext';
import { Image, ImageProps } from 'react-native';
//Type
type ThemedImageProps = {
    source: { light: ImageProps; dark: ImageProps },
} & ImageProps;

export function ThemedImage({ source, ...rest }: ThemedImageProps) {
    const { theme } = useTheme();

    return (
        <Image resizeMode='contain' source={source[theme]} {...rest} />
    )
}