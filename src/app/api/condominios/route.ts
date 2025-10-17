// Update the import path if the file is located elsewhere, for example:
import { getCondominios } from '../../services/condominio-service';
// Or create the file '../services/condominio-service.ts' and export getCondominios from it.
import { NextResponse } from 'next/server';
  
export async function GET() {
    try {
        const data = await getCondominios();

        return NextResponse.json({
            success: true, 
            count: data.length,
            data,
        }, { status: 200 });
    
    }   catch (e:any) {
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400 });
    }
}

