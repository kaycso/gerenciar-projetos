import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormField from "./FormField";
import Button from "./ui/Button";

const NewProjectForm = ({ handleSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState({});

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
    if (!projectName || !budget || !category) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField
        id="projectName"
        label="Nome"
        type="text"
        placeholder="Insira o nome do projeto"
        value={projectName}
        onChange={(e) => {
          const name = e.target.value;
          setProjectName(name);
          setProject((props) => ({ ...props, name }));
        }}
      />
      <FormField
        id="budget"
        label="Orçamento"
        type="number"
        placeholder="Insira o orçamento total"
        value={budget}
        onChange={(e) => {
          const budget = e.target.value;
          setBudget(budget);
          setProject((props) => ({
            ...props,
            budget: parseFloat(budget) || 0,
          }));
        }}
      />
      <FormField
        id="category"
        label="Categoria"
        type="select"
        value={category}
        onChange={(e) => {
          const category = e.target.value;
          setCategory(category);
          setProject((props) => ({ ...props, category: category }));
        }}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </FormField>
      <Button type="submit">Criar Projeto</Button>
    </form>
  );
};

NewProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default NewProjectForm;
