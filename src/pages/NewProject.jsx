import NewProjectForm from "../components/NewProjectForm";

const NewProject = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Criar Projeto</h1>
          <p className="font-medium text-zinc-500">
            Crie seu projeto para adicionar os serviços
          </p>
        </div>
        <NewProjectForm />
      </div>
    </div>
  );
};

export default NewProject;
