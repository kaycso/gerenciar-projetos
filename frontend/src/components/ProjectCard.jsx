import PropTypes from "prop-types";
// import { FaCircle } from "react-icons/fa";
import { LuPen, LuTrash2 } from "react-icons/lu";
import { FaCircle } from "react-icons/fa6";
import { Link } from "react-router";

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className="flex max-w-min flex-col gap-6 rounded border border-zinc-300 bg-white p-4 transition hover:shadow-md">
      <Link to={`/project/${id}`}>
        <h2 className="text-2xl font-bold">{name}</h2>
      </Link>
      <div className="flex flex-col gap-2">
        <p>
          <span className="font-bold">Orçamento:</span> R${" "}
          {budget.toLocaleString("pt-Br")}
        </p>
        <div className="flex items-center gap-1">
          <FaCircle size={12} />
          <p className="font">{category}</p>
        </div>
      </div>
      <div className="flex flex-1 items-end gap-2">
        <Link to={`/project/${id}`}>
          <button className="flex items-center gap-2 rounded border border-zinc-300 bg-white px-4 py-2 font-medium duration-300 hover:bg-zinc-900 hover:text-amber-400">
            <LuPen />
            Editar
          </button>
        </Link>
        <button
          onClick={remove}
          className="flex items-center gap-2 rounded border border-zinc-300 bg-white px-4 py-2 font-medium duration-300 hover:bg-zinc-900 hover:text-amber-400"
        >
          <LuTrash2 />
          Excluir
        </button>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  budget: PropTypes.number,
  category: PropTypes.string,
  handleRemove: PropTypes.func,
};

export default ProjectCard;
