import { useState, useEffect } from "react";
import { MessageCircle, Users } from "lucide-react";

const WhatsAppSection = () => {
  const [count, setCount] = useState(0);
  const targetCount = 1200;

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * targetCount));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("whatsapp-section");
    if (el) observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="whatsapp-section" className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-[hsl(142,70%,96%)] dark:bg-[hsl(142,30%,12%)] border border-[hsl(142,40%,80%)] dark:border-[hsl(142,30%,25%)] rounded-2xl shadow-mosque overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-6">
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(142,70%,40%)]/10 border border-[hsl(142,70%,40%)]/30">
              <Users className="w-3 h-3 text-[hsl(142,70%,35%)]" />
              <span className="text-xs font-bold text-[hsl(142,70%,30%)] dark:text-[hsl(142,70%,60%)] tabular-nums">
                {count.toLocaleString()}+ members
              </span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-foreground mb-1">
              📢 Join Our WhatsApp Channel
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Stay updated with prayer times, mosque events, and community announcements.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VbBpLYS5fM5hDqHasE26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[hsl(142,70%,40%)] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              <Users className="w-4 h-4" />
              Follow Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
