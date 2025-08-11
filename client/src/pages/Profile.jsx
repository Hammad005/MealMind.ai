import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useGSAP } from "@gsap/react";
import { Bookmark, CloudCheck, Edit, History, RefreshCcw, Repeat2, Share, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSavedStore } from "@/store/useSavedStore";
import { useSharedStore } from "@/store/useSharedStore";
import NoSavedRecipes from "@/components/NoSavedRecipes";
import NoSharedRecipes from "@/components/NoSharedRecipes";
import EditProfile from "@/components/EditProfile";
import { useNavigate } from "react-router-dom";
import SavedRecipes from "@/components/SavedRecipes";
import SharedRecipes from "@/components/SharedRecipes";

const Profile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { savedRecipes, savedRecipeLoading, getSavedRecipes } = useSavedStore();
  const { sharedRecipes, shareRecipeLoading, getSharedRecipes } = useSharedStore();

  const profileRef = useRef();
  const tabsRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      profileRef.current,
      { rotationY: -90, transformOrigin: "top center", opacity: 0 },
      {
        rotationY: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power2.out",
      }
    ).fromTo(
      tabsRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.5"
    );
  });

  return (
    <>
    <EditProfile open={open} setOpen={setOpen}/>
      <div className="w-full lg:px-23 px-4 py-6 md:mt-10 min-h-screen flex flex-col gap-12">
        <div
          ref={profileRef}
          className="flex md:flex-row flex-col md:items-center gap-8 dark:bg-card/90 bg-primary/30 backdrop-blur border border-primary/40 rounded-lg overflow-hidden p-6"
        >
          <div className="flex flex-col gap-2 items-center">
            {user?.profile?.imageUrl ? (
              <div className="dark:bg-primary/50 bg-primary/80 overflow-hidden size-22 rounded-full border-2 border-primary flex items-center justify-center">
                <img src={user?.profile?.imageUrl} alt="avatar" className="h-full w-full object-cover"/>
              </div>
            ) : (
            <p className="dark:bg-primary/50 bg-primary/80 text-white size-22 text-4xl rounded-full border-2 border-primary flex items-center justify-center">
              {user?.username[0].toUpperCase()}
            </p>
            )}

            <h3 className="text-xl font-bold text-center">{user?.name}</h3>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl text-primary font-bold font-mono">
              {user?.username}
            </h1>
            <div className="h-px w-full bg-primary my-2" />
            <p className="text-sm tracking-wider text-muted-foreground  font-mono">
              {user?.email}
            </p>
            <div className="flex md:flex-row flex-col justify-end md:mt-0 mt-5 gap-2">
              <Button
                size={"sm"}
                className={
                  "border border-primary dark:text-white text-foreground hover:text-white bg-transparent hover:bg-primary"
                }
                onClick={() => setOpen(true)}
              >
                <Edit />
                Edit Profile
              </Button>
              <Button size={"sm"} onClick={() => navigate('/history')}>
                <History />
                History
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={tabsRef}
          className="flex flex-col gap-8 dark:bg-card/90 bg-primary/30 backdrop-blur border border-primary/40 rounded-lg overflow-hidden p-6"
        >
          <h3 className="text-3xl font-bold text-primary">Personal Recipes:</h3>
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="saved">
                <Bookmark className="fill-foreground"/> Saved
              </TabsTrigger>
              <TabsTrigger value="shared">
                <Share /> Shared
              </TabsTrigger>
            </TabsList>
            <TabsContent value="saved">
              <div className="relative dark:bg-input/50 bg-input backdrop-blur-sm border border-border rounded-lg md:p-10 p-4">
                <Button
                  size={"icon"}
                  className="absolute top-4 right-4 bg-transparent border border-primary text-foreground hover:text-white"
                  disabled={savedRecipeLoading}
                  onClick={getSavedRecipes}
                >
                  <RefreshCcw
                    className={savedRecipeLoading && "animate-spin"}
                  />
                </Button>
                {savedRecipes.length > 0 ? <SavedRecipes/> : <NoSavedRecipes />}
              </div>
            </TabsContent>
            <TabsContent value="shared">
              <div className="relative dark:bg-input/50 bg-input backdrop-blur-sm border border-border rounded-lg md:p-10 p-4">
                <Button
                  size={"icon"}
                  className="absolute top-4 right-4 bg-transparent border border-primary text-foreground hover:text-white"
                  disabled={shareRecipeLoading}
                  onClick={getSharedRecipes}
                >
                  <RefreshCcw className={shareRecipeLoading && "animate-spin"} />
                </Button>
                {sharedRecipes.length > 0 ? <SharedRecipes/> : <NoSharedRecipes />}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile;
