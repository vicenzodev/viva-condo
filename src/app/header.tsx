"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Nome */}
        <div className="text-xl font-bold">
          <Link href="/">MeuSite</Link>
        </div>

        {/* Navegação */}
        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Início
          </Link>
          <Link href="/condominios" className="hover:text-gray-300 transition">
            Condomínios
          </Link>
          <Link href="/Moradores" className="hover:text-gray-300 transition">
            Moradores
          </Link>
          <Link href="/contato" className="hover:text-gray-300 transition">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}