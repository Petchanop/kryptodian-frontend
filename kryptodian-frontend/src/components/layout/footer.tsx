import { Session } from "next-auth";
import Link from "next/link";

type IFooterProps = {
  session?: Session;
};

export function Footer(props: IFooterProps) {
  const { session } = props;
  const role = session?.user?.role?.toUpperCase() as "U" | "A";
  if (role) {
    return <></>
  }
  return (
    <div className="fixed bottom-0 flex flex-col justify-between w-full p-2 text-center bg-primary text-secondary md:flex-row">
      <div className="hidden space-x-2 md:flex">
        <Link href="/tac" prefetch={false}>
          <p>Term & Condition</p>
        </Link>
        <Link href="/privacy" prefetch={false}>
          <p>Privacy</p>
        </Link>
      </div>
      <p>@2024 Copyright: Kryptodian Wallet</p>
    </div>
  );
}
