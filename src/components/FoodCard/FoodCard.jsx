import { useContext } from "react";
import { AuthContext } from "../../context/AuthProviders";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const { name, recipe, image, price } = item;

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = (menuItem) => {
    const item = {
      menuItemId: menuItem._id,
      userEmail: user?.email,
      name: menuItem.name,
      recipe: menuItem.recipe,
      image: menuItem.image,
      price: menuItem.price,
    };

    if (user && user?.email) {
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // refetch cart item by @tanstack/react-query
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Item added successfully",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location?.pathname }, { replace: true });
        }
      });
    }
  };
  return (
    <div className="card card-compact bg-base-100 shadow-md rounded-md border">
      <figure>
        <img src={image} />
      </figure>
      <p className="absolute right-5 top-5 bg-slate-900 text-white py-2 px-4">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
