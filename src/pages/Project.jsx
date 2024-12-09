import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import Loading from "../components/Loading";
import ProjectForm from "../components/ProjectForm";
import ServiceForm from "../components/ServiceForm";
import Notification from "../components/Notification";
import ServiceCard from "../components/ServiceCard";
import { v4 as uuidv4 } from "uuid";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.notification) {
      setNotification(location.state.notification);
      setTimeout(() => {
        setNotification(null);
        navigate(`/project/${id}`, { replace: true, state: {} });
      }, 3500);
    }
  }, [id, location.state, navigate]);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const toggleProjectForm = () => setShowProjectForm(!showProjectForm);

  const editProject = (project) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...project }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        navigate(`/project/${id}`, {
          state: { notification: "Serviço adicionado com sucesso!" },
        });
        toggleProjectForm();
      })
      .catch((err) => console.log(err));
  };

  const toggleServiceForm = () => setShowServiceForm(!showServiceForm);

  const addNewService = (service) => {
    const updatedService = {
      ...service,
      id: uuidv4(),
      cost: Number(service.cost),
    };

    const updatedCost = project.cost + updatedService.cost;
    if (updatedCost > project.budget) {
      alert("O valor ultrapassa o orçamento");
      return;
    }

    const updateServices = [...project.services, updatedService];

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...project,
        services: updateServices,
        cost: updatedCost,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        navigate(`/project/${id}`, {
          state: { notification: "Projeto atualizado com sucesso!" },
        });
        toggleServiceForm();
      })
      .catch((err) => console.log(err));
  };

  const removeService = (service) => {
    const updatedServices = project.services.filter((s) => s.id !== service.id);
    const updatedCost = project.cost - service.cost;

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...project,
        services: updatedServices,
        cost: updatedCost,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setNotification("Serviço Removido com Sucesso!");
        setTimeout(() => setNotification(null), 3500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
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
                <span className="font-bold">Total Orçamento:</span> R$
                {project.budget},00
              </li>
              <li>
                <span className="font-bold">Gastos:</span> R${project.cost},00
              </li>
              <li>
                <span className="font-bold">Orçamento Disponível:</span> R$
                {project.budget - project.cost},00
              </li>
            </ul>
          </div>
        ) : (
          <ProjectForm
            projectInfo={project}
            handleSubmit={editProject}
            buttonText="Concluir Edição"
          />
        )}

        <div className="flex flex-col gap-4 border-b-2 pb-4">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Adicione um serviço</h2>
            <Button onClick={toggleServiceForm} className="text-base">
              {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
            </Button>
          </div>
          {showServiceForm && (
            <ServiceForm
              buttonText="Adicionar serviço"
              handleSubmit={addNewService}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold">Serviços</h2>
          </div>
          <div className="flex gap-2">
            {project.services && project.services.length > 0 ? (
              project.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  id={service.id}
                  handleRemove={() => removeService(service)}
                />
              ))
            ) : (
              <p>Não há serviços cadastrados.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
