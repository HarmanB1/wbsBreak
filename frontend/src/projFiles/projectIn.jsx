import { Outlet, useParams } from "react-router-dom"
import { ProjectInNav } from "./projectInNav";
import { useState } from "react";
import { Menu, FolderKanban } from "lucide-react";

export const ProjectIn = () => {
    const [open, setOpen] = useState(false);
    const { projectId } = useParams();

    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="bg-blue-400 text-white shadow-lg h-16 items-center ">
                <div className="px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                            onClick={() => setOpen(true)}
                            aria-label="Open navigation"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3">
                            <FolderKanban className="w-8 h-8" />
                            <div>
                                <p className="text-blue-100 text-sm mt-0.5">Project Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute ${open ? "z-10" : "-z-10"}`}>
                <ProjectInNav open={open} setOpen={setOpen} />
            </div>

            <div className="flex-1 -z-0">
                <Outlet />
            </div>
        </div>
    );
}
