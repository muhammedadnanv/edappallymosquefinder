import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Send } from "lucide-react";

const FACILITIES = ["Parking", "Wudu Area", "AC Hall", "Madrasa", "Library", "Community Hall"];

const SubmitMosque = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    name_ml: "",
    address: "",
    phone: "",
    lat: "",
    lng: "",
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
    juma: "",
    facilities: [] as string[],
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    toast.loading("Getting location...", { id: "loc" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        }));
        toast.success("Location set!", { id: "loc" });
      },
      () => toast.error("Could not get location", { id: "loc" })
    );
  };

  const toggleFacility = (f: string) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(f)
        ? prev.facilities.filter((x) => x !== f)
        : [...prev.facilities, f],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("submitted_mosques").insert({
      name: form.name,
      name_ml: form.name_ml,
      address: form.address,
      phone: form.phone || null,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      fajr: form.fajr,
      dhuhr: form.dhuhr,
      asr: form.asr,
      maghrib: form.maghrib,
      isha: form.isha,
      juma: form.juma,
      facilities: form.facilities,
      user_id: user.id,
    });

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Mosque submitted for review!");
      navigate("/my-submissions");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <Card className="shadow-mosque">
          <CardHeader>
            <CardTitle className="text-2xl">🕌 Submit a Mosque</CardTitle>
            <CardDescription>
              Help us map mosques across Kerala. Your submission will be reviewed before publishing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Mosque Name (English) *</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Noor Masjid" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_ml">Mosque Name (Malayalam)</Label>
                  <Input id="name_ml" value={form.name_ml} onChange={(e) => setForm((f) => ({ ...f, name_ml: e.target.value }))} placeholder="e.g. നൂർ മസ്ജിദ്" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" required value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="Full address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+91 XXX XXXXXXX" />
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Location Coordinates *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAutoLocation}>
                    <MapPin className="w-4 h-4" /> Use My Location
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input required type="number" step="any" placeholder="Latitude" value={form.lat} onChange={(e) => setForm((f) => ({ ...f, lat: e.target.value }))} />
                  <Input required type="number" step="any" placeholder="Longitude" value={form.lng} onChange={(e) => setForm((f) => ({ ...f, lng: e.target.value }))} />
                </div>
              </div>

              {/* Prayer Times */}
              <div>
                <Label className="mb-2 block">Prayer Times *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(["fajr", "dhuhr", "asr", "maghrib", "isha", "juma"] as const).map((prayer) => (
                    <div key={prayer} className="space-y-1">
                      <Label htmlFor={prayer} className="text-xs uppercase text-muted-foreground">{prayer}</Label>
                      <Input id={prayer} required value={form[prayer]} onChange={(e) => setForm((f) => ({ ...f, [prayer]: e.target.value }))} placeholder="e.g. 5:15 AM" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <Label className="mb-2 block">Facilities</Label>
                <div className="flex flex-wrap gap-2">
                  {FACILITIES.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFacility(f)}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        form.facilities.includes(f)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:border-primary"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : <><Send className="w-4 h-4" /> Submit for Review</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitMosque;
