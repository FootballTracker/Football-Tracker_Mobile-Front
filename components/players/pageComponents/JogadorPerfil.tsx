//Default Imports
import Section from '@/components/Section';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

//Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SingleInfo from '@/components/SingleInfo';
import Username from '@/assets/Icons/Username.svg'
import Birthday from '@/assets/Icons/Birthday.svg'
import Flag from '@/assets/Icons/Flag.svg'
import City from '@/assets/Icons/City.svg'
import Height from '@/assets/Icons/Height.svg'
import Weight from '@/assets/Icons/Weight.svg'
import Position from '@/assets/Icons/Position.svg'
import { formatDate } from '@/lib/format';

//Type
type JogadorPerfilProps = {
    player: {
        id: string,
        name: string,
        firstname: string,
        lastname: string,
        age: number,
        birth_date : string,
        birth_place: string,
        birth_country: string,
        nationality: string,
        height: string,
        weight: string,
        number: number,
        position: string,
        photo_url: string,
        flag_url: string,
        is_favorite: boolean,
    }
}

export default function JogadorPerfil({ player } : JogadorPerfilProps) {
    return (
        <ThemedScrollView style={{marginBottom: 50}}>
            <Section icon={{IconComponent: MaterialCommunityIcons, name: 'information'}} text='Informações' >
                <SingleInfo icon={{IconComponent: Username}} infoName='Nome: ' info={player.firstname + ' ' + player.lastname} />
                <SingleInfo icon={{IconComponent: Birthday}} infoName='Data de nascimento: ' info={formatDate(player.birth_date)} />
                <SingleInfo icon={{IconComponent: Flag}} infoName='Pais: ' info={player.birth_country} />
                <SingleInfo icon={{IconComponent: City, Stroke: true}} infoName='Cidade de Origem: ' info={player.birth_place} />
                <SingleInfo icon={{IconComponent: Height, Stroke: true}} infoName='Altura: ' info={player.height} />
                <SingleInfo icon={{IconComponent: Weight, Stroke: true}} infoName='Peso: ' info={player.weight} />
                <SingleInfo icon={{IconComponent: Position}} infoName='Posição: ' info={player.position} />
            </Section>
        </ThemedScrollView>
    )
}