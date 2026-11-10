

import { Trash2, Trash2Icon } from "lucide-react"

import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogMedia,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobRow } from "@/app/dashboard/recruiter/jobs/page"

interface DeleteJobDialogProps {
    job: JobRow
}

export function DeleteJobDialog({job}: DeleteJobDialogProps) {
    return (
        <AlertDialog>
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
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
