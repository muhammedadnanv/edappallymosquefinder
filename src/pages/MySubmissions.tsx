import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type SubmittedMosque = Tables<"submitted_mosques">;

const statusConfig = {
  pending: { icon: Clock, label: "Pending Review", className: "text-yellow-600 bg-yellow-100" },
  approved: { icon: CheckCircle, label: "Approved", className: "text-green-600 bg-green-100" },
  rejected: { icon: XCircle, label: "Rejected", className: "text-red-600 bg-red-100" },
};

const MySubmissions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<SubmittedMosque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchSubmissions();
  }, [user]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("submitted_mosques")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load submissions");
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("submitted_mosques").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete submission");
    } else {
      setSubmissions((s) => s.filter((x) => x.id !== id));
      toast.success("Submission deleted");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Submissions</h1>
          <Button onClick={() => navigate("/submit-mosque")}>
            <Plus className="w-4 h-4" /> Submit New
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading...</div>
        ) : submissions.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-muted-foreground mb-4">You haven't submitted any mosques yet.</p>
              <Button onClick={() => navigate("/submit-mosque")}>
                <Plus className="w-4 h-4" /> Submit Your First Mosque
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => {
              const status = statusConfig[s.status as keyof typeof statusConfig] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <Card key={s.id} className="shadow-mosque">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{s.name_ml || s.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{s.name}</p>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">{s.address}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(s.facilities || []).map((f) => (
                        <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">{f}</span>
                      ))}
                    </div>
                    {s.status === "pending" && (
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
