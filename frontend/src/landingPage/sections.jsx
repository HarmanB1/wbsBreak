export const Sections = () => {
  section = [
    { name: "Ideas to Tasks", text: "ss", tile: [] },
    { name: "Ideas to Tasks", text: "ss", tile: [] },
    { name: "Ideas to Tasks", text: "ss", tile: [] },
  ];

  return (
    <div>
      {section.map((block, index) => (
        <div className="flex flex-col" key={index}>
            <h1 className="text-4xl"></h1>
            <div className=""></div>

          {block.tile.map((card, indexer) => (
            <div key={indexer} className="grid grid-cols-3 "></div>
          ))}
        </div>
      ))}
    </div>
  );
};
