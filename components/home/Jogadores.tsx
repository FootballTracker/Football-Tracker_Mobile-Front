//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { SwapFavorites } from '@/constants/Favorites';
import { useEffect, useState } from 'react';
import { StyleSheet  } from 'react-native';
import { router } from 'expo-router';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { FavoritePlayers, MainPlayers } from '../Items';
import InfoMessage from '../InfoMessage';
import LoadingIcon from '../LoadingIcon';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
export type player = {
    id: string,
    name: string,
    is_favorite: boolean,
    photo: string,
    show: boolean,
}

export default function Jogadores() {
    const { loading, getPlayers } = useItemsContext();
    const [clearInput, setClearInput] = useState(false);

    async function searchPlayers(text: string) {
        console.log(text);
    }

    async function refresh() {
        setClearInput(prev => !prev);
        // await getPlayers();
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={refresh}>
                <SearchBar handleSearch={searchPlayers} clearInputState={clearInput}/>

                <Section text='Favoritos' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                    <FavoritePlayers />
                </Section>

                <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                    <MainPlayers />
                </Section>
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
    },
});