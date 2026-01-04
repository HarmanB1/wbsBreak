import { Outlet, useParams } from "react-router-dom"
import { ProjectInNav } from "./projectInNav";
export const ProjectIn = () => {
    const { projectId } = useParams();
    return (
        <div>

            <h2>{projectId}</h2>
            sfsfs
            <h2 className="inline-block"> PROJECT TITLE</h2>

            <ProjectInNav />
            <Outlet />
        </div>

    );
}  
