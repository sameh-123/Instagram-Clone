import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderCircle size={48} strokeWidth={2.25} absoluteStrokeWidth className="animate-spin text-igRed"/>
    </div>
  );
}
