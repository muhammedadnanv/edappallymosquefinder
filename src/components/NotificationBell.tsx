import { useState, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NotificationBell = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already subscribed
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((reg: any) => {
        reg.pushManager.getSubscription().then((sub: any) => {
          setSubscribed(!!sub);
        });
      });
    }
  }, []);

  const subscribe = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      toast.error("Push notifications are not supported in your browser");
      return;
    }

    setLoading(true);

    try {
      // Register service worker
      const registration: any = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      // Get VAPID public key from env
      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        toast.error("Notification service not configured yet");
        setLoading(false);
        return;
      }

      // Convert VAPID key
      const padding = '='.repeat((4 - vapidPublicKey.length % 4) % 4);
      const base64 = (vapidPublicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = atob(base64);
      const applicationServerKey = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; i++) {
        applicationServerKey[i] = rawData.charCodeAt(i);
      }

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      const subJson = subscription.toJSON();

      // Store in database
      const { error } = await supabase.from('push_subscriptions').upsert({
        endpoint: subJson.endpoint!,
        p256dh: subJson.keys!.p256dh!,
        auth: subJson.keys!.auth!,
      }, { onConflict: 'endpoint' });

      if (error) throw error;

      setSubscribed(true);
      toast.success("🔔 You'll be notified at Maghrib time!");
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        toast.error("Please allow notifications in your browser settings");
      } else {
        toast.error("Failed to enable notifications");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const registration: any = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        const endpoint = subscription.endpoint;
        await subscription.unsubscribe();
        await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
      }
      setSubscribed(false);
      toast.success("Notifications disabled");
    } catch {
      toast.error("Failed to disable notifications");
    } finally {
      setLoading(false);
    }
  };

  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null;
  }

  return (
    <button
      onClick={subscribed ? unsubscribe : subscribe}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
        subscribed
          ? "bg-gold/20 text-gold border border-gold/30"
          : "bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20"
      }`}
      title={subscribed ? "Disable Maghrib notifications" : "Get notified at Maghrib time"}
    >
      {subscribed ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
      {loading ? "..." : subscribed ? "Maghrib Alert On" : "Notify at Maghrib"}
    </button>
  );
};

export default NotificationBell;
