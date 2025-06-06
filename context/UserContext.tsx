import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { deleteItem, getItem, saveItem } from './StorageFunctions';

// Tipo do usuário (pode ser expandido)
interface User {
    id: string;
    username: string;
    email: string;
    image: boolean;
}

interface AuthState {
    user: User | null;
    logged: boolean | null;
}

// Tipos do contexto
interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    logged: boolean | null;
    setImage: (value: boolean) => void;
    imageVersion: number | null;
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
    const [auth, setAuth] = useState<AuthState>({user: null, logged: null});
    const [imageVersion, setImageVersion] = useState<number | null>(null);

    useEffect(() => {
        //Chamar rota do back que verifica se usuário é válido
        getItem('user').then((storedUser) => {
            if(storedUser) {
                const user : User = JSON.parse(storedUser);
                setAuth({user: user, logged: true});
                setImageVersion(Date.now());
            } else {
                setAuth({user: null, logged: false});
            }
        })
    }, [])

    const login = (userData: User): void => {
        setAuth({user: userData, logged: true});
        saveItem('user', JSON.stringify(userData));
    }
    
    const logout = (): void => {
        setAuth({user: null, logged: false});
        deleteItem('user');
    }

    const setImage = (value: boolean): void => {

        setAuth((auth) => {
            if(!auth.user) return auth;

            return {
                ...auth,
                user: {
                    ...auth.user,
                    image: value
                }
            }
        });

        setImageVersion(Date.now());
    }

    return (
        <UserContext.Provider value={{ user: auth.user, login, logout, logged: auth.logged, setImage, imageVersion }}>
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