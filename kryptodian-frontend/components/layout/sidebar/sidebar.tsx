"use client";

import { TMeGet } from "@/nextauth";
import { EditProfile, useOutsideClick } from "../topbar/profile";
import { createSidebarStore } from "../topbar/topbar";
import { useEffect, useRef } from 'react';

export function Sidebar(props: TMeGet) {
    const user = props;
    const sidebarStore = createSidebarStore();
    // const ref = useOutsideClick(() => {
    //     console.log('Clicked outside of MyComponent');
    //     sidebarStore.setSidebarClose(false);
    // });
    return (
        <>
            <div>
                {sidebarStore.isSidebarOpen ?
                    <div className="fixed right-0 h-screen w-64 rounded-l-lg bg-primary bg-zinc-500">
                        <div className="">
                            This is sidebar component.
                            <EditProfile id={user.id}/>
                        </div>
                    </div>
                    : <></>
                }
            </div>
        </>
    )
}