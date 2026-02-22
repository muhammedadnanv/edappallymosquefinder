import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X, MapPin } from "lucide-react";
import { z } from "zod";

const mosqueSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  name_ml: z.string().max(200).default(""),
  address: z.string().trim().min(5, "Address required").max(300),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  phone: z.string().max(20).optional(),
  fajr: z.string().min(1, "Required"),
  dhuhr: z.string().min(1, "Required"),
  asr: z.string().min(1, "Required"),
  maghrib: z.string().min(1, "Required"),
  isha: z.string().min(1, "Required"),
  juma: z.string().min(1, "Required"),
  facilities: z.array(z.string()).default([]),
});

interface AddMosqueFormProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const facilityOptions = ["Parking", "Wudu Area", "AC Hall", "Library", "Madrasa", "Community Hall"];

const AddMosqueForm = ({ open, onClose, userId }: AddMosqueFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", name_ml: "", address: "", lat: "", lng: "", phone: "",
    fajr: "", dhuhr: "", asr: "", maghrib: "", isha: "", juma: "",
    facilities: [] as string[],
  });

  if (!open) return null;

  const handleAutoLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({ ...f, lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) }));
        toast.success("Location set!");
      },
      () => toast.error("Unable to get location")
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

    const parsed = mosqueSchema.safeParse({
      ...form,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
    });

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Invalid input");
      setLoading(false);
      return;
    }

    const data = parsed.data;
    const { error } = await supabase.from("submitted_mosques").insert([{
      user_id: userId,
      name: data.name,
      name_ml: data.name_ml,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      phone: data.phone || null,
      fajr: data.fajr,
      dhuhr: data.dhuhr,
      asr: data.asr,
      maghrib: data.maghrib,
      isha: data.isha,
      juma: data.juma,
      facilities: data.facilities,
    }]);

    if (error) toast.error(error.message);
    else {
      toast.success("Mosque submitted for review! 🕌");
      onClose();
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl shadow-mosque w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-1">🕌 Add a Mosque</h2>
        <p className="text-sm text-muted-foreground mb-5">Submit a mosque to be added after review.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Mosque Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className={inputClass} placeholder="Name in Malayalam" value={form.name_ml} onChange={(e) => setForm({ ...form, name_ml: e.target.value })} />
          </div>
          <input className={inputClass} placeholder="Full Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <button type="button" onClick={handleAutoLocation} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Use my location
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} placeholder="Latitude *" type="number" step="any" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} required />
              <input className={inputClass} placeholder="Longitude *" type="number" step="any" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} required />
            </div>
          </div>

          <input className={inputClass} placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Prayer Times *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(["fajr", "dhuhr", "asr", "maghrib", "isha", "juma"] as const).map((t) => (
                <div key={t}>
                  <label className="text-[11px] text-muted-foreground capitalize">{t}</label>
                  <input className={inputClass} placeholder="e.g. 5:15 AM" value={form[t]} onChange={(e) => setForm({ ...form, [t]: e.target.value })} required />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Facilities</label>
            <div className="flex flex-wrap gap-2">
              {facilityOptions.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFacility(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
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

          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Mosque for Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMosqueForm;
