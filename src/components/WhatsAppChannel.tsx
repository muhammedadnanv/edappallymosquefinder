import { MessageCircle } from "lucide-react";

interface WhatsAppChannelProps {
  compact?: boolean;
}

const WhatsAppChannel = ({ compact = false }: WhatsAppChannelProps) => {
  return (
    <a
      href="https://whatsapp.com/channel/0029VbBpLYS5fM5hDqHasE26"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 w-full rounded-xl bg-[hsl(142,70%,40%)] text-white font-semibold hover:opacity-90 transition-opacity ${
        compact ? "py-2 text-xs gap-1.5 rounded-lg" : "py-2.5 text-sm"
      }`}
    >
      <MessageCircle className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      Join our WhatsApp Channel
    </a>
  );
};

export default WhatsAppChannel;
