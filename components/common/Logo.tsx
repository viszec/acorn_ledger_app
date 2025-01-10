import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/icons/logo.svg" alt="Acorn Ledger" width={42} height={42} />
      <span className="text-2xl style-script-regular text-purple-700 pt-1 text-gradient tracking-wide">
        Acorn Ledger
      </span>
    </Link>
  );
}