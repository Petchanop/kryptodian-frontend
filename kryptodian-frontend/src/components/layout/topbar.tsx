"use client";

import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import KryptodianIcon from "../../../public/Logo-white.svg";

type ITopBarProps = {
  session?: Session;
};

export function TopBar(props: ITopBarProps) {
  const { session } = props;
  const role = session?.user?.role?.toUpperCase() as "U" | "A";
  if (role) {
    return <></>
  }
  return (
    <div className="flex justify-between px-2 py-4 bg-primary">
      <Link
        href="/"
        className="flex text-[25px] items-baseline text-secondary"
        prefetch={false}
      >
          <Image src={KryptodianIcon} alt="" width={300} height={50} />
      </Link>
    </div>
  );
}
