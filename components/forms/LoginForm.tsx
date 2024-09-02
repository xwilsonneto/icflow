"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import Link from "next/link";

const ColabForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou senha incorretos"); // Mensagem de erro genérica
    } else if (!res?.error) {
      router.push("/");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <section className="mb-8 space-y-4">
          <h1 className="header">Ic-Flow</h1>
          <p className="text-dark-700">Organizando essa loucura.</p>
        </section>
        {error && <div><p className="text-dark-700">{error}</p></div>}
        <div className="flex flex-col gap-4">
          <label className="text-white size-3">Email:</label>
          <input
            type="text"
            placeholder="você@você.com"
            className="shad-input border-0 w-full pl-[14px] rounded-md"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white size-3">Senha:</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              className="shad-input border-0 w-full pl-[14px] rounded-md"
              name="password"
            />
            <button
              className="w-2/12 bg-dark-400 flex items-center justify-center transition duration-150 ease hover:bg-[#1A1A1A]"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="shad-primary-btn rounded-md h-[36px] w-full transition"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Login"}
        </Button>
        <Link href="/register">
          <p className="text-white text-14-regular mt-4">Primeiro acesso? <b>Registre-se</b></p>
        </Link>
      </form>
    </section>
  );
};

export default ColabForm;
