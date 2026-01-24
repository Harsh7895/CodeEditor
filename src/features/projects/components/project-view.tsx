"use client";

import { Poppins } from "next/font/google";
import { Github, SparkleIcon } from "lucide-react";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

import { ProjectList } from "./project-list";
import { useCreateProject } from "@/features/hooks/use-projects";
import { useEffect, useState } from "react";
import { ProjectsCommandDialog } from "./project-command-dialog";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ProjectView = () => {
  const createProject = useCreateProject();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setCommandDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
          <div className="flex justify-between gap-4 w-full items-center">
            <div className="flex justify-start gap-4 w-full items-center group/logo">
              <img
                src="/logo.png"
                alt="Code-editor"
                className="h-[80px] w-[80px] object-contain rounded-2xl"
              />
              <h1
                className={cn(
                  "text-2xl md:text-3xl font-semibold",
                  font.className,
                )}
              >
                Code Editor
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const projectName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    separator: "-",
                    length: 3,
                  });
                  createProject({ name: projectName });
                }}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <SparkleIcon className="size-4 mb-2" />
                  <Kbd className="bg-accent border">Ctrl + J</Kbd>
                </div>
                <div>
                  <span>New</span>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => {}}
                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <Github className="size-4 mb-2" />
                  <Kbd className="bg-accent border">Ctrl + I</Kbd>
                </div>
                <div>
                  <span>Import</span>
                </div>
              </Button>
            </div>

            <ProjectList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
