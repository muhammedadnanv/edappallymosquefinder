import { useState, useEffect, useRef } from "react";
import { MessageCircle, Users } from "lucide-react";

const WhatsAppSection = () => {
  const [count, setCount] = useState(0);
  const targetCount = 1200;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    let startTime: number;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-whatsapp/5 border border-whatsapp/20 rounded-2xl shadow-mosque overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-6">
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-whatsapp flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-whatsapp-foreground" />
            </div>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-whatsapp/10 border border-whatsapp/30">
              <Users className="w-3 h-3 text-whatsapp" />
              <span className="text-xs font-bold text-whatsapp tabular-nums">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-whatsapp text-whatsapp-foreground font-semibold hover:opacity-90 transition-opacity text-sm"
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
