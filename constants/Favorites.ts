export type item = {
    id: string;
    is_favorite: boolean;
    show: boolean;
}

export function SwapFavorites<T extends item>(setFavorites: React.Dispatch<React.SetStateAction<T[]>>, setNormal: React.Dispatch<React.SetStateAction<T[]>>, item: T) {
    const updatedItem = {
        ...item,
        is_favorite: !item.is_favorite,
    };

    if (item.is_favorite) {
        // Atualizar em favorites: ocultar o item
        setFavorites(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: false} : i))
        );

        // Atualizar em normal: ativar o item
        setNormal(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: true} : i))
        );
    } else {
        // Adicionar em favorites
        setFavorites(prev => [...prev, {...updatedItem, show: true}]);
        
        // Atualizar em normal: ocultar o item
        setNormal(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: false} : i))
        );
    }

    // // FAZER REQUISIÇÃO PRO BACK
}