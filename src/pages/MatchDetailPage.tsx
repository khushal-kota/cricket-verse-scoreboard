
import { useParams } from "react-router-dom";
import { matches, teams, players } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Dot } from "lucide-react";
import { MatchStatus } from "@/types/cricket";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from "react";

const MatchDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const match = matches.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState("scorecard");
  
  if (!match) {
    return <div>Match not found</div>;
  }
  
  const team1 = teams.find(team => team.id === match.team1);
  const team2 = teams.find(team => team.id === match.team2);
  
  if (!team1 || !team2) {
    return <div>Team data not found</div>;
  }
  
  const matchDate = new Date(match.date);
  
  const getPlayerName = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : "Unknown Player";
  };
  
  const getBatsmanRows = (inning: any) => {
    return inning.battingScores.map((score: any) => (
      <tr key={score.playerId} className="border-b">
        <td className="py-3 px-4">
          <div>
            <div className="font-medium">{getPlayerName(score.playerId)}</div>
            <div className="text-xs text-muted-foreground">{score.dismissal}</div>
          </div>
        </td>
        <td className="py-3 px-4 text-center">{score.runs}</td>
        <td className="py-3 px-4 text-center">{score.balls}</td>
        <td className="py-3 px-4 text-center">{score.fours}</td>
        <td className="py-3 px-4 text-center">{score.sixes}</td>
        <td className="py-3 px-4 text-center font-medium">{score.strikeRate.toFixed(2)}</td>
      </tr>
    ));
  };
  
  const getBowlerRows = (inning: any) => {
    return inning.bowlingFigures.map((figure: any) => (
      <tr key={figure.playerId} className="border-b">
        <td className="py-3 px-4">
          <div className="font-medium">{getPlayerName(figure.playerId)}</div>
        </td>
        <td className="py-3 px-4 text-center">{figure.overs}</td>
        <td className="py-3 px-4 text-center">{figure.maidens}</td>
        <td className="py-3 px-4 text-center">{figure.runs}</td>
        <td className="py-3 px-4 text-center">{figure.wickets}</td>
        <td className="py-3 px-4 text-center font-medium">{figure.economy.toFixed(2)}</td>
      </tr>
    ));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="relative bg-gradient-to-r from-cricket-blue to-cricket-dark-blue text-white p-6 rounded-lg mb-6">
        {match.status === MatchStatus.LIVE && (
          <div className="absolute top-4 right-4 flex items-center bg-red-500 px-2 py-1 rounded-full text-xs font-medium">
            <Dot className="animate-pulse h-4 w-4" />
            LIVE
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-full p-1 mb-2">
              <img 
                src={team1.logo || "/team-logos/placeholder.svg"} 
                alt={team1.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
            <div className="text-xl font-bold">{team1.name}</div>
            {match.scorecard && (
              <div className="text-2xl font-bold mt-2">
                {match.scorecard.innings.find(inn => inn.battingTeam === team1.id)?.runs || 0}/
                {match.scorecard.innings.find(inn => inn.battingTeam === team1.id)?.wickets || 0}
                <span className="text-sm font-normal ml-1">
                  ({match.scorecard.innings.find(inn => inn.battingTeam === team1.id)?.overs || 0})
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm mb-2">
              {match.status === MatchStatus.COMPLETED ? (
                <Badge className="bg-gray-600">{match.status}</Badge>
              ) : match.status === MatchStatus.LIVE ? (
                <Badge className="bg-red-500 animate-pulse">{match.status}</Badge>
              ) : (
                <Badge className="bg-blue-500">{match.status}</Badge>
              )}
            </div>
            <div className="text-2xl font-bold mb-3">VS</div>
            {match.result && <div className="text-sm">{match.result}</div>}
            <div className="flex flex-col mt-4 text-xs space-y-1">
              <div className="flex items-center justify-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{matchDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-full p-1 mb-2">
              <img 
                src={team2.logo || "/team-logos/placeholder.svg"} 
                alt={team2.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/team-logos/placeholder.svg";
                }}
              />
            </div>
            <div className="text-xl font-bold">{team2.name}</div>
            {match.scorecard && (
              <div className="text-2xl font-bold mt-2">
                {match.scorecard.innings.find(inn => inn.battingTeam === team2.id)?.runs || 0}/
                {match.scorecard.innings.find(inn => inn.battingTeam === team2.id)?.wickets || 0}
                <span className="text-sm font-normal ml-1">
                  ({match.scorecard.innings.find(inn => inn.battingTeam === team2.id)?.overs || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {match.status !== MatchStatus.UPCOMING && match.scorecard && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
            <TabsTrigger value="commentary">Commentary</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scorecard" className="space-y-6">
            {match.scorecard.innings.map((inning, index) => {
              const battingTeam = teams.find(team => team.id === inning.battingTeam);
              if (!battingTeam) return null;
              
              const bowlingTeam = teams.find(team => team.id !== inning.battingTeam && (team.id === match.team1 || team.id === match.team2));
              
              return (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: battingTeam.primaryColor }}>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white">
                        <img 
                          src={battingTeam.logo || "/team-logos/placeholder.svg"} 
                          alt={battingTeam.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/team-logos/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="font-bold">{battingTeam.name} Innings</div>
                    </div>
                    <div className="text-xl font-bold">
                      {inning.runs}/{inning.wickets}
                      <span className="text-sm font-normal ml-1">({inning.overs})</span>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="py-3 px-4 text-left">Batsman</th>
                            <th className="py-3 px-4 text-center">R</th>
                            <th className="py-3 px-4 text-center">B</th>
                            <th className="py-3 px-4 text-center">4s</th>
                            <th className="py-3 px-4 text-center">6s</th>
                            <th className="py-3 px-4 text-center">SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getBatsmanRows(inning)}
                          <tr className="bg-muted/30">
                            <td className="py-2 px-4 font-bold">Total</td>
                            <td className="py-2 px-4 text-center font-bold">{inning.runs}/{inning.wickets}</td>
                            <td className="py-2 px-4 text-center" colSpan={4}>{inning.overs} Overs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4">
                      <div className="p-3 border-b font-bold bg-muted/20">Bowling</div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="py-3 px-4 text-left">Bowler</th>
                              <th className="py-3 px-4 text-center">O</th>
                              <th className="py-3 px-4 text-center">M</th>
                              <th className="py-3 px-4 text-center">R</th>
                              <th className="py-3 px-4 text-center">W</th>
                              <th className="py-3 px-4 text-center">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getBowlerRows(inning)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {match.status === MatchStatus.COMPLETED && (
              <Card className="p-4">
                <div className="font-bold mb-2">Match Result</div>
                <div>{match.result}</div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="commentary" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Ball-by-ball commentary is not available for this match.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="highlights" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  Match highlights are not available for this match.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {match.status === MatchStatus.UPCOMING && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Match Preview</h3>
              <p className="text-muted-foreground mb-6">
                This exciting match between {team1.name} and {team2.name} will take place at {match.venue} on {matchDate.toLocaleDateString()}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">{team1.name}</h4>
                  <p>Captain: {team1.captain}</p>
                  <p>Championships: {team1.championships}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Head-to-Head</h4>
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <div className="text-sm font-bold">10</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <div className="text-sm font-bold">12</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-10 mt-2 text-xs text-muted-foreground">
                    <span>{team1.shortName}</span>
                    <span>{team2.shortName}</span>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">{team2.name}</h4>
                  <p>Captain: {team2.captain}</p>
                  <p>Championships: {team2.championships}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchDetailPage;
