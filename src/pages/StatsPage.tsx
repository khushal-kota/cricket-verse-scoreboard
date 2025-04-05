import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { players } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { PlayerRole } from "@/types/cricket";

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState("batting");

  const battingData = players
    .filter((player) => player.stats.runs > 0)
    .sort((a, b) => b.stats.runs - a.stats.runs)
    .slice(0, 10)
    .map((player) => ({
      name: player.name.split(" ").pop() || player.name,
      runs: player.stats.runs,
      average: player.stats.average,
      team: player.teamId.toUpperCase(),
    }));

  const bowlingData = players
    .filter((player) => player.stats.wickets > 0)
    .sort((a, b) => b.stats.wickets - a.stats.wickets)
    .slice(0, 10)
    .map((player) => ({
      name: player.name.split(" ").pop() || player.name,
      wickets: player.stats.wickets,
      economy: player.stats.economyRate,
      team: player.teamId.toUpperCase(),
    }));

  const roleDistribution = Object.values(PlayerRole).map((role) => {
    const count = players.filter((player) => player.role === role).length;
    return {
      name: role,
      value: count,
    };
  });

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#a855f7"];

  return (
    <div className="animate-fade-in p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-1 text-white">
          📊 IPL 2025 Statistics
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore player performance across batting, bowling, and team roles.
        </p>
      </div>

      <Tabs defaultValue="batting" value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-background/60 p-1 rounded-lg">
          <TabsTrigger value="batting" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            🏏 Batting
          </TabsTrigger>
          <TabsTrigger value="bowling" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            🎯 Bowling
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            🧩 Teams & Roles
          </TabsTrigger>
        </TabsList>

        {/* Batting Tab */}
        <TabsContent value="batting" className="mt-6">
          <Card className="shadow-xl border border-muted bg-background/50 hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">Top Run Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={battingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`${value}`, name === "runs" ? "Runs" : "Average"]}
                    labelFormatter={(label) => {
                      const player = battingData.find((p) => p.name === label);
                      return `${player?.name} (${player?.team})`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="runs" fill="#4f46e5" name="Runs" />
                  <Bar dataKey="average" fill="#10b981" name="Average" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bowling Tab */}
        <TabsContent value="bowling" className="mt-6">
          <Card className="shadow-xl border border-muted bg-background/50 hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-500">Top Wicket Takers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={bowlingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`${value}`, name === "wickets" ? "Wickets" : "Economy"]}
                    labelFormatter={(label) => {
                      const player = bowlingData.find((p) => p.name === label);
                      return `${player?.name} (${player?.team})`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wickets" fill="#f97316" name="Wickets" />
                  <Bar dataKey="economy" fill="#0ea5e9" name="Economy" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams & Roles Tab */}
        <TabsContent value="teams" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart for Role Distribution */}
            <Card className="shadow-xl border border-muted bg-background/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-violet-400">Player Roles Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} players`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers by Role */}
            <Card className="shadow-xl border border-muted bg-background/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-fuchsia-500">Player Role Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {Object.values(PlayerRole).map((role) => {
                    const playersWithRole = players.filter((p) => p.role === role);
                    const topPlayer = [...playersWithRole].sort((a, b) => {
                      if (role === PlayerRole.BATSMAN) {
                        return b.stats.runs - a.stats.runs;
                      } else if (role === PlayerRole.BOWLER) {
                        return b.stats.wickets - a.stats.wickets;
                      } else {
                        return b.stats.runs + b.stats.wickets - (a.stats.runs + a.stats.wickets);
                      }
                    })[0];

                    return (
                      <div
                        key={role}
                        className="border p-4 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg text-white">{role}</h3>
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                            {playersWithRole.length} Players
                          </span>
                        </div>
                        {topPlayer && (
                          <div className="text-sm">
                            <p className="font-medium">Top performer: {topPlayer.name}</p>
                            <p className="text-muted-foreground">
                              {role === PlayerRole.BATSMAN &&
                                `${topPlayer.stats.runs} runs, Avg: ${topPlayer.stats.average}`}
                              {role === PlayerRole.BOWLER &&
                                `${topPlayer.stats.wickets} wickets, Econ: ${topPlayer.stats.economyRate}`}
                              {role === PlayerRole.ALL_ROUNDER &&
                                `${topPlayer.stats.runs} runs, ${topPlayer.stats.wickets} wickets`}
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
