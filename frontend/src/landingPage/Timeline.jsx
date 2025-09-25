export const Timeline = () => {
  const steps = [
    { title: "idea", description: "brainstorm and plan your project." },
    { title: "build", description: "develop features and iterate." },
    { title: "launch", description: "deploy and share with the world." },
  ];

  return (
    <div className="flex w-full p-4">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          {/* Container for Circle and Lines */}
          <div className="relative w-full flex justify-center">
            {/* Left Line: Renders for all except the first item */}
            {index > 0 && (
              <div className="absolute top-4 left-0 h-1 w-1/2 bg-gray-300"></div>
            )}

            {/* Circle */}
            <div className="relative z-10 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"></div>

            {/* Right Line: Renders for all except the last item */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 right-0 h-1 w-1/2 bg-gray-300"></div>
            )}
          </div>

          {/* Content */}
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="text-xs text-gray-600 px-2">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
