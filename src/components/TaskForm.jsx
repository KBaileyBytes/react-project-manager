import Button from "./Button";
import { forwardRef } from "react";

const TaskForm = forwardRef(({ project, onNewTask, onRemoveTask }, ref) => {
  return (
    <div className="px-6 max-w-screen-lg">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-stone-700">{project.title}</h1>
        <Button className="text-stone-600 font-semibold p-2">Delete</Button>
      </header>
      <div>
        <p className="text-stone-500">
          {project.dueDate.toDateString() || new Date(project.dueDate)}
        </p>
        <p className="py-6 text-stone-700 border-b-gray-300 border-b-2">
          {project.description}
        </p>
      </div>
      <h2 className="text-2xl font-bold text-stone-700 py-6">Tasks</h2>
      <form className="flex w-1/2" onSubmit={(e) => e.preventDefault()}>
        <input
          className="flex-1 max-w-sm h-9 bg-stone-200 rounded-sm"
          ref={ref}
        />
        <Button
          className="text-stone-600 font-semibold px-8 flex-2"
          onClick={onNewTask}
        >
          Add Task
        </Button>
      </form>
      {project.tasks.length > 0 && (
        <ul className="p-6 my-8 bg-stone-100 rounded-md">
          {project.tasks.map((task, i) => {
            return (
              <div className="flex justify-between items-center py-3" key={i}>
                <li>{task}</li>
                <Button
                  className="text-stone-600 font-semibold px-8 flex-2"
                  onClick={() => onRemoveTask(i)}
                >
                  Clear
                </Button>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default TaskForm;
