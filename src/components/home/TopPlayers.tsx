
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { players } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const TopPlayers = () => {
  // Sort players by runs (top batsmen)
  const topBatsmen = [...players].sort((a, b) => b.stats.runs - a.stats.runs).slice(0, 3);
  
  // Sort players by wickets (top bowlers)
  const topBowlers = [...players].sort((a, b) => b.stats.wickets - a.stats.wickets).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="cricket-card">
        <CardHeader className="cricket-card-header">
          <CardTitle className="text-lg font-semibold">Top Batsmen</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {topBatsmen.map((player, index) => (
              <div key={player.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{player.name}</span>
                    <Badge variant="outline" className="text-xs">{player.role}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{player.teamId.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{player.stats.runs}</div>
                  <div className="text-xs text-muted-foreground">Runs</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="cricket-card">
        <CardHeader className="cricket-card-header">
          <CardTitle className="text-lg font-semibold">Top Bowlers</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {topBowlers.map((player, index) => (
              <div key={player.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{player.name}</span>
                    <Badge variant="outline" className="text-xs">{player.role}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{player.teamId.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{player.stats.wickets}</div>
                  <div className="text-xs text-muted-foreground">Wickets</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPlayers;
