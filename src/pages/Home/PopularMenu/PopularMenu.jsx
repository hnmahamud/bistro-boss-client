import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <div className="my-16 px-2">
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check it out"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-11">
        {popular.length > 0 &&
          popular.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
      </div>
    </div>
  );
};

export default PopularMenu;
