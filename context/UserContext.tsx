import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { deleteItem, getItem, saveItem } from './StorageFunctions';
import api from '@/lib/Axios';

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
    updateImage: () => Promise<void>
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
                api.get(`user/${user.id}/has_image`)
                    .then((response) => {
                        setImage(response.data);
                    })
                    .catch(() => {
                        alert("Erro ao buscar imagem do usuário");
                    })

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

    const updateImage = async (): Promise<void> => {
        if(!auth.user) return;

        await api.get(`user/${auth.user.id}/has_image`)
            .then((response) => {
                setImage(response.data);
            })
            .catch(() => {
                alert("Erro ao buscar imagem do usuário");
            })
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
        <UserContext.Provider value={{ user: auth.user, login, logout, logged: auth.logged, setImage, imageVersion, updateImage }}>
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