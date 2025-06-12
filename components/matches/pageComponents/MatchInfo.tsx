import { memo } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Section from "@/components/Section";
import { View } from "react-native";
import SingleInfo from "@/components/SingleInfo";

interface MatchInfoI {
    referee: string;
    venue: string;
    city: string;
    status: string;
    matchTime: string;
    league: string;
    leagueLogo: string;
    country: string;
    countryFlag: string;
    season: number;
    round: number;
}

function MatchInfo({ referee, venue, city, status, matchTime, league, leagueLogo, country, countryFlag, season, round }: MatchInfoI ) {
    return (
        <View style={{marginTop: 10}}>
            <Section text="Geral" icon={{IconComponent: MaterialCommunityIcons, name: 'information'}}>
                <SingleInfo infoName="Juiz" info={referee}/>
                <SingleInfo infoName="Estádio" info={venue}/>
                <SingleInfo infoName="Cidade" info={city}/>
                <SingleInfo infoName="Status" info={status}/>
                <SingleInfo infoName="Tempo de Partida" info={`${matchTime} min`}/>
            </Section>

            <Section text="Liga" icon={{IconComponent: MaterialCommunityIcons, name: 'information'}}>
                <SingleInfo infoName="Nome" info={league} imageUrl={leagueLogo}/>
                <SingleInfo infoName="País" info={country} imageUrl={countryFlag}/>
                <SingleInfo infoName="Temporada" info={season.toString()}/>
                <SingleInfo infoName="Rodada" info={round.toString()}/>
            </Section>
        </View>
    )
}

export default memo(MatchInfo);