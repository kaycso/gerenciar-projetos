import { useEffect, useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
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

  return (
    <form action="" className="flex flex-col gap-4">
      <FormField
        id="projectName"
        label="Nome"
        type="text"
        placeholder="Insira o nome do projeto"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <FormField
        id="budget"
        label="Orçamento"
        type="text"
        placeholder="Insira o orçamento total"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <FormField
        id="category"
        label="Categoria"
        type="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </FormField>
      <Button type="submit">Criar Projeto</Button>
    </form>
  );
};

export default NewProjectForm;
