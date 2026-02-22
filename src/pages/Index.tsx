import { useState, useCallback, useEffect } from "react";
import RamadanBanner from "@/components/RamadanBanner";
import HeroSection from "@/components/HeroSection";
import PrayerTimesBar from "@/components/PrayerTimesBar";
import MosqueCard from "@/components/MosqueCard";
import Footer from "@/components/Footer";
import UPIWidget from "@/components/UPIWidget";
import DonationCard from "@/components/DonationCard";
import WhatsAppSection from "@/components/WhatsAppSection";
import AuthModal from "@/components/AuthModal";
import AddMosqueForm from "@/components/AddMosqueForm";
import { mosques, calculateDistance, Mosque } from "@/data/mosques";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, LogIn, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedMosques, setSortedMosques] = useState<Mosque[]>(mosques);
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [addMosqueOpen, setAddMosqueOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.loading("Getting your location...", { id: "locate" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const withDistance = mosques.map((m) => ({
          ...m,
          distance: calculateDistance(latitude, longitude, m.lat, m.lng),
        }));
        withDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
        setSortedMosques(withDistance);
        toast.success("Sorted by distance from you!", { id: "locate" });
      },
      () => {
        toast.error("Unable to get your location", { id: "locate" });
      }
    );
  }, []);

  const filtered = sortedMosques.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nameML.includes(searchQuery) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMosque = () => {
    if (!user) {
      setAuthOpen(true);
      toast.info("Please sign in to add a mosque");
    } else {
      setAddMosqueOpen(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RamadanBanner />
      <HeroSection onSearch={handleSearch} onLocateMe={handleLocateMe} searchQuery={searchQuery} />
      <PrayerTimesBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            🕌 Mosques Near You
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{filtered.length} found</span>
            <button
              onClick={handleAddMosque}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Mosque
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No mosques found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((mosque) => (
              <MosqueCard key={mosque.id} mosque={mosque} />
            ))}
          </div>
        )}
      </main>
      <WhatsAppSection />
      <DonationCard />
      <Footer />
      <UPIWidget />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      {user && <AddMosqueForm open={addMosqueOpen} onClose={() => setAddMosqueOpen(false)} userId={user.id} />}
    </div>
  );
};

export default Index;
