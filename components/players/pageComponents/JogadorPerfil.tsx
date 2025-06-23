//Default Imports
import { formatDate } from '@/lib/format';
import { router } from 'expo-router';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import Card from '@/components/Card';
import Section from '@/components/Section';
import InfoMessage from '@/components/InfoMessage';

//Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Shield from "@/assets/Icons/Shield.svg";
import SingleInfo from '@/components/SingleInfo';
import Username from '@/assets/Icons/Username.svg'
import Birthday from '@/assets/Icons/Birthday.svg'
import Flag from '@/assets/Icons/Flag.svg'
import City from '@/assets/Icons/City.svg'
import Height from '@/assets/Icons/Height.svg'
import Weight from '@/assets/Icons/Weight.svg'
import Position from '@/assets/Icons/Position.svg'

//Types
type CountryInfo = {
    name: string,
    flag_url: string,
}

export type JogadorPerfilProps = {
    player: {
        id: string,
        name: string,
        firstname: string,
        lastname: string,
        age: number,
        birth_date : string,
        birth_place: string,
        birth_country: CountryInfo,
        nationality: CountryInfo,
        height: string,
        weight: string,
        number: number,
        position: string,
        photo_url: string,
        is_favorite: boolean,
    },
    teams: {
        id: string,
        logo: string,
        name: string,
    }[]
}


export default function JogadorPerfil({ player, teams } : JogadorPerfilProps) {

    function accessTeam(id: string) {
        router.push(`/(pages)/team/${id}`);
    }

    return (
        <ThemedScrollView>
            <Section icon={{IconComponent: MaterialCommunityIcons, name: 'information'}} text='Informações' >
                <SingleInfo icon={{IconComponent: Username}} infoName='Nome: ' info={player.firstname + ' ' + player.lastname} />
                <SingleInfo icon={{IconComponent: Birthday}} infoName='Data de nascimento: ' info={player.birth_date ? formatDate(player.birth_date, true, false) : "Desconhecida"} />
                <SingleInfo icon={{IconComponent: Flag}} infoName='Pais: ' info={player.birth_country.name || "Desconhecido"} />
                <SingleInfo icon={{IconComponent: City, Stroke: true}} infoName='Cidade de Origem: ' info={player.birth_place || "Desconhecida"} />
                <SingleInfo icon={{IconComponent: Height, Stroke: true}} infoName='Altura: ' info={player.height || "Desconhecida"} />
                <SingleInfo icon={{IconComponent: Weight, Stroke: true}} infoName='Peso: ' info={player.weight || "Desconhecido"} />
                <SingleInfo icon={{IconComponent: Position}} infoName='Posição: ' info={player.position} />
            </Section>

            <Section icon={{IconComponent: Shield, width: 25, height: 25, Stroke: true, strokeWidth: 5.5}} text='Times' style={{marginBottom: 50}}>
                {teams && teams.length ? teams.map((team) => (
                    <Card
                        info={team.name}
                        image={team.logo}
                        handleOpen={() => accessTeam(team.id)}
                        key={team.id}
                    />
                )) : (
                    <InfoMessage text='Nenhum time encontrado'/>
                )}
            </Section>
        </ThemedScrollView>
    )
}