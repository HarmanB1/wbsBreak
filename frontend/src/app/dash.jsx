import { Link } from "react-router-dom"

{//temp data
}
const weekData = {
    mon: [
        { id: 1, title: 'Team Meeting', start: '10:00', end: '12:00', description: 'Weekly sync' },
        { id: 2, title: 'Lunch', start: '12:00', end: '13:00' }
    ],
    tue: [
        { id: 3, title: 'Code Review', start: '14:00', end: '15:30' }
    ],
    wed: [],
    thu: [
        { id: 4, title: 'Client Call', start: '9:00', end: '10:00' }
    ],
    fri: [],
    sat: [],
    sun: []
};

export const Dash = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl text-black  font-bold">Jump Back In</h1>
                <div className="border border-gray-700 w-32 p-3 rounded-lg ">
                    <Link to="/app/projects">

                        thing replaced by api call to cache

                    </Link>
                </div>
            </div>

            <div>
                {//api call which will send weeks task data back. specfic endpoint
                }
                <h1 className="text-5xl text-black  font-bold">Schedule</h1>
                <div className="border border-gray-700 w-auto p-3 rounded-lg ">
                    {//main schedule calender
                    }
                    <div className="overflow-x-auto"

                    >
                        <div className="grid grid-cols-7 gap-2">
                            {
                                Object.entries(weekData).map(([day, items]) => (
                                    <div key={day} className="flex flex-col w-auto border border-gray-700">
                                        <h3>{day}</h3>
                                        {items.map((list, index) => (
                                            <div key={index} className="flex flex-col gap-2">
                                                <div>{list.title}</div>
                                                <div>{list.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div>
                Activity feed
            </div>
            <div>
                alert page for problems
            </div>

        </div>
    )
}
