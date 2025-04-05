
import { Card, CardContent } from "@/components/ui/card";
import { Match, MatchStatus } from "@/types/cricket";
import { teams } from "@/data/mockData";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Dot } from "lucide-react";

interface FeatureMatchProps {
  match: Match;
}

const FeatureMatch = ({ match }: FeatureMatchProps) => {
  const team1 = teams.find((team) => team.id === match.team1);
  const team2 = teams.find((team) => team.id === match.team2);

  if (!team1 || !team2) return null;

  const getMatchStatusElement = () => {
    switch (match.status) {
      case MatchStatus.LIVE:
        return (
          <div className="flex items-center text-red-500">
            <Dot className="animate-pulse h-4 w-4" />
            <span className="font-medium">LIVE</span>
          </div>
        );
      case MatchStatus.UPCOMING:
        return (
          <div className="text-cricket-blue font-medium">
            {formatDistanceToNow(parseISO(match.date), { addSuffix: true })}
          </div>
        );
      case MatchStatus.COMPLETED:
        return <div className="text-gray-500 font-medium">{match.result}</div>;
    }
  };

  const getScoreElement = (teamId: string, isLive: boolean) => {
    if (match.status === MatchStatus.UPCOMING) return null;
    
    const innings = match.scorecard?.innings.find((inn) => inn.battingTeam === teamId);
    
    if (!innings) return <div className="text-lg font-semibold">-</div>;
    
    return (
      <div className={`text-lg font-semibold ${isLive && teamId === match.scorecard?.innings[1]?.battingTeam ? 'animate-score-pulse text-cricket-blue' : ''}`}>
        {innings.runs}/{innings.wickets} ({innings.overs})
      </div>
    );
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
      <div className="bg-gradient-to-r from-cricket-blue to-cricket-dark-blue text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">IPL 2025</h3>
          {getMatchStatusElement()}
        </div>
        <div className="text-sm opacity-80 mt-1">{match.venue}</div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="col-span-1 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mb-2">
              <img 
                src={team1.logo || "/team-logos/placeholder.svg"} 
                alt={team1.name} 
                className="w-12 h-12 object-contain" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
            <div className="font-semibold text-gray-800">{team1.shortName}</div>
            {getScoreElement(team1.id, match.status === MatchStatus.LIVE)}
          </div>
          
          <div className="col-span-1 text-center">
            <div className="text-xs text-gray-500 mb-2">
              {new Date(match.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
            <div className="text-xl font-bold">VS</div>
            <div className="text-xs text-gray-500 mt-2">
              {new Date(match.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <div className="col-span-1 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mb-2">
              <img 
                src={team2.logo || "/team-logos/placeholder.svg"} 
                alt={team2.name} 
                className="w-12 h-12 object-contain" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
            <div className="font-semibold text-gray-800">{team2.shortName}</div>
            {getScoreElement(team2.id, match.status === MatchStatus.LIVE)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureMatch;
