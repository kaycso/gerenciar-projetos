import PropTypes from "prop-types";
import Input from "./ui/Input";
import Select from "./ui/Select";

const FormField = ({
  id,
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
        <Select id={id} onChange={onChange} value={value}>
          {children}
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default FormField;
