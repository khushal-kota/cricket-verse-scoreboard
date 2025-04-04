
// Cricket data types
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  captain: string;
  homeGround: string;
  championships: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  image: string;
  teamId: string;
  role: PlayerRole;
  battingStyle: string;
  bowlingStyle: string;
  nationality: string;
  age: number;
  stats: PlayerStats;
}

export enum PlayerRole {
  BATSMAN = "Batsman",
  BOWLER = "Bowler",
  ALL_ROUNDER = "All-rounder",
  WICKET_KEEPER = "Wicket-keeper",
}

export interface PlayerStats {
  matches: number;
  runs: number;
  highestScore: number;
  average: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  wickets: number;
  bestBowling: string;
  economyRate: number;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  result?: string;
  status: MatchStatus;
  scorecard?: Scorecard;
}

export enum MatchStatus {
  UPCOMING = "Upcoming",
  LIVE = "Live",
  COMPLETED = "Completed",
}

export interface Scorecard {
  innings: Innings[];
}

export interface Innings {
  battingTeam: string;
  runs: number;
  wickets: number;
  overs: number;
  battingScores: BattingScore[];
  bowlingFigures: BowlingFigure[];
}

export interface BattingScore {
  playerId: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissal: string;
}

export interface BowlingFigure {
  playerId: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface PointsTableEntry {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
}
