"use client";

import { DropdownMenu } from "radix-ui";
import { MdMoreVert } from "react-icons/md";


export default function dropdown(){
    
    const openModal = () => {
        
    }
    
    return(
	<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button><MdMoreVert className="text-lg"></MdMoreVert></button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content sideOffset={0} className="dp-content">
        <DropdownMenu.Item onSelect={() => console.log('Editado!')} className="item">
          Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item className="item excluir" onSelect={openModal}>Excluir</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Arrow className="triangle" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
  );
}
