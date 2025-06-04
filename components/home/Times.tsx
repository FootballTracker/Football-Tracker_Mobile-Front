//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { FavoriteTeams, MainTeams } from '../Items';
import LoadingIcon from '../LoadingIcon';
import SearchBar from './SearchBar';
import Section from '../Section';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
export type team = {
    id: string
    name: string
    logo: string
    is_favorite: boolean
    show: boolean
}

export default function Times() {
    const { loading, getTeams } = useItemsContext();

    async function searchTeams() {
        
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={getTeams}>
                <SearchBar handleSearch={searchTeams}/>

                <Section text='Favorito' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                    <FavoriteTeams />
                </Section>

                <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                    <MainTeams />
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
    starIcon: {
        marginTop: 2,
        marginRight: 5
    },
    crownIcon: {
        marginTop: 5,
        marginRight: 8
    },
    favoritesInfoText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 14,
    },
});