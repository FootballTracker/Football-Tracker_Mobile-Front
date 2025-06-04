//Default Importws
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { item } from '@/constants/Favorites'

//Type imports
import { player } from '@/components/home/Jogadores'
import { league } from '@/components/home/Ligas';
import { team } from '@/components/home/Times';

//Type
type ItemsContextType<T extends item> = {
    favoriteTeams: team[];
    teams: team[];
    favoriteLeagues: league[];
    leagues: league[];
    favoritePlayers: player[];
    players: player[];
    setFavoriteTeams: React.Dispatch<React.SetStateAction<T[]>>;
    setTeams: React.Dispatch<React.SetStateAction<T[]>>;
    setFavoriteLeagues: React.Dispatch<React.SetStateAction<T[]>>;
    setLeagues: React.Dispatch<React.SetStateAction<T[]>>;
    setFavoritePlayers: React.Dispatch<React.SetStateAction<T[]>>;
    setPlayers: React.Dispatch<React.SetStateAction<T[]>>;
}

// Criação do contexto
export const ItemsContext = createContext<ItemsContextType<any> | undefined>(undefined);

// Provider props
interface ItemsProviderProps {
    children: ReactNode;
}

// Provider
export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children }) => {
    const [favoriteTeams, setFavoriteTeams] = useState<team[]>([]);
    const [favoriteLeagues, setFavoriteLeagues] = useState<league[]>([]);
    const [favoritePlayers, setFavoritePlayers] = useState<player[]>(favoritePlayersMock);
    const [teams, setTeams] = useState<team[]>([]);
    const [leagues, setLeagues] = useState<league[]>([]);
    const [players, setPlayers] = useState<player[]>(playersMock);

    return (
        <ItemsContext.Provider value={{
            favoriteTeams: favoriteTeams,
            teams: teams,
            favoriteLeagues: favoriteLeagues,
            leagues: leagues,
            favoritePlayers: favoritePlayers,
            players: players,
            setFavoriteTeams: setFavoriteTeams,
            setTeams: setTeams,
            setFavoriteLeagues: setFavoriteLeagues,
            setLeagues: setLeagues,
            setFavoritePlayers: setFavoritePlayers,
            setPlayers: setPlayers,
        }}>
            {children}
        </ItemsContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useItemsContext = (): ItemsContextType<any> => {
    const context = useContext(ItemsContext);

    if (!context) {
        throw new Error('useItemsContext deve ser usado dentro de um ItemsProvider');
    }
    
    return context;
};

const favoritePlayersMock : player[] = [
    // {
    //     id: '276',
    //     name: 'Neymar',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/276.png',
    //     show: true,
    // },
    // {
    //     id: '629',
    //     name: 'K. De Bruyne',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/629.png',
    //     show: true,
    // },
    // {
    //     id: '874',
    //     name: 'Cristiano Ronaldo',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/874.png',
    //     show: true,
    // },
]

const playersMock : player[] = [
    {
        id: '276',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2761',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6291',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8741',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2762',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6292',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8742',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
]