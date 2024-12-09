import loading from "../assets/images/loading.svg";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img src={loading} alt="carregando" className="w-[50px]" />
    </div>
  );
};

export default Loading;
