import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import cld from "@/lib/cloudinary";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { Button } from "./ui/button";
import { useState } from "react";

const SharedByHistory = ({ open, setOpen, id }) => {
  const { allUsers } = useAuthStore();
  const [username, setUsername] = useState("");
  const filteredUsers = allUsers?.filter((user) => user.username === username);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={"max-h-[80vh] overflow-y-auto p-4"}>
          <DialogHeader>
            <DialogTitle className={"flex gap-1 items-end"}>
              <Share className="w-5 h-5 text-primary" /> Share Recipe
            </DialogTitle>
            <div className="flex flex-col gap-4 mt-4">
              <Card className="recipe-card cursor-pointer dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border transition-colors overflow-hidden p-4">
                <Input
                  type={"text"}
                  placeholder={"Enter username"}
                  className="w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Card>
              {filteredUsers?.length > 0 && <Card className="recipe-card dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border transition-colors overflow-hidden p-4">
                {filteredUsers?.map((user) => {
                  const profilePic = cld
                    .image(user?.profile?.imageId)
                    .format("auto")
                    .quality("auto")
                    .resize(scale().width(400));
                  return (
                    <CardContent
                      key={user._id}
                      className="flex items-center justify-between dark:bg-card bg-primary/20 p-2 rounded-md cursor-pointer border border-border hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {user?.profile?.imageUrl ? (
                          <div className="dark:bg-primary/50 bg-primary/80 overflow-hidden w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
                            <AdvancedImage
                              cldImg={profilePic}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <p className="dark:bg-primary/50 bg-primary/80 text-white shadow-xs hover:bg-primary/90 dark:hover:bg-primary/90 w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
                            {user?.username[0]?.toUpperCase()}
                          </p>
                        )}
                        <h3 className="font-semibold text-sm">
                          {user?.username}
                        </h3>
                      </div>
                      <Button>Send</Button>
                    </CardContent>
                  );
                })}
              </Card>}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SharedByHistory;
