import { Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/60 text-xs mb-3">
          © {new Date().getFullYear()} ചൊറുള്ള പള്ളി in Edappally. All rights reserved.
        </p>
        <p className="flex items-center justify-center gap-1 text-sm text-primary-foreground/80">
          Developed with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by{" "}
          <a
            href="https://thetechcontractor.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-foreground underline underline-offset-2 hover:text-gold inline-flex items-center gap-1 transition-colors"
          >
            Muhammed Adnan VV <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
