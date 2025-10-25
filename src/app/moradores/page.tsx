"use client";

import Header from "../header";

export default function ListaMoradores() {
    return(
        <div className="max-w-3/4 flex flex-col">
            <Header/>
            <div className="max-width-full">
                <div className="mx-65 my-10 mb-4 flex items-center justify-between gap-4">
                    <h1 className="text-x1 font-semibold text-gray-200 text-3xl">Moradores</h1>
                </div>

                <div className="tabela">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">Nome</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">Contato</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">Condomínio</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">Unidade</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-2 border-gray-300">Ação</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-3 text-sm text-gray-700" colSpan={7}>
                                    Nenhum condominio encontrado.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}