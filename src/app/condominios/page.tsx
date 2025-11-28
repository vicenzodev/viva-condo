"use client";

import { useEffect, useState } from 'react';
import { ICondominio } from '../../services/condominio-service';
import Header from "../header"
import { FaSearch } from 'react-icons/fa';
import Dropdown from "../../components/dropdown";
import SearchBar from "../header"
import { CondoToast } from '@/components/toast';

export default function ListaCondominios() {

    const [condominios, setCondominios] = useState<ICondominio[]>([])
    const [filteredCondominios,setFilteredCondominios] = useState<ICondominio[]>([]);
    const [error, setErro] = useState <string | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm,setSearchTerm] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastDetails, setToastDetails] = useState({ title: "", description: "", tipo: "sucesso" as "sucesso" | "erro" });


    useEffect(() => {
        const buscarCondominios = async () => {
            try {
                const response = await fetch("/api/condominios", { cache: "no-store" });
                const {data, success} = await response.json();
                if (!data) throw new Error(success ?? "Erro ao buscar condomínios")
                setCondominios(data);
                setFilteredCondominios(data);
            } catch (e: any) {
                setErro(e.message ?? "Erro inesperado");
            } finally {
                setLoading(false);
            }
        };
        buscarCondominios()
    }, []);

    useEffect(()=>{
        const termo = searchTerm.toLowerCase()
        const filtrados = condominios.filter((c) =>
        [
            c.nome,
            c.endereco,
            c.cidade,
            c.uf,
            c.tipo,
            c.id?.toString(),
        ].some((campo) => campo?.toLowerCase().includes(termo))
        )
        setFilteredCondominios(filtrados)
    },[searchTerm,condominios]);

    const excluirCondominio = async (id:number) => {
        try {
            if(id==null) throw new Error("Id não identificado");

            const response = await fetch("/api/condominios?id="+id, 
                {
                    method:"DELETE",
                    cache: "no-store"
                });
            const { success } = await response.json();
            if (response.ok) {
            showToast("Sucesso","Condomínio excluído!");
            setCondominios((prevCondominios) => 
                prevCondominios.filter((condominio) => condominio.id !== id)
            );}
        } catch (e: any) {  
            showToast("Erro","Condomínio não excluído!","erro");
            return e;
        }
    };

    const showToast = (title: string, description: string, tipo: "sucesso" | "erro" = "sucesso") => {
        setToastDetails({ title, description, tipo });
        setToastOpen(true);
    };

    return (
        <div className="max-w-3/4 flex flex-col"><Header/>

        <div className="mx-65 my-10 mb-4 flex items-center justify-between gap-4">
           <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100"> Condomínios</h1>
            <div className="relative w-72">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Pesquisar"
                className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
        </div>
            <div className="tabela">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 w-12">#</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Nome</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Endereço</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Cidade</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">UF</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Ação</th>
                    </tr>
                </thead>
        
                <tbody className="divide-y divide-gray-200 bg-white">
                    {loading ? (
                    <tr>
                        <td colSpan={7} className="px-4 py-3 text-sm text-gray-700">
                        Carregando...
                        </td>
                    </tr>
                    ) : error ? (
                    <tr>
                        <td colSpan={7} className="px-4 py-3 text-sm text-red-900">
                        {error}
                        </td>
                    </tr>
                    ) : filteredCondominios.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="px-4 py-3 text-sm text-gray-700">
                        Nenhum condomínio encontrado
                        </td>
                    </tr>
                    ) : (
                    filteredCondominios.map((condominio, index) => (
                        <tr key={condominio.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {condominio.nome}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {condominio.endereco ?? "-"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {condominio.cidade}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {condominio.uf}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {condominio.tipo}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <Dropdown onDeleteAction={()=>excluirCondominio(condominio.id)}/>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            <CondoToast 
                open={toastOpen} 
                onOpenChange={setToastOpen} 
                title={toastDetails.title}
                description={toastDetails.description}
                tipo={toastDetails.tipo}
            />
        </div>
    );
}