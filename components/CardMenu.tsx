import clsx from "clsx";
import Image from "next/image";

type CardMenuProps = {
  label: string;
  icon: string;
  menuItem: string;
};

const CardMenu = ({ label, icon, menuItem }: CardMenuProps) => {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="card"
          className="size-8 w-fit"
        />
        <h2 className="text-24-bold text-white">{menuItem}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default CardMenu;