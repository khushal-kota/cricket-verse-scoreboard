
import { Match, MatchStatus, Player, PlayerRole, PointsTableEntry, Team } from "@/types/cricket";

export const teams: Team[] = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "/team-logos/csk.png",
    primaryColor: "#FFFF3C",
    secondaryColor: "#0081E9",
    captain: "MS Dhoni",
    homeGround: "M. A. Chidambaram Stadium",
    championships: 5,
    players: []
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "/team-logos/mi.png",
    primaryColor: "#004B8D",
    secondaryColor: "#D1AB3E",
    captain: "Hardik Pandya",
    homeGround: "Wankhede Stadium",
    championships: 5,
    players: []
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    logo: "/team-logos/rcb.png",
    primaryColor: "#EC1C24",
    secondaryColor: "#000000",
    captain: "Faf du Plessis",
    homeGround: "M. Chinnaswamy Stadium",
    championships: 0,
    players: []
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    logo: "/team-logos/kkr.png",
    primaryColor: "#3A225D",
    secondaryColor: "#B3A123",
    captain: "Shreyas Iyer",
    homeGround: "Eden Gardens",
    championships: 2,
    players: []
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    logo: "/team-logos/dc.png",
    primaryColor: "#0078BC",
    secondaryColor: "#EF1C25",
    captain: "Rishabh Pant",
    homeGround: "Arun Jaitley Stadium",
    championships: 0,
    players: []
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    logo: "/team-logos/srh.png",
    primaryColor: "#F26522",
    secondaryColor: "#000000",
    captain: "Pat Cummins",
    homeGround: "Rajiv Gandhi Intl. Cricket Stadium",
    championships: 1,
    players: []
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    logo: "/team-logos/rr.png",
    primaryColor: "#EA1A85",
    secondaryColor: "#254AA5",
    captain: "Sanju Samson",
    homeGround: "Sawai Mansingh Stadium",
    championships: 1,
    players: []
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    logo: "/team-logos/pbks.png",
    primaryColor: "#ED1B24",
    secondaryColor: "#A7A9AC",
    captain: "Shikhar Dhawan",
    homeGround: "IS Bindra Stadium",
    championships: 0,
    players: []
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    logo: "/team-logos/gt.png",
    primaryColor: "#1D428A",
    secondaryColor: "#B0C4DE",
    captain: "Shubman Gill",
    homeGround: "Narendra Modi Stadium",
    championships: 1,
    players: []
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    logo: "/team-logos/lsg.png",
    primaryColor: "#A72056",
    secondaryColor: "#FFCC00",
    captain: "KL Rahul",
    homeGround: "BRSABV Ekana Cricket Stadium",
    championships: 0,
    players: []
  }
];

export const players: Player[] = [
  {
    id: "p1",
    name: "MS Dhoni",
    image: "/player-images/ms-dhoni.png",
    teamId: "csk",
    role: PlayerRole.WICKET_KEEPER,
    battingStyle: "Right Handed",
    bowlingStyle: "Right-arm medium",
    nationality: "Indian",
    age: 42,
    stats: {
      matches: 250,
      runs: 5082,
      highestScore: 84,
      average: 38.79,
      strikeRate: 135.76,
      fifties: 24,
      hundreds: 0,
      wickets: 0,
      bestBowling: "-",
      economyRate: 0
    }
  },
  {
    id: "p2",
    name: "Virat Kohli",
    image: "/player-images/virat-kohli.png",
    teamId: "rcb",
    role: PlayerRole.BATSMAN,
    battingStyle: "Right Handed",
    bowlingStyle: "Right-arm medium",
    nationality: "Indian",
    age: 35,
    stats: {
      matches: 237,
      runs: 7263,
      highestScore: 113,
      average: 37.24,
      strikeRate: 130.02,
      fifties: 50,
      hundreds: 7,
      wickets: 4,
      bestBowling: "2/25",
      economyRate: 8.83
    }
  },
  {
    id: "p3",
    name: "Rohit Sharma",
    image: "/player-images/rohit-sharma.png",
    teamId: "mi",
    role: PlayerRole.BATSMAN,
    battingStyle: "Right Handed",
    bowlingStyle: "Right-arm off break",
    nationality: "Indian",
    age: 36,
    stats: {
      matches: 243,
      runs: 6211,
      highestScore: 109,
      average: 29.58,
      strikeRate: 130.04,
      fifties: 42,
      hundreds: 1,
      wickets: 15,
      bestBowling: "2/6",
      economyRate: 8.99
    }
  },
  {
    id: "p4",
    name: "Jasprit Bumrah",
    image: "/player-images/jasprit-bumrah.png",
    teamId: "mi",
    role: PlayerRole.BOWLER,
    battingStyle: "Right Handed",
    bowlingStyle: "Right-arm fast",
    nationality: "Indian",
    age: 30,
    stats: {
      matches: 120,
      runs: 56,
      highestScore: 16,
      average: 5.6,
      strikeRate: 85.0,
      fifties: 0,
      hundreds: 0,
      wickets: 145,
      bestBowling: "5/10",
      economyRate: 7.39
    }
  },
  {
    id: "p5",
    name: "Ravindra Jadeja",
    image: "/player-images/ravindra-jadeja.png",
    teamId: "csk",
    role: PlayerRole.ALL_ROUNDER,
    battingStyle: "Left Handed",
    bowlingStyle: "Left-arm orthodox",
    nationality: "Indian",
    age: 35,
    stats: {
      matches: 226,
      runs: 2692,
      highestScore: 62,
      average: 26.92,
      strikeRate: 135.77,
      fifties: 3,
      hundreds: 0,
      wickets: 152,
      bestBowling: "5/16",
      economyRate: 7.61
    }
  }
];

