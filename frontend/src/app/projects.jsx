import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Cards = ({ id, name, thumbnail, tags }) => {
    return (
        <Link>
            <
                motion.div whileHover={{ scale: 1.05 }} className="flex flex-col border-gray-300 w-100 rounded-xl items-center p-4 shadow-sm hover:shadow-lg transition">
                <div className="w-full h-40 items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    {thumbnail}
                </div>
                <div className="mt-3 text-center space-y-1">

                    <p className="text-xs text-center text-gray-500">{id}</p>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="text-sm p-2 text-blue-600 bg-blue-100 py-1 rounded-full inline-block">{tags[0]}</p>
                </div>

            </motion.div>
        </Link>

    );

}
export const Projects = () => {
    //get from lightweight load table that keys into bigger
    const projects = [
        {
            id: 1,
            name: "Portfolio Website",
            thumbnail: "https://via.placeholder.com/150?text=Portfolio",
            tags: ["React", "Tailwind", "Web"],
            lastUpdate: "2025-11-10",
        },
        {
            id: 2,
            name: "Todo App",
            thumbnail: "https://via.placeholder.com/150?text=Todo+App",
            tags: ["JavaScript", "LocalStorage", "UI"],
            lastUpdate: "2025-10-22",
        },
        {
            id: 3,
            name: "Weather App",
            thumbnail: "https://via.placeholder.com/150?text=Weather+App",
            tags: ["API", "React", "CSS"],
            lastUpdate: "2025-09-18",
        },
        {
            id: 4,
            name: "Chat App",
            thumbnail: "https://via.placeholder.com/150?text=Chat+App",
            tags: ["Socket.io", "Node.js", "Realtime"],
            lastUpdate: "2025-12-01",
        },
        {
            id: 5,
            name: "Blog Platform",
            thumbnail: "https://via.placeholder.com/150?text=Blog",
            tags: ["Next.js", "Markdown", "Web"],
            lastUpdate: "2025-11-30",
        },
    ];



    return (
        <div>
            <div>filter</div>
            <div className="grid grid-cols-2 gap-2 justify-items-center ">            {
                projects.map(
                    (item, index) => (
                        <div key={index} className="" >
                            <Cards thumbnail={item.thumbnail}
                                id={item.id}
                                name={item.name}
                                tags={item.tags} />
                        </div>
                    ))

            }</div>

        </div>
    )
}
