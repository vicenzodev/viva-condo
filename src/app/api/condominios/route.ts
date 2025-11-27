import { getCondo, delCondo, getCondoById } from '../../../services/condominio-service';
import { NextResponse, NextRequest } from 'next/server';
  
export async function GET() {
    try {
        const data = await getCondo();

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

export const POST = async (req:NextRequest) =>{
    try{
        const body = await req.json();
        const data = await getCondoById(body.id);
        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });
    }catch(e:any){
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400 });
    }
}

export const DELETE = async (req:NextRequest) =>{
    try{
        const body = await req.json();
        const data = await delCondo(body.id);
        return NextResponse.json({
            success: true,
            count: data.length,
            data
        }, { status: 200 });
    }catch(e:any){
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400 });
    }
}