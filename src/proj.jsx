
import { useEffect, useState } from "react";
import { Card } from "./cardProj";
export const Proj = () => {
  const [ projects, setProjects] = useState([]);

  useEffect(() => {
    const fakeProjects = [
      {
        id: 1,
        name: "Task Tracker",
        description: "A simple web app to track daily tasks and todos.",
        date: "2024-12-01",
        imgSrc: "https://source.unsplash.com/random/300x200?productivity",
      },
      {
        id: 2,
        name: "BugSquash",
        description: "A bug-tracking system for agile teams.",
        date: "2025-01-15",
        imgSrc: "https://source.unsplash.com/random/300x200?debug",
      },
      {
        id: 3,
        name: "KanbanPro",
        description: "A kanban-style board to organize sprints visually.",
        date: "2025-03-20",
        imgSrc: "https://source.unsplash.com/random/300x200?workflow",
      },
      {
        id: 4,
        name: "SprintSync",
        description: "Tool to manage sprints, tasks, and standups.",
        date: "2025-04-10",
        imgSrc: "https://source.unsplash.com/random/300x200?scrum",
      },
    ];

    setProjects(fakeProjects);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grdi-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {projects.map((proj) => {
          return (
            <div
              className="transition-transform duration-300 hover:-translate-y-2 "
              key={proj.id}
            >
              <Card
                name={proj.name}
                description={proj.description}
                date={proj.date}
                imgSrc={proj.imgSrc}
              />
            </div>
          );
          
        })}
      </div>
    </div>
  );
};
