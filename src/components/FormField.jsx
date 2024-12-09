import PropTypes from "prop-types";
import Input from "./ui/Input";
import Select from "./ui/Select";

const FormField = ({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xl font-bold">
        {label}
      </label>
      {type === "select" ? (
        <Select id={id} name={name} onChange={onChange} value={value}>
          {children}
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default FormField;
