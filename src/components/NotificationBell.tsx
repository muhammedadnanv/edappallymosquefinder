import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, BellRing } from "lucide-react";
import { toast } from "sonner";

const MAGHRIB_TIME = "18:30"; // 6:30 PM - update as needed

function getNextMaghrib(): Date {
  const now = new Date();
  const [hours, minutes] = MAGHRIB_TIME.split(":").map(Number);
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

const NotificationBell = () => {
  const [enabled, setEnabled] = useState(() => localStorage.getItem("maghrib-notify") === "true");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNotification = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const ms = getNextMaghrib().getTime() - Date.now();
    timerRef.current = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("🕌 Maghrib Time!", {
          body: "It's time for Maghrib prayer. Find nearby mosques in Edappally.",
          icon: "/favicon.png",
          tag: "maghrib-prayer",
        } as NotificationOptions);
      }
      // Reschedule for next day
      scheduleNotification();
    }, ms);
  }, []);

  useEffect(() => {
    if (enabled && Notification.permission === "granted") {
      scheduleNotification();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, scheduleNotification]);

  const toggle = async () => {
    if (enabled) {
      setEnabled(false);
      localStorage.removeItem("maghrib-notify");
      if (timerRef.current) clearTimeout(timerRef.current);
      toast.success("Notifications disabled");
      return;
    }

    if (!("Notification" in window)) {
      toast.error("Notifications not supported in your browser");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setEnabled(true);
      localStorage.setItem("maghrib-notify", "true");
      scheduleNotification();
      toast.success("🔔 You'll be notified at Maghrib time!");
    } else {
      toast.error("Please allow notifications in your browser settings");
    }
  };

  if (!("Notification" in window)) return null;

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
        enabled
          ? "bg-gold/20 text-gold border border-gold/30"
          : "bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20"
      }`}
      title={enabled ? "Disable Maghrib notifications" : "Get notified at Maghrib time"}
    >
      {enabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
      {enabled ? "Maghrib Alert On" : "Notify at Maghrib"}
    </button>
  );
};

export default NotificationBell;
