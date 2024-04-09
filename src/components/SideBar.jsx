import Button from "./Button";
import { createPortal } from "react-dom";
import { forwardRef } from "react";
import TaskForm from "./TaskForm";

const SideBar = forwardRef(
  (
    {
      projects,
      setIsOpen,
      onProjectSelect,
      onNewTask,
      activeProject,
      onRemoveTask,
      onRemoveProject,
    },
    ref
  ) => {
    function handleProjectClick(i) {
      onProjectSelect({ key: i, project: projects[i] });
    }

    return (
      <div className="bg-stone-900 p-8 rounded-tr-2xl w-1/4">
        <p className=" my-10 text-2xl font-bold uppercase text-white">
          Your Projects
        </p>
        <Button onClick={setIsOpen}>+ Add Project</Button>
        {projects && (
          <ul className="w-full my-8">
            {projects.map((project, i) => (
              <li
                className={`rounded-lg text-lg text-stone-400 hover:text-white ${
                  activeProject?.key === i && "bg-stone-800"
                } p-2 hover:cursor-pointer`}
                onClick={() => {
                  handleProjectClick(i);
                }}
                key={i}
              >
                <span className="pl-2">{project.title}</span>
              </li>
            ))}
            {activeProject &&
              createPortal(
                <TaskForm
                  project={activeProject.project}
                  onNewTask={onNewTask}
                  onRemoveTask={onRemoveTask}
                  onRemoveProject={onRemoveProject}
                  ref={ref}
                />,
                document.getElementById("main-content")
              )}
          </ul>
        )}
      </div>
    );
  }
);

export default SideBar;
