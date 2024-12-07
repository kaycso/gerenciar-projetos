import PropTypes from "prop-types";

const Select = ({ children, id, onChange, value }) => {
  return (
    <select
      id={id}
      className="rounded border border-zinc-400 px-2 py-1"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Selecione a Categoria
      </option>
      {children}
    </select>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Select;
