
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Trophy, Award, BarChart2, Settings } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Matches', path: '/matches', icon: Calendar },
    { name: 'Teams', path: '/teams', icon: Users },
    { name: 'Players', path: '/players', icon: Award },
    { name: 'Points Table', path: '/points-table', icon: Trophy },
    { name: 'Stats', path: '/stats', icon: BarChart2 },
    { name: 'Admin', path: '/admin', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground shadow-lg">
        <div className="p-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cricket-blue rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">CricketVerse</span>
          </Link>
        </div>
        <nav className="mt-5">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-5 py-3 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    isActive(item.path) 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-cricket-blue' 
                      : ''
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
