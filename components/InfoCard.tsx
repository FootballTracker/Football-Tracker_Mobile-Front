import { StyleSheet, View, Image, ActivityIndicator  } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

import { ThemedIcon, ThemedIconProps } from './DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';

export interface InfoCardProps {
    description: string
    value: string
    icon?: ThemedIconProps
    imageUrl?: string
}

export default function InfoCard({ description, value, icon, imageUrl }: InfoCardProps) {

    const { theme } = useTheme();

    const [svgXml, setSvgXml] = useState<string | null>(null);
    const svg = imageUrl?.endsWith('svg');

    useEffect(() => {
        if(imageUrl && imageUrl.endsWith('svg')) {
            Axios.get(imageUrl)
            .then((response) => {
                setSvgXml(response.data);
            })
            .catch((error) => {
                console.error('Erro ao carregar o SVG:', error);
            });
        }

    }, []);

    const styles = StyleSheet.create({
        card: {
            flexDirection: "row",
            alignItems: "center",
            width: "98%",
            marginTop: 10,
            marginHorizontal: "auto",
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 10,
        },
        text: {
            fontFamily: "Kdam",
            fontSize: 12,
        },
        value: {
            textAlign: "right",
            flex: 1,
        },
        image: {
            width: 22,
            height: 22,
            marginLeft: 10
        },
    });

    return (
        <View style={styles.card}>
            {icon ? (
                <ThemedIcon {...icon}/>
            ) : (
                <ThemedText darkColor={Colors.dark.Red} lightColor={Colors.light.Red}>• </ThemedText>
            )}
            <ThemedText style={styles.text}>{description}: </ThemedText>
            <ThemedText style={[styles.text, styles.value]} numberOfLines={1} ellipsizeMode='tail'>{value}</ThemedText>
            {imageUrl && (
                !svg ? (
                    <Image source={{uri: imageUrl}} resizeMode="contain" style={styles.image}/>
                ) : (
                    svgXml ? (
                        <SvgXml xml={svgXml} width={22} height={22} style={{marginLeft: 10}} />
                    ) : (
                        <ActivityIndicator size="small" />
                    )
                )
            )}
        </View>
    );
}

