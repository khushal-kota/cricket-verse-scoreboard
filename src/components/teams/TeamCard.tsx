
import { Team } from "@/types/cricket";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, MapPin, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link to={`/team/${team.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <AspectRatio ratio={16/9} className="bg-muted">
            <div 
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(to right, ${team.primaryColor || '#1F4BC7'}, ${team.secondaryColor || '#0F255E'})`
              }}
            >
              <div className="absolute inset-0 opacity-10 bg-pattern"></div>
              <img 
                src={team.logo || "/team-logos/placeholder.svg"} 
                alt={team.name}
                className="h-24 w-24 object-contain bg-white/10 p-2 rounded-full shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
          </AspectRatio>
          {team.championships > 0 && (
            <div className="absolute top-2 right-2 bg-cricket-yellow/90 text-black rounded-full p-1.5 flex items-center justify-center shadow-md">
              <Trophy className="w-3 h-3" />
              <span className="text-xs font-bold ml-1">{team.championships}</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">{team.name}</h3>
            <Badge variant="outline" className="text-xs">{team.shortName}</Badge>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div className={cn("p-2 rounded-md bg-primary/10 flex items-start")}>
              <User className="w-3 h-3 mr-1 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">Captain</p>
                <p className="font-medium">{team.captain}</p>
              </div>
            </div>
            <div className={cn("p-2 rounded-md bg-primary/10 flex items-start")}>
              <MapPin className="w-3 h-3 mr-1 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">Home</p>
                <p className="font-medium truncate">{team.homeGround.split(',')[0]}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>Players: {team.players.length}</span>
            </div>
            {team.foundedYear && (
              <div>Est. {team.foundedYear}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamCard;
