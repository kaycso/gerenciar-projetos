import PropTypes from "prop-types";

const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className="self-center rounded bg-zinc-900 px-4 py-2 text-lg font-bold text-white transition hover:text-amber-400"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
