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


    const Cards = ({ id, name, thumbnail, tags }) => {
        return (
            <div className="flex flex-col border-gray-300 roundex-xl items-center p-4 shadow-sm hover:shadow-lg transition">
                <div className="w-full h-40 items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    {thumbnail}
                </div>
                <div>

                    <p>{id}</p>
                    <p>{name}</p>
                    <p>{tags[0]}</p>
                </div>

            </div>

        );

    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-2  ">            {
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
