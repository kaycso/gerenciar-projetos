import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-4 bg-zinc-900 p-6">
      <ul className="flex gap-6">
        <li>
          <a href="https://www.facebook.com" target="_blank">
            <FaFacebook size={24} color="white" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank">
            <FaInstagram size={24} color="white" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank">
            <FaLinkedin size={24} color="white" />
          </a>
        </li>
      </ul>
      <div>
        <p className="font-medium text-white">
          <span className="font-bold text-amber-400">Costs</span> © 2021
        </p>
      </div>
    </footer>
  );
};

export default Footer;
