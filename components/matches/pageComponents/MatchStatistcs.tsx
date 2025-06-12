//Default Imports
import { TeamStatistics } from "@/app/(pages)/match/[matchId]";
import { MatchCardI } from "../MatchCard";
import { memo } from "react";

//Components
import { ScrollView } from "react-native";
import { TeamsLogosInformation } from "../TeamsLogosInformation";
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import DoubleInfo from "@/components/DoubleInfo";
import Section from "@/components/Section";

//Types
type MatchStatisticsProps = {
    match: MatchCardI;
    home_team: TeamStatistics;
    away_team: TeamStatistics;
}

function MatchStatistcs({ match, home_team, away_team } : MatchStatisticsProps) {
    return (
        <ScrollView>
            <Section style={{marginBottom: 50}}>
                <TeamsLogosInformation home_team={match.home_team} away_team={match.away_team} style={{marginBottom: 15}}>
                    <ThemedText style={{fontFamily: 'Karla', marginHorizontal: 10}}>X</ThemedText>
                </TeamsLogosInformation>

                <DoubleInfo infoName="Chutes no gol" leftInfo={home_team.shotsOnGoal} rightInfo={away_team.shotsOnGoal} />
                <DoubleInfo infoName="Chutes fora do gol" leftInfo={home_team.shotsOffGoal} rightInfo={away_team.shotsOffGoal} />
                <DoubleInfo infoName="Total de chutes" leftInfo={home_team.totalShots} rightInfo={away_team.totalShots} />
                <DoubleInfo infoName="Chutes bloqueados" leftInfo={home_team.blockedShots} rightInfo={away_team.blockedShots} />
                <DoubleInfo infoName="Chutes de dentro da área" leftInfo={home_team.shotsInsidebox} rightInfo={away_team.shotsInsidebox} />
                <DoubleInfo infoName="Chutes de fora da área" leftInfo={home_team.shotsOutsidebox} rightInfo={away_team.shotsOutsidebox} />
                <DoubleInfo infoName="Faltas" leftInfo={home_team.fouls} rightInfo={away_team.fouls} />
                <DoubleInfo infoName="Escanteios" leftInfo={home_team.cornerKicks} rightInfo={away_team.cornerKicks} />
                <DoubleInfo infoName="Impedimentos" leftInfo={home_team.offsides} rightInfo={away_team.offsides} />
                <DoubleInfo infoName="Posse de bola" leftInfo={home_team.ballPossession} rightInfo={away_team.ballPossession} />
                <DoubleInfo infoName="Cartões amarelos" leftInfo={home_team.yellowCards} rightInfo={away_team.yellowCards} />
                <DoubleInfo infoName="Cartões vermelhos" leftInfo={home_team.redCards} rightInfo={away_team.redCards} />
                <DoubleInfo infoName="Defesas do goleiro" leftInfo={home_team.goalkeeperSaves} rightInfo={away_team.goalkeeperSaves} />
                <DoubleInfo infoName="Total de passes" leftInfo={home_team.totalPasses} rightInfo={away_team.totalPasses} />
                <DoubleInfo infoName="Passes certos" leftInfo={home_team.passesAccurate} rightInfo={away_team.passesAccurate} />
                <DoubleInfo infoName="% Passes corretos" leftInfo={home_team.passesPercentage} rightInfo={away_team.passesPercentage} />
            </Section>
        </ScrollView>
    )
}

export default memo(MatchStatistcs);