// Add players to their respective teams
teams.forEach(team => {
  team.players = players.filter(player => player.teamId === team.id);
});

export const matches: Match[] = [
  {
    id: "m1",
    team1: "csk",
    team2: "mi",
    date: "2025-04-07T19:30:00",
    venue: "M. A. Chidambaram Stadium, Chennai",
    status: MatchStatus.UPCOMING
  },
  {
    id: "m2",
    team1: "rcb",
    team2: "kkr",
    date: "2025-04-08T19:30:00",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    status: MatchStatus.UPCOMING
  },
  {
    id: "m3",
    team1: "rr",
    team2: "dc",
    date: "2025-04-09T19:30:00",
    venue: "Sawai Mansingh Stadium, Jaipur",
    status: MatchStatus.UPCOMING
  },
  {
    id: "m4",
    team1: "srh",
    team2: "pbks",
    date: "2025-04-10T19:30:00",
    venue: "Rajiv Gandhi Intl. Cricket Stadium, Hyderabad",
    status: MatchStatus.UPCOMING
  },
  {
    id: "m5",
    team1: "gt",
    team2: "lsg",
    date: "2025-04-11T19:30:00",
    venue: "Narendra Modi Stadium, Ahmedabad",
    status: MatchStatus.UPCOMING
  },
  {
    id: "m6",
    team1: "csk",
    team2: "rcb",
    date: "2025-04-03T19:30:00",
    venue: "M. A. Chidambaram Stadium, Chennai",
    status: MatchStatus.COMPLETED,
    result: "Chennai Super Kings won by 5 wickets",
    scorecard: {
      innings: [
        {
          battingTeam: "rcb",
          runs: 156,
          wickets: 9,
          overs: 20,
          battingScores: [
            {
              playerId: "p2", // Virat Kohli
              runs: 65,
              balls: 48,
              fours: 6,
              sixes: 2,
              strikeRate: 135.42,
              dismissal: "c Dhoni b Jadeja"
            }
          ],
          bowlingFigures: [
            {
              playerId: "p5", // Ravindra Jadeja
              overs: 4,
              maidens: 0,
              runs: 28,
              wickets: 3,
              economy: 7.0
            }
          ]
        },
        {
          battingTeam: "csk",
          runs: 157,
          wickets: 5,
          overs: 18.4,
          battingScores: [
            {
              playerId: "p1", // MS Dhoni
              runs: 32,
              balls: 17,
              fours: 2,
              sixes: 3,
              strikeRate: 188.24,
              dismissal: "not out"
            }
          ],
          bowlingFigures: []
        }
      ]
    }
  },
  {
    id: "m7",
    team1: "mi",
    team2: "dc",
    date: "2025-04-04T19:30:00",
    venue: "Wankhede Stadium, Mumbai",
    status: MatchStatus.COMPLETED,
    result: "Mumbai Indians won by 7 wickets",
    scorecard: {
      innings: [
        {
          battingTeam: "dc",
          runs: 162,
          wickets: 8,
          overs: 20,
          battingScores: [],
          bowlingFigures: [
            {
              playerId: "p4", // Jasprit Bumrah
              overs: 4,
              maidens: 0,
              runs: 23,
              wickets: 3,
              economy: 5.75
            }
          ]
        },
        {
          battingTeam: "mi",
          runs: 165,
          wickets: 3,
          overs: 18.2,
          battingScores: [
            {
              playerId: "p3", // Rohit Sharma
              runs: 78,
              balls: 47,
              fours: 8,
              sixes: 3,
              strikeRate: 165.96,
              dismissal: "c Pant b Axar"
            }
          ],
          bowlingFigures: []
        }
      ]
    }
  },
  {
    id: "m8",
    team1: "srh",
    team2: "csk",
    date: "2025-04-05T15:30:00",
    venue: "Rajiv Gandhi Intl. Cricket Stadium, Hyderabad",
    status: MatchStatus.LIVE,
    scorecard: {
      innings: [
        {
          battingTeam: "csk",
          runs: 193,
          wickets: 6,
          overs: 20,
          battingScores: [
            {
              playerId: "p1", // MS Dhoni
              runs: 47,
              balls: 21,
              fours: 3,
              sixes: 5,
              strikeRate: 223.81,
              dismissal: "c Abbott b Natarajan"
            }
          ],
          bowlingFigures: []
        },
        {
          battingTeam: "srh",
          runs: 126,
          wickets: 3,
          overs: 14.2,
          battingScores: [],
          bowlingFigures: [
            {
              playerId: "p5", // Ravindra Jadeja
              overs: 3,
              maidens: 0,
              runs: 26,
              wickets: 2,
              economy: 8.67
            }
          ]
        }
      ]
    }
  }
];

export const pointsTable: PointsTableEntry[] = [
  {
    teamId: "csk",
    played: 2,
    won: 1,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: 0.800
  },
  {
    teamId: "mi",
    played: 1,
    won: 1,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: 0.745
  },
  {
    teamId: "rr",
    played: 1,
    won: 1,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: 0.700
  },
  {
    teamId: "gt",
    played: 1,
    won: 1,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: 0.500
  },
  {
    teamId: "kkr",
    played: 1,
    won: 1,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: 0.325
  },
  {
    teamId: "pbks",
    played: 1,
    won: 0,
    lost: 1,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: -0.325
  },
  {
    teamId: "lsg",
    played: 1,
    won: 0,
    lost: 1,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: -0.500
  },
  {
    teamId: "dc",
    played: 1,
    won: 0,
    lost: 1,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: -0.745
  },
  {
    teamId: "rcb",
    played: 1,
    won: 0,
    lost: 1,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: -0.750
  },
  {
    teamId: "srh",
    played: 0,
    won: 0,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: 0.000
  }
];
