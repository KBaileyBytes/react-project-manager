import image from "../assets/no-projects.png";
import Button from "./Button";
import Label from "./Label";
import Input from "./TextInput";

const ProjectForm = ({ isOpen, setIsOpen, onNewProject }) => {
  function submitHandler(e) {
    e.preventDefault();
    const rawData = Object.fromEntries(new FormData(e.target));
    const formData = {
      ...rawData,
      dueDate: new Date(rawData.dueDate),
    };
    onNewProject(formData);
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <form className="px-12 mr-36" onSubmit={submitHandler}>
        <div className="flex justify-end">
          <Button
            onClick={() => setIsOpen(false)}
            style="min-w-24 flex items-center justify-center rounded-lg px-3 py-2 mx-4 font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style="min-w-24 flex items-center justify-center rounded-lg px-3 py-2 text-white font-semibold bg-stone-800 hover:bg-stone-700"
          >
            Save
          </Button>
        </div>
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" id="title" />
        <Label htmlFor="description">Description</Label>
        <textarea
          name="description"
          id="description"
          className="min-w-96 w-full bg-stone-200 rounded-md border-b-2 border-stone-400"
          rows="3"
        />
        <Label htmlFor="dueDate">Due Date</Label>
        <Input type="date" name="dueDate" id="dueDate" />
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <img src={image} alt="pic" className="w-40 py-4" />
      <p className="py-3 text-2xl font-bold text-stone-600">
        No Project Selected
      </p>
      <p className="text-stone-500 py-6">
        Select a project or get started with a new one
      </p>
      <Button onClick={setIsOpen}>Create new project</Button>
    </div>
  );
};

export default ProjectForm;
