import { useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";
import PropTypes from "prop-types";

const ServiceForm = ({ handleSubmit, buttonText }) => {
  const [service, setService] = useState({
    title: "",
    cost: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (isNaN(parseFloat(service.cost)) || parseFloat(service.cost) <= 0) {
      alert("Insira um custo válido!");
      return;
    }

    if (!service.title || !service.cost || !service.description) {
      alert("Preencha todos os campos!");
      return;
    }

    await handleSubmit(service);

    setService({
      title: "",
      cost: "",
      description: "",
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField
        id="serviceName"
        type="text"
        name="title"
        label="Nome do serviço"
        value={service.title}
        placeholder="Insira o nome do serviço"
        onChange={handleChange}
      />
      <FormField
        id="serviceCost"
        type="number"
        name="cost"
        label="Custo do serviço"
        value={service.cost}
        placeholder="Insira o valor do serviço"
        onChange={handleChange}
      />
      <FormField
        id="serviceDescription"
        type="text"
        name="description"
        label="Descrição do serviço"
        value={service.description}
        placeholder="Insira a descrição do serviço"
        onChange={handleChange}
      />
      <Button>{buttonText}</Button>
    </form>
  );
};

ServiceForm.propTypes = {
  buttonText: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default ServiceForm;
