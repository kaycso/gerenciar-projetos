import PropTypes from "prop-types";

const Input = ({ id, type = "text", placeholder, value, onChange, name }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="rounded border border-zinc-400 px-2 py-1"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default Input;
