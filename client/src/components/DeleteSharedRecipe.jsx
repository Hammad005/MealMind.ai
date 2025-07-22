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
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { useSharedStore } from "@/store/useSharedStore";
const DeleteSharedRecipe = ({ open, setOpen, recipe }) => {
  const { deleteSharedRecipe, shareRecipeLoading } = useSharedStore();
  const handleDelete = async () => {
    const res = await deleteSharedRecipe(recipe?._id);
    if (res.success) {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className={"text-xs"}>
            This action cannot be undone. This will permanently delete this{" "}
            <span className="text-primary/90 font-bold">
              "{recipe?.recipe?.name}"
            </span>{" "}
            recipe from your shared recipes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={shareRecipeLoading}>
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleDelete} disabled={shareRecipeLoading}>
            {shareRecipeLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSharedRecipe;
