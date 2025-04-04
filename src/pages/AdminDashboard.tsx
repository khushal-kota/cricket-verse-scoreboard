
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import TeamForm from "@/components/admin/TeamForm";
import PlayerForm from "@/components/admin/PlayerForm";
import MatchForm from "@/components/admin/MatchForm";
import { useToast } from "@/components/ui/use-toast";
import { matches, players, teams } from "@/data/mockData";
import { Plus, Edit, Trash2 } from "lucide-react";
import { MatchStatus, Player, Team, Match } from "@/types/cricket";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("teams");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Team | Player | Match | null>(null);

  const handleCreate = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (data: any) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Success",
      description: `${activeTab.slice(0, -1)} deleted successfully`
    });
  };

  const handleSubmit = (data: any) => {
    toast({
      title: "Success",
      description: editData 
        ? `${activeTab.slice(0, -1)} updated successfully` 
        : `${activeTab.slice(0, -1)} created successfully`
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage teams, players, and matches</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
          </TabsList>
          
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab.slice(0, -1)}
          </Button>
        </div>
        
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-lg">
              {activeTab === "teams" && "Teams Management"}
              {activeTab === "players" && "Players Management"}
              {activeTab === "matches" && "Matches Management"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!showForm ? (
              <TabsContent value="teams" className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Logo</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Short Name</th>
                        <th className="p-4 text-left">Captain</th>
                        <th className="p-4 text-left">Championships</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map(team => (
                        <tr key={team.id} className="border-b">
                          <td className="p-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <img 
                                src={team.logo || "/team-logos/placeholder.svg"} 
                                alt={team.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/team-logos/placeholder.svg";
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-4">{team.name}</td>
                          <td className="p-4">{team.shortName}</td>
                          <td className="p-4">{team.captain}</td>
                          <td className="p-4">{team.championships}</td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(team)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(team.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ) : (
              activeTab === "teams" && <TeamForm initialData={editData as Team} onSubmit={handleSubmit} />
            )}
            
            {!showForm ? (
              <TabsContent value="players" className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Team</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Nationality</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map(player => {
                        const playerTeam = teams.find(t => t.id === player.teamId);
                        return (
                          <tr key={player.id} className="border-b">
                            <td className="p-4">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img 
                                  src={player.image || "/player-images/placeholder.svg"} 
                                  alt={player.name}
                                  className="w-10 h-10 object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/player-images/placeholder.svg";
                                  }}
                                />
                              </div>
                            </td>
                            <td className="p-4">{player.name}</td>
                            <td className="p-4">{playerTeam?.shortName}</td>
                            <td className="p-4">{player.role}</td>
                            <td className="p-4">{player.nationality}</td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(player)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(player.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ) : (
              activeTab === "players" && <PlayerForm initialData={editData as Player} onSubmit={handleSubmit} />
            )}
            
            {!showForm ? (
              <TabsContent value="matches" className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Teams</th>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Venue</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Result</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map(match => {
                        const team1 = teams.find(t => t.id === match.team1);
                        const team2 = teams.find(t => t.id === match.team2);
                        const matchDate = new Date(match.date);
                        
                        return (
                          <tr key={match.id} className="border-b">
                            <td className="p-4">
                              <div className="flex items-center">
                                <span className="font-medium">{team1?.shortName} vs {team2?.shortName}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {matchDate.toLocaleDateString()} {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-4">{match.venue.split(',')[0]}</td>
                            <td className="p-4">
                              <span 
                                className={`px-2 py-1 rounded-full text-xs text-white ${
                                  match.status === MatchStatus.LIVE 
                                    ? 'bg-red-500' 
                                    : match.status === MatchStatus.UPCOMING 
                                      ? 'bg-blue-500' 
                                      : 'bg-gray-500'
                                }`}
                              >
                                {match.status}
                              </span>
                            </td>
                            <td className="p-4 text-sm">{match.result || '-'}</td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(match)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(match.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ) : (
              activeTab === "matches" && <MatchForm initialData={editData as Match} onSubmit={handleSubmit} />
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
