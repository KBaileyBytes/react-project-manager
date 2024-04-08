import SideBar from "./components/SideBar";
import { useState, useRef } from "react";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] = useState([
    {
      title: "Get a job",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit deserunt voluptatum atque excepturi odit quos, at quisquam aliquam impedit laudantium, nobis consequuntur vel sit deleniti, corporis numquam sapiente expedita quidem?",
      dueDate: new Date(),
      tasks: [],
    },
    {
      title: "Learn React",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit deserunt voluptatum atque excepturi odit quos, at quisquam aliquam impedit laudantium, nobis consequuntur vel sit deleniti, corporis numquam sapiente expedita quidem?",
      dueDate: new Date(),
      tasks: [],
    },
  ]);
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
