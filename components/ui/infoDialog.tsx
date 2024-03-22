import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { InfoCircledIcon } from "@radix-ui/react-icons"


export function InfoDialog(){
    return (
        <Dialog>
            <DialogTrigger><InfoCircledIcon width="25" height="25"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Information / FAQ</DialogTitle>
                <DialogDescription>
                    placeholder
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

  