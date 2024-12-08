import { useNavigate } from "react-router";
import NewProjectForm from "../components/NewProjectForm";

const NewProject = () => {
  const navigate = useNavigate();

  const createPost = (project) => {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) =>
        navigate("/projects", {
          state: { notification: "Projeto criado com sucesso!" },
        }),
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Criar Projeto</h1>
          <p className="font-medium text-zinc-500">
            Crie seu projeto para adicionar os serviços
          </p>
        </div>
        <NewProjectForm handleSubmit={createPost} />
      </div>
    </div>
  );
};

export default NewProject;
