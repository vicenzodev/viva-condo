"use client";

import { DropdownMenu } from "radix-ui";
import { MdMoreVert } from "react-icons/md";
import { AlertDialogCondo } from './alert'
import { useState } from "react";

interface DropdownProps {
  onDeleteAction: () => void;
}

export default function dropdown({onDeleteAction}:DropdownProps){
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const confirmDelete = () =>{
    onDeleteAction();
    setIsAlertOpen(false);
  }

  return(
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button onClick={() => setIsAlertOpen(true)}><MdMoreVert className="text-lg"></MdMoreVert></button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={0} className="dp-content">
          <DropdownMenu.Item onSelect={() => console.log('Editado!')} className="item">
            Editar
          </DropdownMenu.Item>
          <AlertDialogCondo
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            onConfirm={confirmDelete}
          />
          <DropdownMenu.Separator />
          <DropdownMenu.Arrow className="triangle" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
    );
}
