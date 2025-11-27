"use client";

import Link from "next/link";
import { IoWalk } from "react-icons/io5";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaComputer } from "react-icons/fa6";


import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const baseLinkClass = "transition duration-150 py-2 px-3 rounded-md flex items-center gap-2";
  const activeLinkClass = "text-purple-400 font-bold";
  const inactiveLinkClass = "hover:text-gray-300 hover:bg-gray-700";

  const logOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) window.location.href = "/";
  };

  return (
    <aside className="bg-gray-900 text-white shadow-md h-screen fixed">
      <div className="max-w-6x1 mx-auto px-4 py-4 justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Viva Condo</Link>
        </div>

        <nav className="space-x-6 flex flex-col py-5">

          <Link
            href="/inicio"
            className={`${baseLinkClass} ${
              pathname === "/inicio" ? activeLinkClass : inactiveLinkClass
            }`}
          >
            <AiOutlineAppstore className="text-xl" />
            Início
          </Link>

          <Link
            href="/condominios"
            className={`${baseLinkClass} ${
              pathname === "/condominios" ? activeLinkClass : inactiveLinkClass
            }`}
          >
            <BiHome className="text-xl" />
            Condomínios
          </Link>

          <Link
            href="/moradores"
            className={`${baseLinkClass} ${
              pathname === "/moradores" ? activeLinkClass : inactiveLinkClass
            }`}
          >
            <AiOutlineTeam className="text-xl" />
            Moradores
          </Link>

          <Link
            href="/usuarios"
            className={`${baseLinkClass} ${
              pathname === "/usuarios" ? activeLinkClass : inactiveLinkClass
            }`}
>
            <FaComputer className="text-xl" />
            Usuários
          </Link>


          <button
            onClick={logOut}
            className="
            mt-10 border-2 rounded-xl cursor-pointer flex items-center gap-2 py-2 px-3
            hover:text-black-600 hover:bg-red-400
            "
          >
            Sair
            <IoWalk className="text-xl" />
          </button>

        </nav>
      </div>
    </aside>
  );
}
