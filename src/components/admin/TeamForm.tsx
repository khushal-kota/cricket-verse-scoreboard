
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/types/cricket";
import { useToast } from "@/components/ui/use-toast";

interface TeamFormProps {
  initialData?: Team;
  onSubmit: (team: Partial<Team>) => void;
}

const TeamForm = ({ initialData, onSubmit }: TeamFormProps) => {
  const { toast } = useToast();
  const [team, setTeam] = useState<Partial<Team>>(
    initialData || {
      id: "",
      name: "",
      shortName: "",
      logo: "",
      primaryColor: "#1F4BC7",
      secondaryColor: "#0F255E",
      captain: "",
      homeGround: "",
      championships: 0,
      players: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setTeam(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!team.name || !team.shortName || !team.id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(team);
    toast({
      title: "Success",
      description: initialData ? "Team updated successfully" : "Team created successfully"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Team" : "Create New Team"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Team ID (unique identifier)</Label>
              <Input
                id="id"
                name="id"
                value={team.id}
                onChange={handleChange}
                placeholder="e.g. mi, csk, rcb"
                required
                disabled={!!initialData}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                name="name"
                value={team.name}
                onChange={handleChange}
                placeholder="Mumbai Indians"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                name="shortName"
                value={team.shortName}
                onChange={handleChange}
                placeholder="MI"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="championships">Championships</Label>
              <Input
                id="championships"
                name="championships"
                type="number"
                value={team.championships}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={team.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="captain">Captain</Label>
              <Input
                id="captain"
                name="captain"
                value={team.captain}
                onChange={handleChange}
                placeholder="Rohit Sharma"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  name="primaryColor"
                  value={team.primaryColor}
                  onChange={handleChange}
                  placeholder="#1F4BC7"
                />
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: team.primaryColor }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  name="secondaryColor"
                  value={team.secondaryColor}
                  onChange={handleChange}
                  placeholder="#0F255E"
                />
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: team.secondaryColor }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="homeGround">Home Ground</Label>
            <Input
              id="homeGround"
              name="homeGround"
              value={team.homeGround}
              onChange={handleChange}
              placeholder="Wankhede Stadium, Mumbai"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">{initialData ? "Update Team" : "Create Team"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TeamForm;
