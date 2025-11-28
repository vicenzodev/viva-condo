import * as React from "react";
import { AlertDialog } from "radix-ui";

export const AlertDialogDemo = () => (
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild>
			<button className="item excluir">
				Excluir
			</button>
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 data-[state=open]:animate-overlayShow"/>
			<AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow bg-gray-900 opacity-90">
				<AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
					Você tem certeza?
				</AlertDialog.Title>
				<AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
					Esta ação não pode ser desfeita. Isso excluirá permanentemente o
					registro e removará seus dados de nossos servidores.
				</AlertDialog.Description>
				<div className="flex justify-end gap-[25px]">
					<AlertDialog.Cancel asChild>
						<button className="item inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
							Cancelar
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="item excluir inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none">
							Sim, deletar registro
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);