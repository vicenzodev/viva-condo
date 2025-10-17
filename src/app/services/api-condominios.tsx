export interface ICondominio{
    id: string;
    nome: string;
    endereco: string;
    cidade: string;
    uf: string;
    tipo: string;
    created_at: string;
    id_cliente: number
}

export const getCondominios = async () => {
    const response = await fetch('https://raw.githubusercontent.com/vagner107/viva-condo/refs/heads/main/src/app/condominios/api.json');
    return await response.json();
}