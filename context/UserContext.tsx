import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { deleteItem, getItem, saveItem } from './StorageFunctions';

// Tipo do usuário (pode ser expandido)
interface User {
    user_id: string;
    username: string;
    email: string;
}

// Tipos do contexto
interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    // setUser: (user: User | null) => void;
}

// Criação do contexto
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider props
interface UserProviderProps {
    children: ReactNode;
}

// Provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        //Chamar rota do back que verifica se usuário é válido
        getItem('user').then((storedUser) => {
            if(storedUser) {
                const user : User = JSON.parse(storedUser);
                setUser(user);
            }
        })
    }, [])

    const login = (userData: User): void => {
        setUser(userData);
        saveItem('user', JSON.stringify(userData));
    }
    
    const logout = (): void => {
        setUser(null);
        deleteItem('user');
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext deve ser usado dentro de um UserProvider');
    }
    return context;
};