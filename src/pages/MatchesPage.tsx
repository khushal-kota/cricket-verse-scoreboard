
import { useState } from "react";
import MatchCard from "@/components/matches/MatchCard";
import { matches } from "@/data/mockData";
import { MatchStatus } from "@/types/cricket";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

const MatchesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const liveMatches = matches.filter(match => match.status === MatchStatus.LIVE);
  const upcomingMatches = matches.filter(match => match.status === MatchStatus.UPCOMING)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedMatches = matches.filter(match => match.status === MatchStatus.COMPLETED)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filterMatches = (matchList: typeof matches) => {
    if (!searchQuery) return matchList;
    
    return matchList.filter(match => 
      match.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredLive = filterMatches(liveMatches);
  const filteredUpcoming = filterMatches(upcomingMatches);
  const filteredCompleted = filterMatches(completedMatches);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Matches</h1>
        <p className="text-muted-foreground">Live scores, upcoming fixtures and results</p>
      </div>
      
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by team or venue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>IPL 2025</span>
        </div>
      </div>
      
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="live" className="flex-1 md:flex-initial relative">
            Live
            {liveMatches.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1 md:flex-initial">Upcoming</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 md:flex-initial">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="live" className="space-y-6">
          {filteredLive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLive.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No live matches at the moment</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          {filteredUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming matches found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {filteredCompleted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompleted.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No completed matches found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesPage;
