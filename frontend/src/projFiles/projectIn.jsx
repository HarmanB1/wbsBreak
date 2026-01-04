import {Outlet, useParams} from "react-router-dom"
export const ProjectIn = () =>{
    const {projectId} = useParams();
    return(
        <div>
           
            <h2>{projectId}</h2>
            <Outlet />
        </div>

    );
}
