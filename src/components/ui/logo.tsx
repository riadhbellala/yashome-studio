import Image from "next/image";

/** Yashome's own logo, with "studio" set beside it. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image src={light ? "/images/brand/logo-white.svg" : "/images/brand/logo-dark.svg"} alt="Yashome" width={132} height={34} priority className="h-[30px] w-auto" />
      <span className={`rounded-full px-2.5 py-[3px] text-[12px] font-semibold ${light ? "bg-white text-second" : "bg-main text-white"}`}>studio</span>
    </span>
  );
}
