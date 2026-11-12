

"use client"
import { Trash2, Trash2Icon } from "lucide-react"

import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogMedia,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { JobRow } from "@/lib/types/jobType"
import { deleteJob } from "@/lib/actions/jobs"
import { toast } from "react-toastify"
import {useRouter} from "next/navigation";
import { useState } from "react"

interface DeleteJobDialogProps {
    job: JobRow
}

export function DeleteJobDialog({job}: DeleteJobDialogProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDeleteButton = async () =>{
        setOpen(false);

        const result = await deleteJob(job._id);
        console.log("result",result);
        if (result.deletedCount > 0){
            toast.warn("Delete Successfull!");
            router.refresh();
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive"><Trash2 className="size-3.5" /></Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this Job from the DataBase.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteButton} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
