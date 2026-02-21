import { MessageCircle, Users } from "lucide-react";

const WhatsAppSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-[hsl(142,70%,96%)] dark:bg-[hsl(142,30%,12%)] border border-[hsl(142,40%,80%)] dark:border-[hsl(142,30%,25%)] rounded-2xl shadow-mosque overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-foreground mb-1">
              📢 Join Our WhatsApp Channel
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Stay updated with prayer times, mosque events, and community announcements in Edappally.
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
