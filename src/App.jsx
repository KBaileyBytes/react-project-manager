import SideBar from "./components/SideBar";
import { useState, useRef } from "react";
import ProjectForm from "./components/ProjectForm";
import sampleProjects from "./sample-data";

function App() {
  const [projects, setProjects] = useState(sampleProjects);
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState();
  const ref = useRef();

  function handleNewProject(project) {
    setProjects((oldProjects) => [...oldProjects, { ...project, tasks: [] }]);
    setActiveProject(null);
  }

  function handleNewTask() {
    const updatedProjects = [...projects];

    updatedProjects[activeProject.key] = {
      ...updatedProjects[activeProject.key],
      tasks: [...updatedProjects[activeProject.key].tasks, ref.current.value],
    };

    setProjects(updatedProjects);
    setActiveProject((oldActiveProject) => ({
      key: oldActiveProject.key,
      project: updatedProjects[oldActiveProject.key],
    }));

    ref.current.value = "";
  }

  function handleRemoveTask(index) {
    const updatedProjects = [...projects];

    updatedProjects[activeProject.key] = {
      ...updatedProjects[activeProject.key],
      tasks: updatedProjects[activeProject.key].tasks.filter(
        (task, i) => i !== index
      ),
    };

    setProjects(updatedProjects);
    setActiveProject((oldActiveProject) => ({
      key: oldActiveProject.key,
      project: updatedProjects[oldActiveProject.key],
    }));
  }

  function handleRemoveProject() {
    setProjects((oldProjects) =>
      oldProjects.filter(
        (project) => project.title !== activeProject.project.title
      )
    );
    setActiveProject(null);
  }

  function onClick(cancel) {
    const openState = typeof cancel === "object";
    setIsOpen(openState);
    setActiveProject(null);
  }

  function handleSelectedProject(project) {
    setActiveProject(project);
  }

  return (
    <div className="flex h-screen mt-8">
      <SideBar
        setIsOpen={onClick}
        projects={projects}
        onNewTask={handleNewTask}
        onRemoveTask={handleRemoveTask}
        onRemoveProject={handleRemoveProject}
        onProjectSelect={handleSelectedProject}
        activeProject={activeProject}
        ref={ref}
      />
      <div className="w-full flex flex-col p-8 my-8" id="main-content">
        {!activeProject && (
          <ProjectForm
            isOpen={isOpen}
            setIsOpen={onClick}
            onNewProject={handleNewProject}
          />
        )}
      </div>
    </div>
  );
}

export default App;
