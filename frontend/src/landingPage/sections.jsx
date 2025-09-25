export const Sections = () => {
  const section = [
    {
      name: "Ideas to Tasks",
      text: "ss",
      tile: [
        { name: "Automatic Breakdown", link: "", text: "" },
        { name: "Visual Task Tree View", link: "", text: "" },
        {
          name: "Tagging, Categorizations, and dependcay breakdown of tasks",
          link: "",
          text: "",
        },
        {
          name: "Hierarchal Breakdown",
          link: "",
          text: "",
        },
        {
          name: "Progress Tracking",
          link: "",
          text: "",
        },
      ],
    },
    {
      name: "Agile Enviroment",
      text: "ss",
      tile: [
        { name: "Scrum Board", link: "", text: "" },
        { name: "Sprint Management", link: "", text: "" },
        {
          name: "Task Assignment",
          link: "",
          text: "",
        },
        {
          name: "Burndown Charts",
          link: "",
          text: "",
        },
        {
          name: "Scrum Master",
          link: "",
          text: "",
        },
      ],
    },
    {
      name: "Scheduling & Time Management",
      text: "ss",
      tile: [
        { name: "Task Deadlines", link: "", text: "" },
        { name: "Calendar View", link: "", text: "" },
        {
          name: "Notification & Reminders",
          link: "",
          text: "",
        },
        {
          name: "Time Estimates",
          link: "",
          text: "",
        },
        ,
      ],
    },
  ];

  return (
    <div>
      {section.map((block, index) => (
        <div className="flex flex-col py-6" key={index}>
          <h1 className="text-4xl">{block.name}</h1>
          <div className=""> {block.text}</div>
          <div className="grid  px-8 grid-cols-3 gap-1 items-center justify-center">
            {block.tile.map((card, indexer) => (
              <div key={indexer} className=" h-48 bg-gray-50 rounded-lg border">
                <p>temp</p>
                <h1>{card.name}</h1>
                <p >{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
