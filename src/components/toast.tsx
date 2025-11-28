import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

interface CondoToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  tipo?: "sucesso" | "erro";
}

export const CondoToast = ({ open, onOpenChange, title, description, tipo = "sucesso" }: CondoToastProps) =>{
    return(
        <Toast.Provider swipeDirection="right" duration={1000}>
            <Toast.Root
                open={open}
                onOpenChange={onOpenChange}
                // Mudamos a cor baseado no tipo
                className={`${
                    tipo === "erro" ? "bg-red-600" : "bg-green-600" // Exemplo de cores
                } text-white px-4 py-3 rounded-md shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-fadeOut`}
            >
                <Toast.Title className="font-semibold">{title}</Toast.Title>
                <Toast.Description>{description}</Toast.Description>
            </Toast.Root>

            <Toast.Viewport className="fixed top-4 right-4 z-50 w-96 max-w-full outline-none" />
        </Toast.Provider>
    );
}