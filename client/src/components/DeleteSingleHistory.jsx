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

const DeleteSingleHistory = ({ open, setOpen, recipe }) => {
  const { deleteSingleHistory, historyRecipeLoading } = useHistoryStore();
  const handleDelete = async () => {
    const res = await deleteSingleHistory(recipe?._id);
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
              This action cannot be undone. This will permanently delete this{" "}
              <span className="text-primary/90 font-bold">
                "{recipe?.recipe?.name}"
              </span>{" "}
              recipe from your history.
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
  );
};

export default DeleteSingleHistory;
