
import { Player } from "@/types/cricket";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { teams } from "@/data/mockData";
import { Flag, Info, Activity, CircleDot, User } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const team = teams.find(t => t.id === player.teamId);
  
  return (
    <Link to={`/player/${player.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="h-48 overflow-hidden relative">
          <div 
            className="absolute inset-0 w-full h-full z-0"
            style={{
              background: team 
                ? `linear-gradient(to bottom right, ${team.primaryColor || '#1F4BC7'}, ${team.secondaryColor || '#0F255E'})`
                : 'linear-gradient(to bottom right, #1F4BC7, #0F255E)'
            }}
          />
          <div className="flex items-center justify-center h-full relative z-10">
            <img 
              src={player.image || "/player-images/placeholder.svg"} 
              alt={player.name}
              className="h-36 w-36 object-cover rounded-full bg-white p-1 shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/player-images/placeholder.svg";
              }}
            />
          </div>
          {team && (
            <div className="absolute bottom-2 right-2 z-20">
              <img 
                src={team.logo || "/team-logos/placeholder.svg"} 
                alt={team.name}
                className="h-10 w-10 object-contain bg-white rounded-full p-1 shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
          )}
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-bold text-lg mb-1">{player.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="outline">{player.role}</Badge>
            <Badge variant="secondary">{team?.shortName || player.teamId.toUpperCase()}</Badge>
          </div>
          
          <div className="mb-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Flag className="h-3 w-3" />
            <span>{player.nationality}</span>
            <span className="text-xs">•</span>
            <span>{player.age} yrs</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              <span>{player.battingStyle}</span>
            </div>
            {player.bowlingStyle && (
              <div className="flex items-center">
                <CircleDot className="h-3 w-3 mr-1" />
                <span>{player.bowlingStyle}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-xs text-muted-foreground">Matches</div>
              <div className="font-bold text-lg">{player.stats.matches}</div>
            </div>
            <div>
              {player.role === "Bowler" ? (
                <>
                  <div className="text-xs text-muted-foreground">Wickets</div>
                  <div className="font-bold text-lg">{player.stats.wickets}</div>
                </>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground">Runs</div>
                  <div className="font-bold text-lg">{player.stats.runs}</div>
                </>
              )}
            </div>
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="mt-4 flex items-center justify-center cursor-help">
                <Info className="h-3 w-3 mr-1" />
                <span className="text-xs text-muted-foreground">More stats</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex items-center gap-4 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={player.image || "/player-images/placeholder.svg"} alt={player.name} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{player.name}</h4>
                  <p className="text-xs text-muted-foreground">{player.nationality} | #{player.jerseyNumber || "N/A"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Highest Score</div>
                  <div>{player.stats.highestScore}</div>
                </div>
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Average</div>
                  <div>{player.stats.average.toFixed(2)}</div>
                </div>
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Strike Rate</div>
                  <div>{player.stats.strikeRate.toFixed(2)}</div>
                </div>
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">50s/100s</div>
                  <div>{player.stats.fifties}/{player.stats.hundreds}</div>
                </div>
                {player.role !== "Batsman" && (
                  <>
                    <div className="text-sm">
                      <div className="text-xs text-muted-foreground">Best Bowling</div>
                      <div>{player.stats.bestBowling}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-xs text-muted-foreground">Economy</div>
                      <div>{player.stats.economyRate.toFixed(2)}</div>
                    </div>
                  </>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlayerCard;
