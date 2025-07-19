import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useHistoryStore } from "@/store/useHistoryStore";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

const DeleteHistory = ({open, setOpen}) => {
    const { clearHistory, historyRecipeLoading } = useHistoryStore();
      const handleDelete = async () => {
        const res = await clearHistory();
        if (res.success) {
            setOpen(false)
        }
      };
  return (
    <>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className={"text-xs"}>
                  This action cannot be undone. This will permanently delete your history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={historyRecipeLoading}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  onClick={handleDelete}
                  disabled={historyRecipeLoading}
                >
                  {historyRecipeLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
  )
}

export default DeleteHistory