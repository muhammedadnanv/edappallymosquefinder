import logo from "@/assets/logo.png";
import { MapPin, Search, LogIn, LogOut, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onLocateMe: () => void;
  searchQuery: string;
}

const HeroSection = ({ onSearch, onLocateMe, searchQuery }: HeroSectionProps) => {
  const { user, signOut } = useAuth();

  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-primary-foreground rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 text-center">
        <img
          src={logo}
          alt="ചൊറുള്ള പള്ളി Logo"
          className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 animate-float rounded-2xl"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">
          ചോറുള്ള പള്ളി
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
          🌙 Find Nearby Mosques Easily — Anywhere this Ramadan
        </p>

        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search mosques..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-card-foreground border border-border shadow-mosque focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={onLocateMe}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity shadow-mosque"
          >
            <MapPin className="w-5 h-5" />
            Near Me
          </button>
          <NotificationBell />
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          {user ? (
            <>
              <Link
                to="/submit-mosque"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-gold-foreground font-semibold hover:opacity-90 transition-opacity text-sm shadow-mosque"
              >
                <Plus className="w-4 h-4" />
                Add Mosque
              </Link>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 font-semibold hover:bg-primary-foreground/20 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-gold-foreground font-semibold hover:opacity-90 transition-opacity text-sm shadow-mosque"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Add Mosque
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
