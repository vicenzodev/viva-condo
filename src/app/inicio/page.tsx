"use client";

import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaComputer } from "react-icons/fa6";
import { IoWalk } from "react-icons/io5";
import { createClient } from "@/utils/supabase/client";

export default function InicioPage() {
const logOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white transition-colors">

      <div className=" flex justify-center px-6 py-10">

        <div className="w-full max-w-4xl">

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-300 dark:border-gray-700 transition-colors mb-10 text-center">
            <h2 className="text-xl font-semibold mb-4"><br />Bem-vindo ao Viva Condo! 😀</h2>

            <p className="text-gray-400 dark:text-gray-400 leading-relaxed mb-8">
                Esperamos que o sistema seja de bom proveito e atenda suas espectativas! <br /> <br />
              Utilize os botões abaixo para navegar entre as tabelas do sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

            {/* Condomínios */}
            <Link
              href="/condominios"
              className="
                bg-white dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition duration-150 
                py-9 px-6 rounded-xl flex items-center justify-center gap-3
              "
            >
              <BiHome className="text-2xl text-purple-600 dark:text-purple-300" />
              <span className="text-lg">Condomínios</span>
            </Link>

            {/* Moradores */}
            <Link
              href="/moradores"
              className="
                bg-white dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition duration-150 
                py-9 px-6 rounded-xl flex items-center justify-center gap-3
              "
            >
              <AiOutlineTeam className="text-2xl text-purple-600 dark:text-purple-300" />
              <span className="text-lg">Moradores</span>
            </Link>

            {/* Usuários */}
            <Link
              href="/usuarios"
              className="
                bg-white dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition duration-150 
                py-9 px-6 rounded-xl flex items-center justify-center gap-3
              "
            >
              <FaComputer className="text-2xl text-purple-600 dark:text-purple-300" />
              <span className="text-lg">Usuários</span>
            </Link>


            {/* Sair*/}
            <button
              onClick={logOut}
              className="
                bg-white dark:bg-gray-900
                border border-gray-300 dark:border-gray-700
                hover:bg-gray-200 dark:hover:bg-red-500
                transition duration-150
                py-9 px-6 rounded-xl flex items-center justify-center gap-3
              "
            >
              <IoWalk className="text-2xl text-purple-600 dark:text-purple-300" />
              <span className="text-lg">Sair</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
