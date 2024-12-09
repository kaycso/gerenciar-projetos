import PropTypes from "prop-types";

const Notification = ({ msg }) => {
  return (
    <div className="absolute left-1/2 top-0 z-10 mt-1 -translate-x-1/2 transform rounded border border-zinc-400 bg-white p-2 text-green-600">
      <p className="font-bold">{msg}</p>
    </div>
  );
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Notification;
