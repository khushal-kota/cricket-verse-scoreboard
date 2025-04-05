
import { pointsTable } from "@/data/mockData";
import { teams } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PointsTablePage = () => {
  // Sort points table by points and then by NRR
  const sortedTable = [...pointsTable].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.netRunRate - a.netRunRate;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Points Table</h1>
        <p className="text-muted-foreground">Current standings in the IPL 2025 season</p>
      </div>
      
      <Card>
        <CardHeader className="bg-gradient-to-r from-cricket-blue to-cricket-dark-blue text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">IPL 2025 Points Table</CardTitle>
            <Trophy className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-4 px-4 text-left">#</th>
                  <th className="py-4 px-4 text-left">Team</th>
                  <th className="py-4 px-4 text-center">Played</th>
                  <th className="py-4 px-4 text-center">Won</th>
                  <th className="py-4 px-4 text-center">Lost</th>
                  <th className="py-4 px-4 text-center">Tied</th>
                  <th className="py-4 px-4 text-center">NR</th>
                  <th className="py-4 px-4 text-center">Points</th>
                  <th className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      NRR
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-48">Net Run Rate (NRR) is calculated as the average runs per over that a team scores, minus the average runs per over scored against them.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTable.map((entry, index) => {
                  const team = teams.find(t => t.id === entry.teamId);
                  if (!team) return null;
                  
                  return (
                    <tr 
                      key={entry.teamId} 
                      className={`border-b ${
                        index < 4 
                          ? 'bg-green-50 dark:bg-green-900/10' 
                          : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-center">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-xs text-muted-foreground">{team.shortName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{entry.played}</td>
                      <td className="py-3 px-4 text-center font-semibold text-green-600">{entry.won}</td>
                      <td className="py-3 px-4 text-center font-semibold text-red-600">{entry.lost}</td>
                      <td className="py-3 px-4 text-center">{entry.tied}</td>
                      <td className="py-3 px-4 text-center">{entry.noResult}</td>
                      <td className="py-3 px-4 text-center font-bold text-lg">{entry.points}</td>
                      <td className="py-3 px-4 text-center">{entry.netRunRate.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Qualification Rules</h3>
        <Card>
          <CardContent className="p-4">
            <ul className="list-disc ml-5 space-y-2">
              <li>The top 4 teams (highlighted) qualify for the playoffs</li>
              <li>If teams are tied on points, the team with the better Net Run Rate (NRR) qualifies</li>
              <li>Qualifier 1: 1st vs 2nd (winner goes to final)</li>
              <li>Eliminator: 3rd vs 4th</li>
              <li>Qualifier 2: Loser of Qualifier 1 vs Winner of Eliminator</li>
              <li>Final: Winner of Qualifier 1 vs Winner of Qualifier 2</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PointsTablePage;
