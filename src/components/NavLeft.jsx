import bikeIcon from "@/assets/bikeIcon.png";
import dumbellIcon from "@/assets/dumbellIcon.png";
import swimIcon from "@/assets/swimIcon.png";
import yogaIcon from "@/assets/yogaIcon.png";

const NavLeft = () => {
  const navItems = [
    {
      icon: bikeIcon,
      alt: "bicycle",
    },
    {
      icon: dumbellIcon,
      alt: "dumble",
    },
    {
      icon: swimIcon,
      alt: "swim",
    },
    {
      icon: yogaIcon,
      alt: "yoga",
    },
  ];

  return (
    <div>
      <div className="fixed top-0 left-0 flex flex-col w-24 h-full bg-black items-center justify-center gap-52 ">
        <div className="flex flex-col gap-4 ">
          {navItems.map((item) => (
            <div
              key={item.alt}
              className="w-8 h-8 rounded-md bg-white flex items-center justify-center cursor-pointer"
            >
              <img src={item.icon} alt={item.alt} className="w-6 h-6" />
            </div>
          ))}
        </div>
        <div className=" w-40 -rotate-90 text-white text-xs font-medium leading-normal">
          Copiryght, SportSee 2020
        </div>
      </div>
    </div>
  );
};

export { NavLeft };
