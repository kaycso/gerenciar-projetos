import { useEffect, useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";
import PropTypes from "prop-types";

const ProjectForm = ({ projectInfo, handleSubmit, buttonText }) => {
  const [project, setProject] = useState({
    name: projectInfo?.name || "",
    budget: projectInfo?.budget || "",
    category: projectInfo?.category || "",
    cost: projectInfo?.cost || 0,
    services: projectInfo?.services || []
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!project.name || !project.budget || !project.category) {
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
        value={project.name}
        onChange={(e) => {
          setProject((prevProject) => ({
            ...prevProject,
            name: e.target.value,
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
            budget: Number(e.target.value),
          }));
        }}
      />
      <FormField
        id="category"
        label="Categoria"
        type="select"
        value={project.category}
        onChange={(e) => {
          setProject((prevProject) => ({
            ...prevProject,
            category: e.target.value,
          }));
        }}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
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
