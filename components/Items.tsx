//Default Imports
import { useUserContext } from "@/context/UserContext";
import { useItemsContext } from "@/context/ItemsContext";
import { item, SwapFavorites } from "@/constants/Favorites";
import { Toast } from "toastify-react-native";
import { router } from "expo-router";
import { player } from "./home/Jogadores";
import { league } from "./home/Ligas";
import { team } from "./home/Times";

//Components
import Card from "./Card";
import InfoMessage from "./InfoMessage";

//Functions
const accessPage = (page: string, id: string) => {
    router.push(`/(pages)/${page}/${id}` as any);;
}

const changeFavorite = <T extends item>(setFavorite: React.Dispatch<React.SetStateAction<T[]>>, setMain: React.Dispatch<React.SetStateAction<T[]>>, item: T, type: string, userId: string | undefined) => {
    SwapFavorites(setFavorite, setMain, item, type, userId);
}

const verifyFavoritesLenght =  async function (favoritesArray: item[], message: string, length: number = 3) {
    if(favoritesArray.length === length) {
        Toast.show({
            props: {
                type: "warn",
                text: message
            },
            visibilityTime: 6000
        });
        return false;
    }
}



export function FavoriteTeams() {
    const { favoriteTeams, setFavoriteTeams, setTeams } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoriteTeams && favoriteTeams.length && favoriteTeams.filter(l => l.show).length ? (
                favoriteTeams.map((team, index) => (
                    <Card
                        favorite={team.is_favorite}
                        handleOpen={() => {accessPage('team', team.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteTeams, setTeams, team, "team", user?.id)}}
                        info={team.name}
                        image={team.logo}
                        show={team.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhum time favoritado.'/>
            )}
        </>
    )
}

export function MainTeams() {
    const { teams, favoriteTeams, setFavoriteTeams, setTeams } = useItemsContext();
    const { user } = useUserContext();

    async function verifyFavorites(team: team) {
        const change = await verifyFavoritesLenght(favoriteTeams, "Você já tem um time favorito. Remova o atual para favoritar outro time", 1);
        if(change !== false) {
            changeFavorite(setFavoriteTeams, setTeams, team, "team", user?.id);
            return;
        }
        return change;
    }

    return (
        <>
            {teams && teams.length ? (
                teams.filter(l => l.show).length ? 
                teams.map((team, index) => (
                    <Card
                        favorite={team.is_favorite}
                        handleOpen={() => {accessPage('team', team.id)}}
                        handleFavorite={async () => {return await verifyFavorites(team)}}
                        info={team.name}
                        image={team.logo}
                        show={team.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todos os times foram favoritados.'/>
            ) : (
                <InfoMessage text='Nenhum time encontrado.'/>
            )}
        </>
    )
}

export function FavoriteLeagues() {
    const { favoriteLeagues, setFavoriteLeagues, setLeagues } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoriteLeagues && favoriteLeagues.length && favoriteLeagues.filter(l => l.show).length ? (
                favoriteLeagues.map((league, index) => (
                    <Card
                        favorite={league.is_favorite}
                        handleOpen={() => {accessPage('league', league.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteLeagues, setLeagues, league, "league", user?.id);}}
                        info={league.name}
                        image={league.logo_url}
                        show={league.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhuma liga favoritada.'/>
            )}
        </>
    )
}

export function MainLeagues() {
    const { leagues, favoriteLeagues, setFavoriteLeagues, setLeagues } = useItemsContext();
    const { user } = useUserContext();

    async function verifyFavorites(league: league) {
        const change = await verifyFavoritesLenght(favoriteLeagues, "3 ligas já estão favoritadas. Desfavorite uma liga caso deseje favoritar alguma outra");
        if(change !== false) {
            changeFavorite(setFavoriteLeagues, setLeagues, league, "league", user?.id);
            return;
        }
        return change;
    }

    return (
        <>
            {leagues && leagues.length ? (
                leagues.filter(l => l.show).length ? 
                leagues.map((league, index) => (
                    <Card
                        favorite={league.is_favorite}
                        handleOpen={() => {accessPage('league', league.id)}}
                        handleFavorite={async () => {return await verifyFavorites(league)}}
                        info={league.name}
                        image={league.logo_url}
                        show={league.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todas as ligas foram favoritadas.'/>
            ) : (
                <InfoMessage text='Nenhuma liga encontrada.'/>
            )}
        </>
    )
}

export function FavoritePlayers() {
    const { favoritePlayers, setFavoritePlayers, setPlayers } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoritePlayers && favoritePlayers.length && favoritePlayers.filter(l => l.show).length ? (
                favoritePlayers.map((player, index) => (
                    <Card
                        favorite={player.is_favorite}
                        handleOpen={() => {accessPage('player', player.id)}}
                        handleFavorite={() => {changeFavorite(setFavoritePlayers, setPlayers, player, "player", user?.id)}}
                        info={player.name}
                        image={player.photo}
                        show={player.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhum jogador favoritado.'/>
            )}
        </>
    )
}

export function MainPlayers() {
    const { players, favoritePlayers, setFavoritePlayers, setPlayers } = useItemsContext();
    const { user } = useUserContext();

    async function verifyFavorites(player: player) {
        const change = await verifyFavoritesLenght(favoritePlayers, "3 jogadores já estão favoritados. Desfavorite um jogador caso deseje favoritar algum outro");
        if(change !== false) {
            changeFavorite(setFavoritePlayers, setPlayers, player, "player", user?.id);
            return;
        }
        return change;
    }

    return (
        <>
            {players && players.length ? (
                players.filter(l => l.show).length ? 
                players.map((player, index) => (
                    <Card
                        favorite={player.is_favorite}
                        handleOpen={() => {accessPage('player', player.id)}}
                        handleFavorite={async () => {return await verifyFavorites(player)}}
                        info={player.name}
                        image={player.photo}
                        show={player.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todos os jogadores foram favoritados.'/>
            ) : (
                <InfoMessage text='Nenhum jogador encontrado.'/>
            )}
        </>
    )
}