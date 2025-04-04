
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Match, MatchStatus } from "@/types/cricket";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teams } from "@/data/mockData";

interface MatchFormProps {
  initialData?: Match;
  onSubmit: (match: Partial<Match>) => void;
}

const MatchForm = ({ initialData, onSubmit }: MatchFormProps) => {
  const { toast } = useToast();
  const [match, setMatch] = useState<Partial<Match>>(
    initialData || {
      id: "",
      team1: "",
      team2: "",
      date: new Date().toISOString().slice(0, 16),
      venue: "",
      status: MatchStatus.UPCOMING
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMatch(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setMatch(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!match.team1 || !match.team2 || !match.date || !match.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (match.team1 === match.team2) {
      toast({
        title: "Error",
        description: "Teams must be different",
        variant: "destructive"
      });
      return;
    }

    onSubmit(match);
    toast({
      title: "Success",
      description: initialData ? "Match updated successfully" : "Match created successfully"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Match" : "Create New Match"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Match ID (unique identifier)</Label>
              <Input
                id="id"
                name="id"
                value={match.id}
                onChange={handleChange}
                placeholder="e.g. m1, m2, etc."
                required
                disabled={!!initialData}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Match Status</Label>
              <Select 
                value={match.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MatchStatus).map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1">Team 1</Label>
              <Select 
                value={match.team1} 
                onValueChange={(value) => handleSelectChange('team1', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team 1" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2">Team 2</Label>
              <Select 
                value={match.team2} 
                onValueChange={(value) => handleSelectChange('team2', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team 2" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date and Time</Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={match.date?.slice(0, 16)}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={match.venue}
                onChange={handleChange}
                placeholder="M. A. Chidambaram Stadium, Chennai"
                required
              />
            </div>
          </div>

          {match.status === MatchStatus.COMPLETED && (
            <div className="space-y-2">
              <Label htmlFor="result">Result</Label>
              <Input
                id="result"
                name="result"
                value={match.result}
                onChange={handleChange}
                placeholder="Chennai Super Kings won by 6 wickets"
              />
            </div>
          )}

          {match.status !== MatchStatus.UPCOMING && (
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                To add detailed scorecard information, use the specialized scorecard editor after creating this match.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">{initialData ? "Update Match" : "Create Match"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MatchForm;
