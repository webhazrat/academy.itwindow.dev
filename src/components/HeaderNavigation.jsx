import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Sun, Search, Menu } from 'lucide-react'

export default function HeaderNavigation(){
    return (
        <nav>
            <div className="py-4 flex justify-between items-center text-white">
                <Link href={'/'}>
                    <a> <Image src={'/itwindow-logo.svg'} width={136} height={36} alt="itwindow-logo" />
                    </a>
                </Link>
                <button className="lg:hidden"><Menu size={20} /></button>
                <div className="hidden lg:flex items-center gap-[26px]">
                    <Link href={'/'}>হোম</Link>
                    <Link href={'/'}><a className="flex items-center gap-1">কোর্সসমূহ <ChevronDown size={14} /></a></Link>
                    <Link href={'/'}>রিসোর্সেস</Link>
                    <Link href={'/'}>কেন আমাদের কোর্স</Link>
                    <Link href={'/'}>স্টুডেন্ট ফিডব্যাক</Link>
                    <Link href={'/'}><a><Sun size={16} /></a></Link>
                    <Link href={'/'}><a><Search size={16} /></a></Link>
                    <Link href={'/'}>লগইন</Link>
                </div>
            </div>
        </nav>
    )
}



export const APP_NAME = 'COURSE ITWINDOW'
