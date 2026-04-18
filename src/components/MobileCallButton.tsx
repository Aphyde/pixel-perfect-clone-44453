import { Phone } from "lucide-react";

const PHONE_DISPLAY = "0173 530 358 1";
const PHONE_HREF = "tel:+4917353035881";

const MobileCallButton = () => (
  <a
    href={PHONE_HREF}
    aria-label={`Anrufen: ${PHONE_DISPLAY}`}
    className="md:hidden fixed bottom-5 right-5 z-[55] inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-primary-container active:scale-95 transition-all"
  >
    <Phone className="w-5 h-5" />
  </a>
);

export default MobileCallButton;
