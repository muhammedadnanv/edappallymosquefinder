import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Send, Locate } from "lucide-react";
import { useEffect } from "react";

const FACILITIES_OPTIONS = ["Parking", "Wudu Area", "AC Hall", "Madrasa", "Library", "Community Hall"];

const SubmitMosque = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    name_ml: "",
    address: "",
    lat: "",
    lng: "",
    phone: "",
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
    juma: "",
    facilities: [] as string[],
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to submit a mosque");
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFacility = (f: string) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(f)
        ? prev.facilities.filter((x) => x !== f)
        : [...prev.facilities, f],
    }));
  };

  const autoLocate = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    toast.loading("Getting location...", { id: "geo" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        }));
        toast.success("Location captured!", { id: "geo" });
      },
      () => toast.error("Unable to get location", { id: "geo" })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("submitted_mosques").insert({
        user_id: user.id,
        name: form.name,
        name_ml: form.name_ml,
        address: form.address,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        phone: form.phone || null,
        fajr: form.fajr,
        dhuhr: form.dhuhr,
        asr: form.asr,
        maghrib: form.maghrib,
        isha: form.isha,
        juma: form.juma,
        facilities: form.facilities,
      });

      if (error) throw error;
      toast.success("Mosque submitted for review! 🕌");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="gradient-hero py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">Submit a Mosque</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl shadow-mosque p-6 space-y-5">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Mosque Name (English) *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Al-Huda Masjid"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Mosque Name (മലയാളം)</label>
              <input
                type="text"
                value={form.name_ml}
                onChange={(e) => handleChange("name_ml", e.target.value)}
                placeholder="e.g. അൽ-ഹുദാ മസ്ജിദ്"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Address *</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Full address"
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted-foreground">Location *</label>
              <button
                type="button"
                onClick={autoLocate}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
              >
                <Locate className="w-3 h-3" />
                Auto-detect
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  step="any"
                  required
                  value={form.lat}
                  onChange={(e) => handleChange("lat", e.target.value)}
                  placeholder="Latitude"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  step="any"
                  required
                  value={form.lng}
                  onChange={(e) => handleChange("lng", e.target.value)}
                  placeholder="Longitude"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone (optional)</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 484 XXXXXXX"
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Prayer Times */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Prayer Times *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(["fajr", "dhuhr", "asr", "maghrib", "isha", "juma"] as const).map((prayer) => (
                <div key={prayer}>
                  <label className="text-[10px] uppercase font-semibold text-muted-foreground mb-0.5 block">
                    {prayer}
                  </label>
                  <input
                    type="text"
                    required
                    value={form[prayer]}
                    onChange={(e) => handleChange(prayer, e.target.value)}
                    placeholder="e.g. 5:15 AM"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Facilities</label>
            <div className="flex flex-wrap gap-2">
              {FACILITIES_OPTIONS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFacility(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    form.facilities.includes(f)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
          >
            <Send className="w-4 h-4" />
            {loading ? "Submitting..." : "Submit Mosque for Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitMosque;
