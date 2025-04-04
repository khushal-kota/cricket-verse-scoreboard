
import { Player } from "@/types/cricket";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { teams } from "@/data/mockData";

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
              className="h-36 w-36 object-contain rounded-full bg-white p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/player-images/placeholder.svg";
              }}
            />
          </div>
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-bold text-lg mb-1">{player.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="outline">{player.role}</Badge>
            <Badge variant="secondary">{team?.shortName || player.teamId.toUpperCase()}</Badge>
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlayerCard;
