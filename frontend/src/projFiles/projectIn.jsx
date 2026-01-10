import { Outlet, useParams } from "react-router-dom"
import { ProjectInNav } from "./projectInNav";
import { useState } from "react";
export const ProjectIn = () => {
    const [open, setOpen] = useState(false);
    const { projectId } = useParams();
    return (

        <div className="relative flex flex-col">
            <div className="pt-8 pl-8">       <h2>{projectId}</h2>
                <h2 className="inline-block"> PROJECT TITLE</h2>
            </div>
            <button className="cursor-pointer hover:bg-blue-100 " onClick={() => { setOpen(true) }}>BUTTOn</button>
            <div className={`absolute ${open ? "z-10" : "-z-10"}`}>
                <ProjectInNav open={open} setOpen={setOpen} />
                <Outlet />
            </div>
        </div>

    );
}  
