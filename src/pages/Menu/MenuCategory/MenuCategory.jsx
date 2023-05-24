import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, subTitle, img }) => {
  return (
    <div>
      {title && <Cover img={img} title={title} subTitle={subTitle}></Cover>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-11">
        {items.length > 0 &&
          items.map((item) => <MenuItem key={item._id} item={item}></MenuItem>)}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={`/order/${title}`}
          className="btn btn-outline border-0 border-b-2 text-center mt-4"
        >
          ORDER YOUR FAVOURITE FOOD
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
