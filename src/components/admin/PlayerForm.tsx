
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Player, PlayerRole } from "@/types/cricket";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teams } from "@/data/mockData";

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: (player: Partial<Player>) => void;
}

const PlayerForm = ({ initialData, onSubmit }: PlayerFormProps) => {
  const { toast } = useToast();
  const [player, setPlayer] = useState<Partial<Player>>(
    initialData || {
      id: "",
      name: "",
      image: "",
      teamId: "",
      role: PlayerRole.BATSMAN,
      battingStyle: "",
      bowlingStyle: "",
      nationality: "",
      age: 0,
      stats: {
        matches: 0,
        runs: 0,
        highestScore: 0,
        average: 0,
        strikeRate: 0,
        fifties: 0,
        hundreds: 0,
        wickets: 0,
        bestBowling: "-",
        economyRate: 0
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('stats.')) {
      const statName = name.split('.')[1];
      setPlayer(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statName]: type === 'number' ? parseFloat(value) : value
        }
      }));
    } else {
      setPlayer(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleSelectChange = (field: keyof Player, value: string) => {
    setPlayer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!player.name || !player.teamId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(player);
    toast({
      title: "Success",
      description: initialData ? "Player updated successfully" : "Player created successfully"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Player" : "Create New Player"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Player ID (unique identifier)</Label>
              <Input
                id="id"
                name="id"
                value={player.id}
                onChange={handleChange}
                placeholder="e.g. p1, p2, etc."
                required
                disabled={!!initialData}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Player Name</Label>
              <Input
                id="name"
                name="name"
                value={player.name}
                onChange={handleChange}
                placeholder="Virat Kohli"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamId">Team</Label>
              <Select 
                value={player.teamId} 
                onValueChange={(value) => handleSelectChange('teamId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={player.role} 
                onValueChange={(value) => handleSelectChange('role', value as PlayerRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PlayerRole).map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Player Image URL</Label>
              <Input
                id="image"
                name="image"
                value={player.image}
                onChange={handleChange}
                placeholder="https://example.com/player.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                name="nationality"
                value={player.nationality}
                onChange={handleChange}
                placeholder="Indian"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={player.age}
                onChange={handleChange}
                min={15}
                max={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="battingStyle">Batting Style</Label>
              <Input
                id="battingStyle"
                name="battingStyle"
                value={player.battingStyle}
                onChange={handleChange}
                placeholder="Right Handed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bowlingStyle">Bowling Style</Label>
              <Input
                id="bowlingStyle"
                name="bowlingStyle"
                value={player.bowlingStyle}
                onChange={handleChange}
                placeholder="Right-arm fast"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Player Statistics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats.matches">Matches</Label>
              <Input
                id="stats.matches"
                name="stats.matches"
                type="number"
                value={player.stats?.matches}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.runs">Runs</Label>
              <Input
                id="stats.runs"
                name="stats.runs"
                type="number"
                value={player.stats?.runs}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.highestScore">Highest Score</Label>
              <Input
                id="stats.highestScore"
                name="stats.highestScore"
                type="number"
                value={player.stats?.highestScore}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.average">Average</Label>
              <Input
                id="stats.average"
                name="stats.average"
                type="number"
                step="0.01"
                value={player.stats?.average}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats.strikeRate">Strike Rate</Label>
              <Input
                id="stats.strikeRate"
                name="stats.strikeRate"
                type="number"
                step="0.01"
                value={player.stats?.strikeRate}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.fifties">Fifties</Label>
              <Input
                id="stats.fifties"
                name="stats.fifties"
                type="number"
                value={player.stats?.fifties}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.hundreds">Hundreds</Label>
              <Input
                id="stats.hundreds"
                name="stats.hundreds"
                type="number"
                value={player.stats?.hundreds}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.wickets">Wickets</Label>
              <Input
                id="stats.wickets"
                name="stats.wickets"
                type="number"
                value={player.stats?.wickets}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stats.bestBowling">Best Bowling</Label>
              <Input
                id="stats.bestBowling"
                name="stats.bestBowling"
                value={player.stats?.bestBowling}
                onChange={handleChange}
                placeholder="3/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats.economyRate">Economy Rate</Label>
              <Input
                id="stats.economyRate"
                name="stats.economyRate"
                type="number"
                step="0.01"
                value={player.stats?.economyRate}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">{initialData ? "Update Player" : "Create Player"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PlayerForm;
