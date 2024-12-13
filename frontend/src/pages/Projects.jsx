import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import {
  getProjects,
  deleteProjectById,
} from "../api/services/projectServices";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.notification) {
      setNotification(location.state.notification);
      setTimeout(() => {
        setNotification(null);
        navigate("/projects", { replace: true, state: {} });
      }, 5000);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setRemoveLoading(false);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setRemoveLoading(true);
      }
    };

    fetchProjects();
  }, []);

  const removeProject = async (id) => {
    try {
      await deleteProjectById(id);
      setProjects(projects.filter((project) => project.id !== id));
      setNotification("Projeto Removido com Sucesso!");
      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      setError(err);
      setNotification(err.message);
      setTimeout(() => setNotification(null), 5000);
      console.log(err);
    }
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
      <section className="mx-12 flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Meus Projetos</h1>
          <Link to="/newproject">
            <Button>Criar Projeto</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 rounded">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.title}
                budget={project.budget}
                category={project.category_name}
                handleRemove={removeProject}
              />
            ))
          ) : (
            <p>Não há nenhum projeto cadastrado</p>
          )}
          {!removeLoading && <Loading />}
        </div>
      </section>
    </>
  );
};

export default Projects;
