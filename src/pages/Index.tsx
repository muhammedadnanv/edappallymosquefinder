import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import PrayerTimesBar from "@/components/PrayerTimesBar";
import MosqueCard from "@/components/MosqueCard";
import Footer from "@/components/Footer";
import UPIWidget from "@/components/UPIWidget";
import DonationCard from "@/components/DonationCard";
import WhatsAppSection from "@/components/WhatsAppSection";
import { mosques, calculateDistance, Mosque } from "@/data/mosques";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedMosques, setSortedMosques] = useState<Mosque[]>(mosques);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeroSection onSearch={handleSearch} onLocateMe={handleLocateMe} searchQuery={searchQuery} />
      <PrayerTimesBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            🕌 Mosques in Edappally
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} found</span>
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
    </div>
  );
};

export default Index;
