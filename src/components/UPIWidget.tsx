import { useState } from "react";
import { X, CreditCard } from "lucide-react";

const UPIWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Payment Gateway"
      >
        <CreditCard className="w-6 h-6" />
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[400px] max-w-[90vw] bg-card border border-border rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted rounded-t-xl">
            <h3 className="text-sm font-semibold text-card-foreground">Payment Gateway</h3>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-card-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            <h4 className="text-xl font-bold text-card-foreground text-center mb-4">Pay with UPI</h4>

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=muhammed.39@superyes%26pn=Muhammed%20Adnan%26am=99%26cu=INR"
              alt="UPI QR Code"
              className="w-48 h-48 mx-auto rounded-lg border-2 border-border mb-3"
            />
            <p className="text-center text-xs text-muted-foreground mb-4">Scan with any UPI app</p>

            <div className="space-y-1 mb-4 text-sm text-card-foreground">
              <p><span className="text-muted-foreground">UPI ID:</span> muhammed.39@superyes</p>
              <p><span className="text-muted-foreground">Payee:</span> Muhammed Adnan</p>
              <p><span className="text-muted-foreground">Amount:</span> ₹99</p>
            </div>

            <a
              href="upi://pay?pa=muhammed.39@superyes&pn=Muhammed%20Adnan&am=99&cu=INR"
              className="block w-full py-3.5 rounded-xl bg-accent text-accent-foreground text-center font-semibold hover:opacity-90 transition-opacity"
            >
              💳 Pay ₹99 via UPI
            </a>

            <p className="text-[11px] text-muted-foreground text-center mt-3 leading-relaxed">
              Supports PhonePe, Google Pay, Paytm, BHIM & all UPI apps<br />
              Secure payment powered by UPI
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
