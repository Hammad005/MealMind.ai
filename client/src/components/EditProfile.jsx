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
import { useEffect, useRef, useState } from "react";
import { Info, Loader, Upload, X } from "lucide-react";

const EditProfile = ({ open, setOpen }) => {
  const btnRef = useRef();
  const { user, updateProfile, updateUserLoading } = useAuthStore();

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
        profile: "",
      });
      setErrors({});
    }
  }, [open, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.username) {
      newErrors.username = "Username is required.";
    } else if (data.username[0].toLowerCase() !== data.username[0]) {
      newErrors.username = "Username must start with a lowercase letter.";
    } else if (data.username.length <= 3) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    if (!data.name) {
      newErrors.name = "Name is required.";
    } else if (data.name.length <= 3) {
      newErrors.name = "Name must be at least 4 characters.";
    }

    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const res = await updateProfile(data);
      if (res.success) {
        setOpen(false);
      }
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, profile: reader.result });
        e.target.value = ""; // reset so same file can be selected again
      };
      reader.readAsDataURL(file);
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
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs flex gap-1 items-center">
                      <Info className="size-[0.75rem]" /> {errors.username}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.name ? "text-red-500" : "text-foreground"
                  } text-xs tracking-wide font-bold`}
                  htmlFor="name"
                >
                  Name:
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs flex gap-1 items-center">
                      <Info className="size-[0.75rem]" /> {errors.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.email ? "text-red-500" : "text-foreground"
                  } text-xs tracking-wide font-bold`}
                  htmlFor="email"
                >
                  Email:
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs flex gap-1 items-center">
                      <Info className="size-[0.75rem]" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className={`text-foreground text-xs tracking-wide font-bold`}
                  htmlFor="Profile"
                >
                  Profile Image:
                </Label>
                <input
                  type="file"
                  name="profile"
                  className="hidden"
                  accept="jpeg,jpg,png"
                  ref={btnRef}
                  onChange={handleProfileChange}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => btnRef.current.click()}
                    className="flex items-center justify-center text-sm gap-2 dark:bg-input/30 active:border-ring active:ring-ring/50 active:ring-[3px] border dark:border-input border-gray-500 h-9 w-[100px] cursor-pointer rounded-md  p-2"
                  >
                    <Upload className="size-[1rem]" />{" "}
                    {data.profile ? "Uploaded" : "Upload"}
                  </button>
                </div>
              </div>
              {data.profile && (
                <div className="flex relative w-12 h-12 border border-primary rounded-md object-contain overflow-hidden">
                  <X
                    className="size-[1rem] absolute top-0 right-0 cursor-pointer"
                    onClick={() => setData({ ...data, profile: "" })}
                  />
                  <img
                    src={data.profile}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <DialogFooter className={"pt-5 mt-5 border-t border-primary"}>
              <DialogClose asChild>
                <Button variant="outline" disabled={updateUserLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={updateUserLoading}>
                {updateUserLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
