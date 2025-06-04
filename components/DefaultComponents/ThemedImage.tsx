//Default Imports
import { useTheme } from '@/context/ThemeContext';
import { Image, ImageProps } from 'react-native';
//Type
type ThemedImageProps = {
    source: { light: ImageProps; dark: ImageProps, midnight?: ImageProps },
} & ImageProps;

export function ThemedImage({ source, ...rest }: ThemedImageProps) {
    const { theme } = useTheme();
    let image;

    if(theme == 'midnight' && !source.midnight) image = source.dark;
    else image = source[theme]

    return (
        <Image resizeMode='contain' source={image} {...rest} />
    )
}