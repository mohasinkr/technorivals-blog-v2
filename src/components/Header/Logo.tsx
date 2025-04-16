import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
      <div className="flex items-center justify-center w-12 md:w-16 h-12 md:h-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray mr-2 md:mr-4 bg-dark dark:bg-light">
        <span className="font-bold text-light dark:text-dark text-xl md:text-2xl">
          TR
        </span>
      </div>
      <span className="font-bold dark:font-semibold text-lg md:text-xl">
        Technorivals
      </span>
    </Link>
  );
};

export default Logo;
