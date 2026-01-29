import { Outlet, useParams } from "react-router-dom";
import { ProjectInNav } from "./projectInNav";
import { useState } from "react";
import { Menu, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export const ProjectIn = () => {
    const [open, setOpen] = useState(false);
    const { projectId } = useParams();

    return (
        <div className="relative flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Minimalist Top Header Trigger */}
            <header className="fixed top-6   w-fit z-30">
                

                <div className="flex gap-x-40">
                    <button
                        className="p-1.5 hover:bg-slate-100 border-slate-500 rounded-full backdrop-blur-md shadow-sm border-white/40 transition-colors text-slate-600"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={20} />
                    </button>

                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    <div className="flex items-center gap-2 px-2">
                        <LayoutGrid size={16} className="text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Project Dashboard
                        </span>
                    </div>
                </div>





            </header>

            {/* Sidebar Component */}
            <ProjectInNav open={open} setOpen={setOpen} />

            {/* Main Content Area */}
            <main className="flex-1 pt-24 px-8 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto h-full"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
