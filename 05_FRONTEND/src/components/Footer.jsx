import logo from "../assets/netra-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-10 pt-6 pb-8 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="NETRA" className="w-7 h-7 object-contain rounded-md" />
        <div>
          <div className="font-display font-bold text-sm text-leafDeep leading-none">NETRA</div>
          <div className="text-[10.5px] text-inkSoft mt-0.5">Retail Intelligence</div>
        </div>
      </div>
      <div className="text-[11.5px] text-inkSoft">
        Built for SIH · NITW · Soul_Society
      </div>
    </footer>
  );
}
