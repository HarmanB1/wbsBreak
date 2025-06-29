
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

  return(<div className="min-h-screen bg-slate-400">



  </div>);
};
