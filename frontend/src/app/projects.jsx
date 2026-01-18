import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Modal } from "../util/modal"; // Assuming your modal handles its own styling
import { motion } from "framer-motion";
import { Filter, Calendar, ArrowUpRight } from "lucide-react";

export const ProjectCard = ({ id, name, thumbnail, tags, lastUpdate }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
        >
            <Link to={`/app/projects/${id}`} className="flex flex-col h-full">
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <motion.img
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={thumbnail}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                        <ArrowUpRight size={16} className="text-slate-600" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                            {name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ID-{id}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400">
                        <div className="flex items-center gap-1.5 text-xs">
                            <Calendar size={12} />
                            <span>Updated {new Date(lastUpdate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export const Projects = () => {
    const [open, setOpen] = useState(false);
    const anchorEl = useRef(null);

    const projects = [
        { id: 1, name: "Portfolio Website", thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80", tags: ["React", "Tailwind", "Web"], lastUpdate: "2025-11-10" },
        { id: 2, name: "Todo App", thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80", tags: ["JS", "Storage", "UI"], lastUpdate: "2025-10-22" },
        { id: 3, name: "Weather Dashboard", thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80", tags: ["API", "React", "Charts"], lastUpdate: "2025-09-18" },
        { id: 4, name: "Realtime Chat", thumbnail: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&q=80", tags: ["Sockets", "Node", "Realtime"], lastUpdate: "2025-12-01" },
        { id: 5, name: "Blog Platform", thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80", tags: ["Next.js", "CMS", "SEO"], lastUpdate: "2025-11-30" },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and monitor your active workspace.</p>
                </div>

                <button
                    ref={anchorEl}
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                    <Filter size={16} />
                    Filter Projects
                </button>

                <Modal anchorEl={anchorEl} open={open} setOpen={setOpen}>
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4">Filter Options</h2>
                        {/* Filter content here */}
                    </div>
                </Modal>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((item) => (
                    <ProjectCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        thumbnail={item.thumbnail}
                        tags={item.tags}
                        lastUpdate={item.lastUpdate}
                    />
                ))}

                {/* Create New Placeholder */}
                <button className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group min-h-[300px]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors mb-3">
                        <span className="text-2xl">+</span>
                    </div>
                    <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">New Project</span>
                </button>
            </div>
        </div>
    );
};
