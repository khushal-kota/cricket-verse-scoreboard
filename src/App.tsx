
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import TeamsPage from "./pages/TeamsPage";
import PlayersPage from "./pages/PlayersPage";
import PointsTablePage from "./pages/PointsTablePage";
import AdminDashboard from "./pages/AdminDashboard";
import MatchDetailPage from "./pages/MatchDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/match/:id" element={<MatchDetailPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/points-table" element={<PointsTablePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
