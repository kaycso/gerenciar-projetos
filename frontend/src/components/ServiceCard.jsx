import PropTypes from "prop-types";
import { LuTrash2 } from "react-icons/lu";

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className="flex w-[250px] flex-col gap-6 rounded border border-zinc-300 bg-white p-4 transition hover:shadow-md">
      <h3 className="text-2xl font-bold">{name}</h3>
      <div>
        <p>
          <span className="font-bold">Custo Total:</span> R${cost},00
        </p>
        <p>{description}</p>
      </div>
      <div className="flex flex-1 items-end">
        <button
          onClick={remove}
          className="flex flex-1 items-center justify-center gap-2 rounded border border-zinc-300 bg-white px-4 py-2 font-medium duration-300 hover:bg-zinc-900 hover:text-amber-400"
        >
          <LuTrash2 />
          Excluir
        </button>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.number,
  description: PropTypes.string,
  handleRemove: PropTypes.func,
};

export default ServiceCard;
