import { Session } from "next-auth";

type IFooterProps = {
  session?: Session;
};

export function Footer(props: IFooterProps) {
  const { session } = props;
  const role = session?.user?.role?.toLowerCase() as "user" | "admin";
  return (
    <div className="fixed bottom-0 flex flex-col w-full p-4 text-center bg-primary bg-zinc-800 justify-end text-secondary md:flex-row">
      <p className="pr-2">@2024 Copyright: Kryptodian Portfolio</p>
    </div>
  );
}
