import { Mosque } from "@/data/mosques";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

interface MosqueCardProps {
  mosque: Mosque;
}

const MosqueCard = ({ mosque }: MosqueCardProps) => {
  const openInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${mosque.lat},${mosque.lng}`, "_blank");
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-mosque hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-card-foreground">{mosque.nameML}</h3>
          <p className="text-sm text-muted-foreground">{mosque.name}</p>
        </div>
        {mosque.distance !== undefined && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground whitespace-nowrap">
            {mosque.distance < 1 ? `${(mosque.distance * 1000).toFixed(0)}m` : `${mosque.distance.toFixed(1)}km`}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <MapPin className="w-4 h-4 shrink-0 text-primary" />
        <span>{mosque.address}</span>
      </div>

      {mosque.phone && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Phone className="w-4 h-4 shrink-0 text-primary" />
          <a href={`tel:${mosque.phone}`} className="hover:text-primary transition-colors">{mosque.phone}</a>
        </div>
      )}

      {/* Prayer Times */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gold" />
          <span className="text-sm font-semibold text-card-foreground">Prayer Times</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(mosque.prayerTimes).filter(([k]) => k !== 'juma').map(([key, time]) => (
            <div key={key} className="text-center bg-muted rounded-lg py-1.5 px-2">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">{key}</p>
              <p className="text-xs font-bold text-card-foreground">{time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {mosque.facilities.map((f) => (
          <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {f}
          </span>
        ))}
      </div>

      <button
        onClick={openInMaps}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm"
      >
        <Navigation className="w-4 h-4" />
        Get Directions
      </button>
    </div>
  );
};

export default MosqueCard;
