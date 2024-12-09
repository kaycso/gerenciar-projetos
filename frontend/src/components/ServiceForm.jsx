import { useState } from "react";
import FormField from "./FormField";
import Button from "./ui/Button";
import PropTypes from "prop-types";

const ServiceForm = ({ handleSubmit, buttonText }) => {
  const [services, setServices] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!services.name || !services.cost || !services.description) {
      alert("Preencha todos os campos!");
      return;
    }

    handleSubmit(services);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField
        id="serviceName"
        type="text"
        name="name"
        label="Nome do serviço"
        value={services.name}
        placeholder="Insira o nome do serviço"
        onChange={handleChange}
      />
      <FormField
        id="serviceCost"
        type="number"
        name="cost"
        label="Custo do serviço"
        value={services.cost}
        placeholder="Insira o valor do serviço"
        onChange={handleChange}
      />
      <FormField
        id="serviceDescription"
        type="text"
        name="description"
        label="Descrição do serviço"
        value={services.description}
        placeholder="Insira o nome do serviço"
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
