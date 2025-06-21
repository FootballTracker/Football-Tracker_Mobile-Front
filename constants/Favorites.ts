import api from "@/lib/Axios";

export type item = {
    id: string;
    is_favorite: boolean;
    show: boolean;
}

export async function SwapFavorites<T extends item>(setFavorites: React.Dispatch<React.SetStateAction<T[]>>, setNormal: React.Dispatch<React.SetStateAction<T[]>>, item: T, type: string, userId: string | undefined) {
    const updatedItem = {
        ...item,
        is_favorite: !item.is_favorite,
    };

    if (item.is_favorite) {
        // Atualizar em favorites: ocultar o item
        setFavorites(prev =>
            prev.filter(i => i.id !== updatedItem.id)
        );

        // Atualizar em normal: ativar o item
        setNormal(prev => {
            const exists = prev.some(i => i.id === item.id);
            if (exists) {
                return prev.map(i => (i.id === item.id ? { ...updatedItem, show: true } : i));
            } else {
                return [...prev, { ...updatedItem, show: true }];
            }
        });
    } else {
        // Adicionar em favorites
        setFavorites(prev => [...prev, {...updatedItem, show: true}]);
        
        // Atualizar em normal: ocultar o item
        setNormal(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: false} : i))
        );
    }

    

    if(userId) {
        if(type === "league")  {
            await api.post("league/favorite", {
                user_id: userId,
                api_league_id: (item as any).api_id
            });
        } else if(type == "player") {

        } else {

        }
    }
}