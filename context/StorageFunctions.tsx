import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

const isWeb = Platform.OS === 'web';

export const saveItem = (key: string, value: any) => {
    if (isWeb) {
        AsyncStorage.setItem(key, value);
    } else {
        SecureStore.setItemAsync(key, value);
    }
};

export const getItem = (key: string) => {
    if (isWeb) {
        return AsyncStorage.getItem(key);
    } else {
        return SecureStore.getItemAsync(key);
    }
};

export const deleteItem = (key: string) => {
    if (isWeb) {
        AsyncStorage.removeItem(key);
    } else {
        SecureStore.deleteItemAsync(key);
    }
};