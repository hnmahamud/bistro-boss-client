import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();

  const initialValue = 0;
  const totalPrice = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | My-Cart</title>
      </Helmet>

      <div className="overflow-x-auto w-[80%] mx-auto space-y-4">
        <div className="font-semibold uppercase md:flex md:justify-evenly md:items-center md:gap-4">
          <h2>Total Orders: {cart && cart.length}</h2>
          <h2>Total Price: {totalPrice}</h2>
          <button className="bg-[#D1A054] hover:bg-[#b58236] text-white border-none btn btn-xs">
            Pay
          </button>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost hover:bg-error hover:text-white rounded-full"
                    >
                      <FaTrashAlt className="text-xl"></FaTrashAlt>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCart;
