import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import macBookpic from '@/public/MacBook-Air-1.png'

export const poppinsFont = Poppins({
    weight: '600',
    subsets: ['latin'],
});

type IInfoPannelProps = {
    className?: string;
};

export function InfoPanel(props: IInfoPannelProps) {
    const { className } = props;
    const font = `${poppinsFont.className}` + " text-4xl lg:text-7xl text-indigo-600 leading-normal pb-10";
    return (
        <div className={cn("flex flex-col font-semibold text-gray-500", className)}>
            <div className="flex flex-col items-center justify-center p-10 text-center ">
                <div className={font}>
                    CRYPTOCURRENCY PORTFOLIO
                </div>
                <div className="text-xl text-muted-foreground pb-5">
                <p>Track your Crypto portfolio with Kryptodian Portfolio</p>
                </div>
                <Image src={macBookpic} width={639} height={385} alt="" className="p-5" />
            </div>
        </div>
    );
}