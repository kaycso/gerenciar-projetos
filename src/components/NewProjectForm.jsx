import { useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

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
        <option value="Infra">Infra</option>
        <option value="Desenvolvimento">Desenvolvimento</option>
        <option value="Design">Design</option>
        <option value="Planejamento">Planejamento</option>
      </FormField>
      <Button type="submit">Criar Projeto</Button>
    </form>
  );
};

export default NewProjectForm;
