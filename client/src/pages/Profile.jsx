import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useGSAP } from "@gsap/react";
import { CloudCheck, Edit, History, Repeat2 } from "lucide-react";
import React, { useRef } from "react";
import gsap from "gsap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { user } = useAuthStore();
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
      <div className="w-full lg:px-23 px-4 py-6 md:mt-10 min-h-screen flex flex-col gap-12">
        <div
          ref={profileRef}
          className="flex md:flex-row flex-col md:items-center gap-8 dark:bg-card/90 bg-primary/30 backdrop-blur border border-primary/40 rounded-lg overflow-hidden p-6"
        >
          <div className="flex flex-col gap-2 items-center">
            <p className="dark:bg-primary/50 bg-primary/80 text-white size-22 text-4xl rounded-full border-2 border-primary flex items-center justify-center">
              {user?.username[0].toUpperCase()}
            </p>

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
              >
                <Edit />
                Edit Profile
              </Button>
              <Button size={"sm"}>
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
              <TabsTrigger value="saved"><CloudCheck /> Saved</TabsTrigger>
              <TabsTrigger value="shared"><Repeat2 /> Shared</TabsTrigger>
            </TabsList>
            <TabsContent value="saved">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="shared">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile;
