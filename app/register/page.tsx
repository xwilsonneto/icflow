import Signup from "@/components/forms/RegisterForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/icons/iclogobranca.png"
            height={1000}
            width={1000}
            alt="colabs"
            className="mb-12 h-10 w-fit"
          />
          <Signup />

          <div className="text-14-regular mt-12 flex justify-between">
           <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 The Experience Lab.
           </p>
          </div>
        </div>
      </section>
      <Image 
        src="/assets/images/equipe.png"
        height={1000}
        width={1000}
        alt="equipe"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}