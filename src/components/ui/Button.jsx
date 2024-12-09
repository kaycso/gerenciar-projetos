import PropTypes from "prop-types";

const Button = ({ children, type, className, onClick }) => {
  return (
    <button
      type={type}
      className={`self-center rounded bg-zinc-900 px-4 py-2 text-lg font-bold text-white transition hover:text-amber-400 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
