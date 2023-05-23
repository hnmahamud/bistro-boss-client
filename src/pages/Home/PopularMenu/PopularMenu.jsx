import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "./MenuItem";

const PopularMenu = () => {
  const [popularMenu, setPopularMenu] = useState([]);
  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popular = data.filter((menu) => menu.category === "popular");
        setPopularMenu(popular);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="my-16 px-2">
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check it out"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-11">
        {popularMenu.length > 0 &&
          popularMenu.map((pm) => <MenuItem key={pm._id} pm={pm}></MenuItem>)}
      </div>
    </div>
  );
};

export default PopularMenu;
