
import { useState } from "react";
import PlayerCard from "@/components/players/PlayerCard";
import { players } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teams } from "@/data/mockData";
import { PlayerRole } from "@/types/cricket";

const PlayersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = teamFilter ? player.teamId === teamFilter : true;
    const matchesRole = roleFilter ? player.role === roleFilter : true;
    
    return matchesSearch && matchesTeam && matchesRole;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Players</h1>
        <p className="text-muted-foreground">All the players participating in IPL 2025</p>
      </div>
      
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search players"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.values(PlayerRole).map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3 flex items-center justify-end text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            <span>{filteredPlayers.length} Players</span>
          </div>
        </div>
      </div>
      
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No players found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
