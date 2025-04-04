
import { Team } from "@/types/cricket";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link to={`/team/${team.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1">
        <div 
          className="h-24 flex items-center justify-center"
          style={{
            background: `linear-gradient(to right, ${team.primaryColor || '#1F4BC7'}, ${team.secondaryColor || '#0F255E'})`
          }}
        >
          <img 
            src={team.logo || "/team-logos/placeholder.svg"} 
            alt={team.name}
            className="h-16 w-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/team-logos/placeholder.svg";
            }}
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{team.name}</h3>
            {team.championships > 0 && (
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-cricket-yellow mr-1" />
                <span className="text-sm font-medium">{team.championships}</span>
              </div>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div className={cn("p-2 rounded-md bg-primary/10")}>
              <p className="text-muted-foreground text-xs">Captain</p>
              <p className="font-medium">{team.captain}</p>
            </div>
            <div className={cn("p-2 rounded-md bg-primary/10")}>
              <p className="text-muted-foreground text-xs">Home</p>
              <p className="font-medium truncate">{team.homeGround.split(',')[0]}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamCard;
