"use client";

import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import KryptodianIcon from "@/public/Logo-white.svg";

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
    <div className="grid grid-cols-3 justify-items-center max-[700px]:grid-cols-1  max-[700px]:justify-items-center py-10 bg-primary bg-zinc-800">
      <div className='col-start-1 max-[700px]:col-span-1'>
        <Link
          href="/"
          className="flex px-10 text-[25px] items-baseline text-secondary"
          prefetch={false}
        >
          <Image src={KryptodianIcon} alt="" width={300} height={50} />
        </Link>
      </div>
    </div >
  );
}
