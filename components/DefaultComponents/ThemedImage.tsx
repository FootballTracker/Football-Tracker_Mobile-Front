//Default Imports
import { Image, ImageProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
//Type
type ThemedImageProps = {
    source: { light: ImageProps; dark: ImageProps },
} & ImageProps;

export function ThemedImage({ source, ...rest }: ThemedImageProps) {
    const { theme } = useColorScheme();

    return (
        <Image resizeMode='contain' source={source[theme]} {...rest} />
    )
}