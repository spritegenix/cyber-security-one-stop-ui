import Preloader, { Preloader2 } from "@/components/elements/Preloader";

export default function loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-5">
      <Preloader2 />
      <Preloader />
    </div>
  );
}
