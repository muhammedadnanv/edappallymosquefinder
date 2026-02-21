import { useState } from "react";
import { Heart, CreditCard } from "lucide-react";
import WhatsAppChannel from "@/components/WhatsAppChannel";

const UPI_ID = "muhammed.39@superyes";
const PAYEE = "Muhammed Adnan";
const amounts = [99, 199, 499, 999, 1999];

const getQRUrl = (amount: number) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}%26pn=${encodeURIComponent(PAYEE)}%26am=${amount}%26cu=INR`;

const getPayLink = (amount: number) =>
  `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE)}&am=${amount}&cu=INR`;

const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(199);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-mosque overflow-hidden">
        {/* Header */}
        <div className="gradient-hero px-6 py-5 text-center">
          <Heart className="w-8 h-8 text-white/90 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-primary-foreground">Support My Work</h2>
          <p className="text-sm text-primary-foreground/80 mt-1 max-w-md mx-auto leading-relaxed">
            I'm <strong>Muhammed Adnan VV</strong>, a freelance website designer & developer based in Edappally, Kochi. Your generous contribution helps me keep building useful platforms like this! 🙏
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* QR Code */}
            <div className="flex-shrink-0 text-center">
              <img
                src={getQRUrl(selectedAmount)}
                alt="UPI QR Code"
                className="w-48 h-48 rounded-xl border-2 border-border mx-auto"
              />
              <p className="text-xs text-muted-foreground mt-2">Scan with any UPI app</p>
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <p className="text-sm font-medium text-card-foreground mb-3">Choose an amount:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                      selectedAmount === amt && !customAmount
                        ? "bg-primary text-primary-foreground border-primary scale-105"
                        : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-1 block">Or enter custom amount:</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-card-foreground">₹</span>
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomAmount(val);
                      const num = parseInt(val, 10);
                      if (num > 0) setSelectedAmount(num);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-border bg-background text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-card-foreground mb-4 bg-muted/50 rounded-lg p-3">
                <p><span className="text-muted-foreground">UPI ID:</span> <span className="font-mono font-medium">{UPI_ID}</span></p>
                <p><span className="text-muted-foreground">Payee:</span> {PAYEE}</p>
                <p><span className="text-muted-foreground">Amount:</span> <span className="font-bold text-primary">₹{selectedAmount}</span></p>
              </div>

              <a
                href={getPayLink(selectedAmount)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <CreditCard className="w-4 h-4" />
                Pay ₹{selectedAmount} via UPI
              </a>

              <p className="text-[11px] text-muted-foreground text-center mt-3">
                PhonePe · Google Pay · Paytm · BHIM & all UPI apps
              </p>

              <div className="mt-3">
                <WhatsAppChannel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCard;
