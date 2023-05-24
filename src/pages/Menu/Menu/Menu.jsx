import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";

import menuImg from "../../../assets/menu/menu-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const soups = menu.filter((item) => item.category === "soup");

  return (
    <div className=" space-y-8">
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* Main Cover */}
      <Cover
        img={menuImg}
        title="OUR MENU"
        subTitle="Would you like to try a dish?"
      ></Cover>

      {/* Offered Section */}
      <SectionTitle
        heading="TODAYS OFFER"
        subHeading="Dont Miss"
      ></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>

      {/* Desserts Section */}
      <MenuCategory
        items={desserts}
        title="desserts"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, dolores!"
        img={dessertImg}
      ></MenuCategory>

      {/* Pizzas Section */}
      <MenuCategory
        items={pizzas}
        title="pizzas"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, dolores!"
        img={pizzaImg}
      ></MenuCategory>

      {/* Salad Section */}
      <MenuCategory
        items={salads}
        title="salads"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, dolores!"
        img={saladImg}
      ></MenuCategory>

      {/* Soups Section */}
      <MenuCategory
        items={soups}
        title="soups"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, dolores!"
        img={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
