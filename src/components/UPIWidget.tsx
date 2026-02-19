import { useState } from "react";
import { X, CreditCard, Heart } from "lucide-react";

const UPI_ID = "muhammed.39@superyes";
const PAYEE = "Muhammed Adnan";

const amounts = [99, 199, 499, 999, 1999];

const getQRUrl = (amount: number) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(UPI_ID)}%26pn=${encodeURIComponent(PAYEE)}%26am=${amount}%26cu=INR`;

const getPayLink = (amount: number) =>
  `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE)}&am=${amount}&cu=INR`;

const UPIWidget = () => {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(99);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Support Me"
      >
        {open ? <X className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[400px] max-w-[90vw] bg-card border border-border rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted rounded-t-xl">
            <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-destructive" /> Support My Work
            </h3>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-card-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
              I'm a freelance web designer & developer in Edappally, Kochi. Your support helps me keep building! 🙏
            </p>

            {/* Amount selector */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                    selectedAmount === amt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <img
              src={getQRUrl(selectedAmount)}
              alt="UPI QR Code"
              className="w-44 h-44 mx-auto rounded-lg border-2 border-border mb-2"
            />
            <p className="text-center text-xs text-muted-foreground mb-4">Scan with any UPI app</p>

            <div className="space-y-1 mb-4 text-sm text-card-foreground">
              <p><span className="text-muted-foreground">UPI ID:</span> {UPI_ID}</p>
              <p><span className="text-muted-foreground">Payee:</span> {PAYEE}</p>
              <p><span className="text-muted-foreground">Amount:</span> ₹{selectedAmount}</p>
            </div>

            <a
              href={getPayLink(selectedAmount)}
              className="block w-full py-3 rounded-xl bg-accent text-accent-foreground text-center font-semibold hover:opacity-90 transition-opacity"
            >
              💳 Pay ₹{selectedAmount} via UPI
            </a>

            <p className="text-[11px] text-muted-foreground text-center mt-3 leading-relaxed">
              Supports PhonePe, Google Pay, Paytm, BHIM & all UPI apps
            </p>
          </div>

          <div className="border-t border-border px-3 py-2 text-center rounded-b-xl bg-muted">
            <a href="https://widgetify.vercel.app" target="_blank" rel="noopener" className="text-[10px] text-muted-foreground hover:text-card-foreground">
              Powered by Widgetify
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default UPIWidget;
