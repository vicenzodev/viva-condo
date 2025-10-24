"use client";

import Link from "next/link";
import { IoWalk } from "react-icons/io5";

export default function Header() {
  return (
    <aside className="bg-gray-900 text-white shadow-md h-screen fixed">
      <div className="max-w-6x1 mx-auto px-4 py-4 justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Site de condomínios</Link>
        </div>

        <nav className="space-x-6 flex flex-col py-5">
          <Link href="/" className="hover:text-gray-300 transition py-2">
            Início
          </Link>
          <Link href="/condominios" className="hover:text-gray-300 transition py-2">
            Condomínios
          </Link>
          <Link href="/moradores" className="hover:text-gray-300 transition py-2">
            Moradores
          </Link>
          <Link href="/usuarios" className="hover:text-gray-300 transition py-2">
            Usuarios
          </Link>
          <Link href="/usuarios" className="hover:text-gray-300 transition py-2">
            Sair <IoWalk className="inline-block text-xl"/>
          </Link>
        </nav>
      </div>
    </aside>
  );
}