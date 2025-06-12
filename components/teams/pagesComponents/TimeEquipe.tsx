//Default Imports
import { TeamPlayersI } from '@/app/(pages)/team/[teamId]';
import { router } from 'expo-router';
import { memo } from 'react'

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import Section from '@/components/Section';

//Icons
import Notebook from '@/assets/Icons/Notebook.svg'
import Glove from '@/assets/Icons/Glove.svg'
import Defender from '@/assets/Icons/Defender.svg'
import Brain from '@/assets/Icons/Brain.svg'
import Boot from '@/assets/Icons/Boot.svg'
import Card from '@/components/Card';
import InfoMessage from '@/components/InfoMessage';

type TimeEquipeProps = {
    players : TeamPlayersI
}

function TimeEquipe({players} : TimeEquipeProps) {
    const accessPlayer = (id: string) => {
        router.push(`/(pages)/player/${id}` as any);
    }

    // alert('image: ' + players.coach_imagem);
    // alert('name: ' + players.coach);

    return (
        <ThemedScrollView>
            <Section icon={{IconComponent: Notebook, Stroke: true}} text='Treinadores' >
                {(players.coach && players.coach_imagem) ? (
                    <Card
                        handleOpen={() => {}}
                        info={players.coach}
                        image={players.coach_imagem}
                    />
                ) : (
                    <InfoMessage text='O time não possui nenhum coach.'/>
                )}
            </Section>
            
            <Section icon={{IconComponent: Glove}} text='Goleiros' >
                {players.goalkeeper ? (
                    players.goalkeeper.map((player, index) => (
                        <Card
                            handleOpen={() => {accessPlayer(player.id)}}
                            info={player.player}
                            image={player.playerImage}
                            key={index}
                        />
                    ))
                ) : (
                    <InfoMessage text='O time não possui nenhum goleiro.'/>
                )}
            </Section>

            <Section icon={{IconComponent: Defender}} text='Defensores' >
                {players.defensor ? (
                    players.defensor.map((player, index) => (
                        <Card
                            handleOpen={() => {accessPlayer(player.id)}}
                            info={player.player}
                            image={player.playerImage}
                            key={index}
                        />
                    ))
                ) : (
                    <InfoMessage text='O time não possui nenhum defensor.'/>
                )}
            </Section>

            <Section icon={{IconComponent: Brain}} text='Meias' >
                {players.mid_field ? (
                    players.mid_field.map((player, index) => (
                        <Card
                            handleOpen={() => {accessPlayer(player.id)}}
                            info={player.player}
                            image={player.playerImage}
                            key={index}
                        />
                    ))
                ) : (
                    <InfoMessage text='O time não possui nenhum meia.'/>
                )}
            </Section>

            <Section icon={{IconComponent: Boot}} text='Atacantes' style={{marginBottom: 50}} >
                {players.attacker ? (
                    players.attacker.map((player, index) => (
                        <Card
                            handleOpen={() => {accessPlayer(player.id)}}
                            info={player.player}
                            image={player.playerImage}
                            key={index}
                        />
                    ))
                ) : (
                    <InfoMessage text='O time não possui nenhum atacante.'/>
                )}
            </Section>
        </ThemedScrollView>
    )
}

export default memo(TimeEquipe);