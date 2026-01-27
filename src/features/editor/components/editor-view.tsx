import { useFile, useUpdateFile } from "@/features/hooks/use-files";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { FileBreadcrumbs } from "./file-breadcrumbs";
import TopNavigation from "./top-navigation";
import Image from "next/image";
import CodeEditor from "./code-editor";
import { useRef } from "react";

const DEBOUNCE_MS = 1500;
const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const { activeTabId } = useEditor(projectId);
  const activeFile = useFile(activeTabId!);
  const updateFile = useUpdateFile();

  const isActiveFileBinary = activeFile && activeFile.storageId;
  const isActiveFileText = activeFile && !activeFile.storageId;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileName = activeFile?.name ?? "";
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center">
        <TopNavigation projectId={projectId} />
      </div>
      {activeTabId && <FileBreadcrumbs projectId={projectId} />}
      <div className="flex-1 min-h-0 bg-background">
        {!activeFile && (
          <div className="size-full flex items-center justify-center">
            <Image
              src={"/logo-alt.png"}
              alt="Loading..."
              width={300}
              height={300}
            />
          </div>
        )}
        {isActiveFileText && (
          <CodeEditor
            fileName={fileName}
            key={activeFile._id}
            initialValue={activeFile.content || ""}
            onChange={(val: string) => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }

              timeoutRef.current = setTimeout(() => {
                updateFile({
                  id: activeFile._id,
                  content: val,
                });
              }, DEBOUNCE_MS);
            }}
          />
        )}
        {isActiveFileBinary && <div>File is binary</div>}
      </div>
    </div>
  );
};

export default EditorView;
