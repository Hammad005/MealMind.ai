import NoHistory from "@/components/NoHistory";
import { Card, CardContent } from "@/components/ui/card";
import { useHistoryStore } from "@/store/useHistoryStore";
import {
  CalendarDays,
  ChefHat,
  Ellipsis,
  Share,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteSingleHistory from "@/components/DeleteSingleHistory";
import DeleteHistory from "@/components/DeleteHistory";
import SharedByHistory from "@/components/SharedByHistory";

const History = () => {
  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);

  const [open, setOpen] = useState(false);
  const [shareId, setShareId] = useState("");

  const navigate = useNavigate();
  const headingRef = useRef();
  const cardsRef = useRef();
  const btnRef = useRef();
  const { historyRecipes } = useHistoryStore();
  const [passingRecipe, setPassingRecipe] = useState();
  const [deleteSingleHistory, setDeleteSingleHistory] = useState(false);
  const [clearHistory, setClearHistory] = useState(false);

  const { contextSafe } = useGSAP();
  const animation = contextSafe(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, { opacity: 0, duration: 1.3 })
    .fromTo(
        btnRef.current,
        { width: 0, opacity: 0 },
        {
          width: "auto",
          opacity: 1,
          duration: 0.5,
        },
        "-=0.7"
      )
      .from(
        cardsRef.current?.children,
        { opacity: 0, duration: 1, y: 20, stagger: 0.2 },
        "-=0.7"
      )
  });
  useGSAP(() => {
    animation();
  }, []);
  return (
    <>
    <SharedByHistory open={open} setOpen={setOpen} id={shareId} />
      <DeleteHistory open={clearHistory} setOpen={setClearHistory} />
      <DeleteSingleHistory
        open={deleteSingleHistory}
        setOpen={setDeleteSingleHistory}
        recipe={passingRecipe}
      />
      <div className="flex flex-col items-center justify-center w-full lg:px-23 px-4 py-6 md:mt-10 min-h-screen">
        {historyRecipes?.length > 0 ? (
          <div className="flex flex-col items-center justify-center pb-20">
            <div ref={headingRef} className="text-center">
              <h3 className="text-4xl font-bold text-primary uppercase">
                History
              </h3>
              <p className="text-muted-foreground text-sm">
                Your AI-generated meal timeline.
              </p>
            </div>
            <div className="flex w-full justify-end mt-4">
              <button
                ref={btnRef}
                onClick={() => setClearHistory(true)}
                className={
                  "flex z-20 items-center gap-2 whitespace-nowrap w-fit justify-center border hover:border-primary border-gray-500 text-foreground hover:text-white text-sm font-medium shadow-xs hover:bg-primary/90 cursor-pointer rounded-l-md h-9 px-8 py-4 has-[>svg]:px-8"
                }
              >
                <Trash2 className="size-4" /> Clear History
              </button>
            </div>
            <div
              ref={cardsRef}
              className={`grid grid-cols-1 ${historyRecipes?.length >= 2 ? "md:grid-cols-2" : "md:grid-cols-1"} gap-8 mt-10`}
            >
                
              {historyRecipes?.map((entry) => (
                <Card
                  key={entry._id}
                  onClick={() => navigate(`/recipe/${entry._id}`)}
                  className="recipe-card cursor-pointer dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden"
                >
                  <CardContent className="px-5 pb-6 relative">
                    <div className="absolute md:top-0 bottom-0 right-2 transform md:-translate-y-4 translate-y-1/2">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2">
                          <Ellipsis className="size-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                            onClickCapture={() => {
                              setShareId(entry._id);
                              setOpen(true);
                            }}
                          >
                            <Share /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setPassingRecipe(entry);
                              setDeleteSingleHistory(true);
                            }}
                          >
                            <Trash2 /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-primary text-center italic mb-6 mt-0">
                      You asked for:{" "}
                      <span className="text-foreground">
                        "
                        {entry.text.length > 26
                          ? entry.text.slice(0, 26) + "..."
                          : entry.text}
                        "
                      </span>
                    </p>
                    <div className="flex md:flex-row flex-col justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                          <ChefHat className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {entry.recipe.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.recipe.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                          <CalendarDays className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            Generated At
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-px my-5 w-full bg-gradient-to-r from-primary via-green-900 to-primary opacity-50" />

                    <div className="mt-5">
                      <p className="text-sm text-muted-foreground line-clamp-4">
                        <span className="text-primary">&gt; </span>
                        {entry.recipe.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <NoHistory />
        )}
      </div>
    </>
  );
};

export default History;
