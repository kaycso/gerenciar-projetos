import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import Loading from "../components/Loading";
import ProjectForm from "../components/ProjectForm";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/sjon",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const editProject = (project) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        navigate(`/project/${id}`, {
          state: { notification: "Projeto atualizado com sucesso!" },
        });
        toggleProjectForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="mx-12 flex flex-col gap-4">
      {!removeLoading && <Loading />}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <Button onClick={toggleProjectForm} className="text-base">
          {!showProjectForm ? "Editar Projeto" : "Fechar"}
        </Button>
      </div>
      {!showProjectForm ? (
        <div className="border-b-2 pb-4">
          <ul className="flex flex-col gap-2">
            <li>
              <span className="font-bold">Categoria:</span> {project.category}
            </li>
            <li>
              <span className="font-bold">Total Orçamento:</span>{" "}
              {project.budget}
            </li>
            <li>
              <span className="font-bold">Gastos:</span> {project.cost}
            </li>
          </ul>
        </div>
      ) : (
        <ProjectForm projectInfo={project} handleSubmit={editProject} buttonText="Concluir Edição" />
      )}

      {/* Criar componente AddNewService */}
      <div className="flex justify-between border-b-2 pb-4">
        <h2 className="text-2xl font-bold">Adicione um serviço:</h2>
        <Button className="text-base">Adicionar Serviço</Button>
      </div>

      {/* Criar componente Services */}
      <div>
        {project.services === 0 ? (
          <p>teste</p>
        ) : (
          <p>Não há serviços cadastrados.</p>
        )}
      </div>
    </section>
  );
};

export default Project;
