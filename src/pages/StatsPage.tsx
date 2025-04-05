
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { players } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { PlayerRole } from "@/types/cricket";

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState("batting");

  // Prepare data for batting stats
  const battingData = players
    .filter(player => player.stats.runs > 0)
    .sort((a, b) => b.stats.runs - a.stats.runs)
    .slice(0, 10)
    .map(player => ({
      name: player.name.split(' ').pop() || player.name, // Use last name or full name if split fails
      runs: player.stats.runs,
      average: player.stats.average,
      team: player.teamId.toUpperCase(),
    }));

  // Prepare data for bowling stats
  const bowlingData = players
    .filter(player => player.stats.wickets > 0)
    .sort((a, b) => b.stats.wickets - a.stats.wickets)
    .slice(0, 10)
    .map(player => ({
      name: player.name.split(' ').pop() || player.name,
      wickets: player.stats.wickets,
      economy: player.stats.economyRate,
      team: player.teamId.toUpperCase(),
    }));

  // Prepare data for role distribution
  const roleDistribution = Object.values(PlayerRole).map(role => {
    const count = players.filter(player => player.role === role).length;
    return {
      name: role,
      value: count,
    };
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Statistics</h1>
        <p className="text-muted-foreground">Player performance statistics for IPL 2025</p>
      </div>
      
      <Tabs defaultValue="batting" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="batting">Batting</TabsTrigger>
          <TabsTrigger value="bowling">Bowling</TabsTrigger>
          <TabsTrigger value="teams">Teams & Roles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="batting" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Run Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={battingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      return [`${value}`, name === "runs" ? "Runs" : "Average"];
                    }}
                    labelFormatter={(label) => {
                      const player = battingData.find(p => p.name === label);
                      return `${player?.name} (${player?.team})`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="runs" fill="#8884d8" name="Runs" />
                  <Bar dataKey="average" fill="#82ca9d" name="Average" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bowling" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Wicket Takers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={bowlingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      return [`${value}`, name === "wickets" ? "Wickets" : "Economy"];
                    }}
                    labelFormatter={(label) => {
                      const player = bowlingData.find(p => p.name === label);
                      return `${player?.name} (${player?.team})`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wickets" fill="#ff7300" name="Wickets" />
                  <Bar dataKey="economy" fill="#00bcd4" name="Economy" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Roles Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} players`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Player Role Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.values(PlayerRole).map(role => {
                    const playersWithRole = players.filter(p => p.role === role);
                    const topPlayer = [...playersWithRole].sort((a, b) => {
                      if (role === PlayerRole.BATSMAN) {
                        return b.stats.runs - a.stats.runs;
                      } else if (role === PlayerRole.BOWLER) {
                        return b.stats.wickets - a.stats.wickets;
                      } else {
                        return (b.stats.runs + b.stats.wickets) - (a.stats.runs + a.stats.wickets);
                      }
                    })[0];
                    
                    return (
                      <div key={role} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg">{role}</h3>
                          <Badge variant="outline">{playersWithRole.length} Players</Badge>
                        </div>
                        {topPlayer && (
                          <div className="text-sm">
                            <p>Top performer: {topPlayer.name}</p>
                            <p className="text-muted-foreground">
                              {role === PlayerRole.BATSMAN && `${topPlayer.stats.runs} runs, Avg: ${topPlayer.stats.average}`}
                              {role === PlayerRole.BOWLER && `${topPlayer.stats.wickets} wickets, Econ: ${topPlayer.stats.economyRate}`}
                              {role === PlayerRole.ALL_ROUNDER && `${topPlayer.stats.runs} runs, ${topPlayer.stats.wickets} wickets`}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatsPage;
