import Image from "next/image";
import React from "react";
import profileCharacter from "../../../public/character.png";

const AboutCoverSection: React.FC = () => {
  return (
    <section className="w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center">
        <Image
          src={profileCharacter}
          alt="Technorivals"
          className="w-4/5 xs:w-3/4 md:w-full h-full object-contain object-center"
          priority
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Where Code Meets Creativity
        </h2>
        <p className="font-medium mt-4 text-base">
          {`At Technorivals, we're passionate about pushing the boundaries of
          technology. Our team of developers and tech enthusiasts share
          insights, tutorials, and industry trends to help you stay ahead in the
          ever-evolving digital landscape. From cutting-edge frameworks to best
          coding practices, we're your go-to resource for all things
          development.`}
        </p>
      </div>
    </section>
  );
};

export default AboutCoverSection;
