import { getCondominios, deleteCondominios } from '../../services/condominio-service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getCondo();

        return NextResponse.json({
            success: true,
            count: data.length,
            data,
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400 });
    }
}

<<<<<<< HEAD
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
=======
export async function DELETE(request: Request) {
    try {
        // Pegando o ID da URL
        const { searchParams } = new URL(request.url);
        const id = Number(searchParams.get("id"));

        if (!id) {
            return NextResponse.json({
                success: false,
                error: "ID é obrigatório no DELETE",
            }, { status: 400 });
        }

        await deleteCondominios(id);

        return NextResponse.json({
            success: true,
            message: `Condomínio ID ${id} deletado com sucesso`,
        }, { status: 200 });

    } catch (e: any) {
>>>>>>> 95c765eb6f1f3c95aaebc31051d1036fdf854985
        return NextResponse.json({
            success: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400 });
    }
}
