"use client";

import Link from "next/link";
import { IoWalk } from "react-icons/io5";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {

  const pathname = usePathname();
  const baseLinkClass = "transition duration-150 py-2 px-3 rounded-md";
  const activeLinkClass = "text-purple-400 font-bold";
  const inactiveLinkClass = "hover:text-gray-300 hover:bg-gray-700";
  
  const logOut = async () =>{
    
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error ) window.location.href = "/";
  }

  return (
    <aside className="bg-gray-900 text-white shadow-md h-screen fixed">
      <div className="max-w-6x1 mx-auto px-4 py-4 justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Viva Condo</Link>
        </div>

        <nav className="space-x-6 flex flex-col py-5"><Link
            href="/"
            className={`${baseLinkClass} ${
              pathname === '/' ? activeLinkClass : inactiveLinkClass
            }`}
          >
            Início
          </Link>

          <Link
            href="/condominios"
            className={`${baseLinkClass} ${
              pathname === '/condominios' ? activeLinkClass : inactiveLinkClass
            }`}
          >
            Condomínios
          </Link>

          <Link
            href="/moradores"
            className={`${baseLinkClass} ${
              pathname === '/moradores' ? activeLinkClass : inactiveLinkClass
            }`}
          >
            Moradores
          </Link>

          <Link
            href="/usuarios"
            className={`${baseLinkClass} ${
              pathname === '/usuarios' ? activeLinkClass : inactiveLinkClass
            }`}
          >
            Usuarios
          </Link>
          <button onClick={logOut} className="mt-10 border-2 rounded-xl cursor-pointer">
            Sair <IoWalk className="inline-block text-xl"></IoWalk>
          </button>
        </nav>
      </div>
    </aside>
  );
}