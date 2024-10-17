"use client";
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import KryptodianIcon from "@/public/Logo-white.svg";
import { poppinsFont } from '../../main-page/info-panel';
import { Profile } from './profile';
import { create } from 'zustand';

type ITopBarProps = {
  session?: Session;
};

export interface SidebarState {
  isSidebarOpen: boolean;
  setSidebarState: () => void;
  setSidebarClose: (isClose: boolean) => void;
}

export const createSidebarStore = create<SidebarState>()(
  ((set) => ({
    isSidebarOpen: false,
    setSidebarState: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarClose: (isClose: boolean) => set(({ isSidebarOpen: isClose })),
  })),
);

export function TopBar(props: ITopBarProps) {
  const { session } = props;
  const role = session?.user?.role?.toLowerCase() as "user" | "admin";
  var editClass = `${poppinsFont}` + " col-start-3 text-2xl text-gray-100 font-medium"
  if (role) {
    console.log("topbar", role)
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
      <div className={editClass}>
        {role ?
          <>
            <Profile {...session?.user!} />
          </>
          : <></>
        }
      </div>
    </div >
  );
}
