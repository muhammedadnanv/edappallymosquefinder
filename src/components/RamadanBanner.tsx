import { Moon, Star } from "lucide-react";

const RamadanBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[hsl(270,60%,20%)] via-[hsl(260,50%,25%)] to-[hsl(217,100%,22%)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Star className="absolute top-2 left-[10%] w-3 h-3 text-gold animate-pulse" />
        <Star className="absolute top-4 left-[30%] w-2 h-2 text-gold animate-pulse delay-300" />
        <Star className="absolute top-1 right-[20%] w-3 h-3 text-gold animate-pulse delay-700" />
        <Star className="absolute top-3 right-[40%] w-2 h-2 text-gold animate-pulse delay-500" />
      </div>
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-center relative z-10">
        <Moon className="w-4 h-4 text-gold" />
        <p className="text-xs sm:text-sm font-semibold text-white/90">
          🌙 Ramadan Mubarak — Find mosques for Taraweeh & Iftar near you
        </p>
        <Moon className="w-4 h-4 text-gold" />
      </div>
    </div>
  );
};

export default RamadanBanner;
