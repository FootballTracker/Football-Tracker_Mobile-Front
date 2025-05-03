import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { useUserContext } from "@/context/UserContext";
import { router } from "expo-router";

export default function Perfil() {
    const { logout } = useUserContext();

    return (
        <>
            <ThemedText onPress={() => {logout(); router.back()}} style={{textAlign: 'center', marginTop: 20, padding: 10}}>SAIR</ThemedText>
        </>
    )
}