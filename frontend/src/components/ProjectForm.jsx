import { useEffect, useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";
import PropTypes from "prop-types";
import { getCategories } from "../api/services/categoryServices";

const ProjectForm = ({ projectInfo, handleSubmit, buttonText }) => {
  const [project, setProject] = useState({
    title: projectInfo?.title || "",
    budget: projectInfo?.budget || "",
    category_id: projectInfo?.category_id || "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        alert("Não foi possível carregar as categorias", err.message);
      }
    };

    fetchCategories();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!project.title || !project.budget || !project.category_id) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField
        id="projectName"
        label="Nome do Projeto"
        type="text"
        placeholder="Insira o nome do projeto"
        value={project.title}
        onChange={(e) => {
          setProject((prevProject) => ({
            ...prevProject,
            title: e.target.value,
          }));
        }}
      />
      <FormField
        id="budget"
        label="Orçamento"
        type="number"
        placeholder="Insira o orçamento total"
        value={project.budget}
        onChange={(e) => {
          setProject((prevProject) => ({
            ...prevProject,
            budget: parseFloat(e.target.value),
          }));
        }}
      />
      <FormField
        id="category"
        label="Categoria"
        type="select"
        value={project.category_id}
        onChange={(e) => {
          setProject((prevProject) => ({
            ...prevProject,
            category_id: e.target.value,
          }));
        }}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </FormField>
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

ProjectForm.propTypes = {
  projectInfo: PropTypes.object,
  handleSubmit: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ProjectForm;
