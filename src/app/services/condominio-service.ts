import { createClient } from "../utils/supabase/server";
 
export interface ICondominio {
    id: number, 
    id_adm: number,
    nome: string,
    endereco: string,
    cidade: string,
    uf: string,
    tipo: string,
    created_at: string;
}

export async function getCondominios() {

    const supabase = await createClient();
    const {data,error} = await supabase.from("condominio").select("*").order("id");

    if (error) throw new Error(error.message);
    return data ?? [];
}

export async function deleteCondominios(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("condominio")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);

    return true;
}


