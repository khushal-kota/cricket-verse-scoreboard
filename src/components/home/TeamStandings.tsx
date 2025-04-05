
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pointsTable } from "@/data/mockData";
import { teams } from "@/data/mockData";

const TeamStandings = () => {
  // Sort points table by points and then by NRR
  const sortedTable = [...pointsTable].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.netRunRate - a.netRunRate;
  });

  return (
    <Card className="cricket-card">
      <CardHeader className="cricket-card-header">
        <CardTitle className="text-lg font-semibold">Points Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-4">Team</th>
                <th className="p-4">P</th>
                <th className="p-4">W</th>
                <th className="p-4">L</th>
                <th className="p-4">NR</th>
                <th className="p-4">Pts</th>
                <th className="p-4">NRR</th>
              </tr>
            </thead>
            <tbody>
              {sortedTable.slice(0, 5).map((entry, index) => {
                const team = teams.find(t => t.id === entry.teamId);
                if (!team) return null;
                
                return (
                  <tr key={entry.teamId} className={`border-b ${index < 4 ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={team.logo || "/team-logos/placeholder.svg"} 
                          alt={team.name} 
                          className="w-6 h-6 object-contain" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/team-logos/placeholder.svg";
                          }}
                        />
                      </div>
                      <span className="font-medium">{team.shortName}</span>
                    </td>
                    <td className="p-4 text-center">{entry.played}</td>
                    <td className="p-4 text-center">{entry.won}</td>
                    <td className="p-4 text-center">{entry.lost}</td>
                    <td className="p-4 text-center">{entry.noResult}</td>
                    <td className="p-4 text-center font-bold">{entry.points}</td>
                    <td className="p-4 text-center">{entry.netRunRate.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStandings;
