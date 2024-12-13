import { useNavigate } from "react-router";
import ProjectForm from "../components/ProjectForm";
import { createProject } from "../api/services/projectServices";

const NewProject = () => {
  const navigate = useNavigate();

  const createPost = async (projectData) => {
    projectData.cost = 0;

    try {
      await createProject(projectData);
      navigate("/projects", {
        state: { notification: "Projeto criado com sucesso!" },
      });
    } catch (err) {
      alert("Ops, ocorreu um erro ao tentar criar o novo projeto", err);
    }
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
        <ProjectForm handleSubmit={createPost} buttonText="Criar Projeto" />
      </div>
    </div>
  );
};

export default NewProject;
