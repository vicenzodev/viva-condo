"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Site de condomínios</Link>
        </div>

        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Início
          </Link>
          <Link href="/condominios" className="hover:text-gray-300 transition">
            Condomínios
          </Link>
          <Link href="/moradores" className="hover:text-gray-300 transition">
            Moradores
          </Link>
          <Link href="/usuarios" className="hover:text-gray-300 transition">
            Usuarios
          </Link>
        </nav>
      </div>
    </header>
  );
}