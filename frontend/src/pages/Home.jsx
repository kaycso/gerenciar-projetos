import { Link } from "react-router";
import savings from "../assets/images/savings.svg";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">
            Bem-Vindo ao{" "}
            <span className="bg-zinc-900 p-1 text-amber-400">Costs</span>
          </h1>
          <p className="font-medium text-zinc-500">
            Comece a gerenciar seus projetos agora mesmo!
          </p>
        </div>
        <Link to="/newproject">
          <Button>Criar Projeto</Button>
        </Link>
      </div>
      <div className="">
        <img src={savings} alt="" width={365} />
      </div>
    </section>
  );
};

export default Home;
