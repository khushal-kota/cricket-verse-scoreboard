
import { Match, MatchStatus } from "@/types/cricket";
import { teams } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Calendar, Clock, MapPin, Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const team1 = teams.find((team) => team.id === match.team1);
  const team2 = teams.find((team) => team.id === match.team2);

  if (!team1 || !team2) return null;

  const matchDate = parseISO(match.date);
  
  let statusBadgeClass = "";
  let statusText = "";
  
  switch (match.status) {
    case MatchStatus.LIVE:
      statusBadgeClass = "bg-red-500 text-white animate-pulse";
      statusText = "LIVE";
      break;
    case MatchStatus.UPCOMING:
      statusBadgeClass = "bg-blue-500 text-white";
      statusText = "UPCOMING";
      break;
    case MatchStatus.COMPLETED:
      statusBadgeClass = "bg-gray-500 text-white";
      statusText = "COMPLETED";
      break;
  }
  
  const getScoreElement = (teamId: string) => {
    if (match.status === MatchStatus.UPCOMING) return null;
    
    const innings = match.scorecard?.innings.find((inn) => inn.battingTeam === teamId);
    
    if (!innings) return <span className="text-lg font-semibold">-</span>;
    
    return (
      <span className={cn(
        "text-lg font-semibold",
        match.status === MatchStatus.LIVE && 
        teamId === match.scorecard?.innings[1]?.battingTeam && 
        "text-cricket-blue animate-score-pulse"
      )}>
        {innings.runs}/{innings.wickets} ({innings.overs})
      </span>
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative">
        <div className={cn("absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium", statusBadgeClass)}>
          {match.status === MatchStatus.LIVE && <Dot className="inline h-4 w-4" />}
          {statusText}
        </div>
        
        <div className="p-4 bg-gradient-to-r from-cricket-blue/90 to-cricket-dark-blue/90 text-white">
          <div className="text-sm font-medium">IPL 2025</div>
        </div>
        
        <CardContent className="p-5">
          <div className="mb-4 flex flex-col gap-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{matchDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>{matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{match.venue}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 my-6 items-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
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
              <div className="font-medium text-center">{team1.shortName}</div>
              <div>{getScoreElement(team1.id)}</div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold mb-1">VS</span>
              {match.status === MatchStatus.COMPLETED && (
                <div className="text-xs text-center text-muted-foreground">
                  {match.result}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
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
              <div className="font-medium text-center">{team2.shortName}</div>
              <div>{getScoreElement(team2.id)}</div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <Link to={`/match/${match.id}`}>
                {match.status === MatchStatus.LIVE 
                  ? "Watch Live" 
                  : match.status === MatchStatus.COMPLETED 
                    ? "View Scorecard" 
                    : "Match Details"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MatchCard;
