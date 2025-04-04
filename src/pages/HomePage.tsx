
import FeatureMatch from "@/components/home/FeatureMatch";
import TopPlayers from "@/components/home/TopPlayers";
import TeamStandings from "@/components/home/TeamStandings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { matches } from "@/data/mockData";
import { MatchStatus } from "@/types/cricket";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Trophy } from "lucide-react";

const HomePage = () => {
  // Get live match if available, otherwise get next upcoming match
  const featuredMatch = matches.find(match => match.status === MatchStatus.LIVE) || 
                      matches.filter(match => match.status === MatchStatus.UPCOMING)
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Get the latest completed matches
  const recentMatches = matches
    .filter(match => match.status === MatchStatus.COMPLETED)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">CricketVerse IPL</h1>
            <p className="text-muted-foreground">Live scores, matches, teams, players and more</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Calendar className="h-5 w-5 text-cricket-blue" />
            <span className="text-sm">IPL 2025 Season</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Featured Match</h2>
            {featuredMatch ? (
              <FeatureMatch match={featuredMatch} />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p>No matches scheduled at the moment.</p>
                </CardContent>
              </Card>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Points Table</h2>
              <Link to="/points-table" className="text-cricket-blue flex items-center text-sm hover:underline">
                View Full Table <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <TeamStandings />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Matches</h2>
          <Link to="/matches" className="text-cricket-blue flex items-center text-sm hover:underline">
            View All Matches <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentMatches.map(match => (
            <Link to={`/match/${match.id}`} key={match.id} className="block">
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="mb-2 text-xs text-muted-foreground">
                    {new Date(match.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`/team-logos/${match.team1}.png`} 
                        alt={match.team1}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/team-logos/placeholder.svg";
                        }}
                      />
                      <span className="font-medium">{match.team1.toUpperCase()}</span>
                    </div>
                    <div>vs</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.team2.toUpperCase()}</span>
                      <img 
                        src={`/team-logos/${match.team2}.png`} 
                        alt={match.team2}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/team-logos/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {match.result}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Top Players</h2>
          <Link to="/stats" className="text-cricket-blue flex items-center text-sm hover:underline">
            View All Stats <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <TopPlayers />
      </section>
    </div>
  );
};

export default HomePage;
