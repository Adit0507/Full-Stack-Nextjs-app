import Image from "next/image";

const loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src="/public/assets/icons/loader.svg"
        alt="loader"
        className="object-contain"
        width={50}
        height={50}
      />
    </div>
  );
};

export default loading;
