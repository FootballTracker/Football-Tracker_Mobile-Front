//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { FavoriteTeams, MainTeams } from '../Items';
import LoadingIcon from '../LoadingIcon';
import InfoMessage from '../InfoMessage';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

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
    const { user } = useUserContext();
    const [clearInput, setClearInput] = useState(false);
    const [searchedTeams, setSearchedTeams] = useState<team[]>([]);
    const [showSearched, setShowSearched] = useState(false);
    const [searching, setSearching] = useState(false);

    async function searchTeams(text: string) {
        if(text) {
            setSearching(true);
            await api.get("teams", {
                params: {
                    user_id: user?.id,
                    text: text
                }
            }).then((response) => {
                setSearchedTeams(response.data.teams);
                setShowSearched(true);
            }).catch((error) => {
                const errorMessage = error.response.data.detail || "Erro ao buscar times"
                Toast.show({
                    props: {
                        type: "error",
                        text: errorMessage
                    }
                })
            }).finally(() =>{
                setSearching(false);
            })
        } else {
            setSearchedTeams([]);
            setShowSearched(false);
        }
    }

    async function refresh() {
        await getTeams();
        setClearInput(prev => !prev);
        setSearchedTeams([]);
        setShowSearched(false);
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={refresh}>
                <SearchBar handleSearch={searchTeams} clearInputState={clearInput}/>

                {searching ? (
                    <View style={{marginTop: 30}}>
                        <LoadingIcon />
                    </View>
                ) : (
                    showSearched ? (
                        searchedTeams.length ? (
                            <Section text={`${searchedTeams.length} time(s) encontrados`} >
                                {searchedTeams.map((team, index) => (
                                    <Card
                                        favorite={team.is_favorite}
                                        handleOpen={() => router.push(`/(pages)/team/${team.id}` as any)}
                                        info={team.name}
                                        image={team.logo}
                                        show={team.show}
                                        key={index}
                                    />
                                ))}
                            </Section>
                        ) : (
                            <InfoMessage text="Nenhuma time encontrado" style={{marginHorizontal: "auto", marginTop: 30}}/>
                        )
                    ) : (
                        <>
                            <Section text='Favorito' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                                <FavoriteTeams />
                            </Section>

                            <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                                <MainTeams />
                            </Section>
                        </>
                    )
                )}
                
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