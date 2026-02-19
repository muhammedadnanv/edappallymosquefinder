import { Sun, Sunrise, Sunset, Moon, CloudSun } from "lucide-react";

const prayers = [
  { name: "Fajr", nameML: "ഫജ്ർ", time: "5:15 AM", icon: Sunrise },
  { name: "Dhuhr", nameML: "ളുഹ്ർ", time: "12:30 PM", icon: Sun },
  { name: "Asr", nameML: "അസ്ർ", time: "3:45 PM", icon: CloudSun },
  { name: "Maghrib", nameML: "മഗ്‌രിബ്", time: "6:30 PM", icon: Sunset },
  { name: "Isha", nameML: "ഇശാ", time: "7:45 PM", icon: Moon },
];

const PrayerTimesBar = () => {
  return (
    <section className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-center text-sm font-semibold text-muted-foreground mb-3">
          🕌 Today's Prayer Times — Edappally
        </h2>
        <div className="flex justify-center gap-3 md:gap-6 overflow-x-auto pb-1">
          {prayers.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="flex flex-col items-center min-w-[60px]">
                <Icon className="w-5 h-5 text-gold mb-1" />
                <span className="text-xs font-bold text-card-foreground">{p.nameML}</span>
                <span className="text-[11px] text-muted-foreground">{p.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimesBar;
