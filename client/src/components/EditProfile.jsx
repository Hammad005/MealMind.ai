import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";

const EditProfile = ({ open, setOpen }) => {
  const { user } = useAuthStore();

  const [data, setData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    profile: user?.profile?.imageUrl || "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
  if (open) {
    setData({
      username: user?.username || "",
      name: user?.name || "",
      email: user?.email || "",
      profile: user?.profile?.imageUrl || "",
    });
    setErrors({});
  }
}, [open, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!data.username) {
      newErrors.username = "Username is required.";
    } else if (data.username.length <= 3) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    // if (!data.name) {
    //   newErrors.name = "Name is required.";
    // } else if (data.name.length <= 3) {
    //   newErrors.name = "Name must be at least 4 characters.";
    // }

    // if (!data.email) {
    //   newErrors.email = "Email is required.";
    // } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   newErrors.email = "Email is invalid.";
    // }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(data);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex flex-col gap-1">
                  <Label
                    className={`${
                      errors.username ? "text-red-500" : "text-foreground"
                    } text-xs tracking-wide font-bold`}
                    htmlFor="username"
                  >
                    Username:
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={data.username}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs flex gap-1 items-center">
                        <Info className="size-[0.75rem]" /> {errors.username}
                      </p>
                    )}
                  </div>
                </div>
            </div>
            <DialogFooter className={'pt-2 mt-5 border-t border-primary'}>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
          </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
