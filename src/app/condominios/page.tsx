"use client";

import { useEffect, useState } from 'react';
import { getCondominios, ICondominio } from '../services/condominio-service';
import Header from "../header"

export default function ListaCondominios() {

    const [condominios, setCondominios] = useState<ICondominio[]>([])
    const [err, setErro] = useState <string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarCondominios = async () => {
            try {
                const response = await fetch("/api/condominios", { cache: "no-store" });
                const {data, success, count, error} = await response.json();
                setCondominios(data);
            } catch (e: any) {
                setErro(e.message ?? "Erro inesperado");
            } finally {
                setLoading(false);
            }
        };
        buscarCondominios()
    }, [])

    return (
        <div className="max-w-full flex"><Header/>

        <div className="tabela">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">#</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nome</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Endereço</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Cidade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">UF</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Tipo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {
                    err ? (
                    <tr>
                        <td className="px-4 py-3 text-am text-gray-700" colSpan={7}>
                            Erro encontrado: {err}
                        </td>
                    </tr>
                    ) :
                    loading ? (
                    <tr>
                        <td className="px-4 py-3 text-am text-gray-700" colSpan={7}>
                            Carregando...
                        </td>
                    </tr>
                    ) :
                    condominios.length === 0? (
                    <tr>
                        <td className="px-4 py-3 text-am text-gray-700" colSpan={7}>
                            Nenhum condominio encontrado.
                        </td>
                    </tr>
                    ) : (
                        condominios.map((condominio, index) => (
                            <tr key={condominio.id} className = "hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{String(index + 1)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.nome} </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.endereco}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.cidade}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.uf}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.tipo}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        </div>
    ) ;
}