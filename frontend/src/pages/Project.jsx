import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Button from "../components/ui/Button";
import Loading from "../components/Loading";
import ProjectForm from "../components/ProjectForm";
import ServiceForm from "../components/ServiceForm";
import Notification from "../components/Notification";
import ServiceCard from "../components/ServiceCard";
import { getProjectById, modifyProject } from "../api/services/projectServices";
import { addService, deleteService } from "../api/services/serviceServices";
import { getCategoryBydId } from "../api/services/categoryServices";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleProjectForm = () => setShowProjectForm(!showProjectForm);
  const toggleServiceForm = () => setShowServiceForm(!showServiceForm);

  const formatedNumeric = (value) => {
    const formatedValue = value.toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatedValue;
  };

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
    const fetchProject = async (id) => {
      try {
        setRemoveLoading(false);

        const data = await getProjectById(id);
        setProject({
          id: data.id,
          title: data.title,
          category_id: data.category_id,
          category_name: data.category_name,
          cost: data.cost,
          budget: data.budget,
          availableBudget: data.budget - data.cost,
        });

        setServices(data.services);
      } catch (err) {
        console.log(err);
        alert("Não foi possível carregar o projeto");
      } finally {
        setRemoveLoading(true);
      }
    };

    fetchProject(id);
  }, [id]);

  const updateProject = async (projectData) => {
    if (projectData.budget < project.cost) {
      alert("Orçamento não pode ser menor que os gastos totais!");
      return;
    }

    setRemoveLoading(false);

    try {
      const data = await modifyProject(id, projectData);
      const categoryData = await getCategoryBydId(data.category_id);
      setProject({
        ...data,
        category_name: categoryData.name,
        availableBudget: data.budget - data.cost,
      });
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao tentar modificar o projeto");
    } finally {
      toggleProjectForm();
      setRemoveLoading(true);
    }
  };

  const addNewService = async (serviceData) => {
    setRemoveLoading(false);

    try {
      const updatedService = {
        ...serviceData,
        cost: parseFloat(serviceData.cost),
        project_id: id,
      };

      const updatedCost = project.cost + updatedService.cost;
      const updatedProjectAvailableBudget = project.budget - updatedCost;

      if (updatedCost > project.budget) {
        alert("O valor ultrapassa o orçamento");
        return;
      }

      const data = await addService(updatedService);
      setServices((prevState) => [...prevState, data]);
      setProject((prevState) => ({
        ...prevState,
        cost: updatedCost,
        availableBudget: updatedProjectAvailableBudget,
      }));

      navigate(`/project/${id}`, {
        state: { notification: "Serviço adicionado com sucesso!" },
      });
    } catch (err) {
      console.log(err);
      alert("Ocorreu um erro ao criar o projeto!");
    } finally {
      toggleServiceForm();
      setRemoveLoading(true);
    }
  };

  const removeService = async (serviceData) => {
    try {
      await deleteService(serviceData.id);

      const updatedServices = services.filter((s) => s.id !== serviceData.id);
      const updatedCost = project.cost - serviceData.cost;
      const updatedProjectAvailableBudget = project.budget - updatedCost;

      setProject((prevState) => ({
        ...prevState,
        cost: updatedCost,
        availableBudget: updatedProjectAvailableBudget,
      }));
      setServices(updatedServices);

      setNotification("Serviço removido com sucesso!");
      setTimeout(() => setNotification(null), 3500);
    } catch (err) {
      console.log(err);
      console.log("mensagem de erro:", err.message);
      alert("Ocorreu um erro ao tentar deletar um serviço");
    }
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
      {!removeLoading ? (
        <Loading />
      ) : (
        <section className="mx-12 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <Button onClick={toggleProjectForm} className="text-base">
              {!showProjectForm ? "Editar Projeto" : "Fechar"}
            </Button>
          </div>
          {!showProjectForm ? (
            <div className="border-b-2 pb-4">
              <ul className="flex flex-col gap-2">
                <li>
                  <span className="font-bold">Categoria:</span>{" "}
                  {project.category_name}
                </li>
                <li>
                  <span className="font-bold">Total Orçamento:</span> R$
                  {project.budget !== undefined &&
                    formatedNumeric(project.budget)}
                </li>
                <li>
                  <span className="font-bold">Gastos:</span> R${" "}
                  {project.cost !== undefined && formatedNumeric(project.cost)}
                </li>
                <li>
                  <span className="font-bold">Orçamento Disponível:</span> R$
                  {project.availableBudget &&
                    formatedNumeric(project.availableBudget)}
                </li>
              </ul>
            </div>
          ) : (
            <ProjectForm
              projectInfo={project}
              handleSubmit={updateProject}
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
            <div className="flex flex-wrap gap-2">
              {services && services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    name={service.title}
                    cost={Number(service.cost)}
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
      )}
    </>
  );
};

export default Project;
