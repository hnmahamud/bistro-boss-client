import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

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
        axiosSecure.delete(`/menu/${item._id}`).then((data) => {
          if (data.data.deletedCount === 1) {
            refetch();
            Swal.fire("Deleted!", "Item has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <div className="w-full space-y-8 my-8">
        <SectionTitle
          heading="Manage All Items"
          subHeading="Hurry up"
        ></SectionTitle>
        <div className="overflow-x-auto w-[80%] mx-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td className="text-right">${item.price}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm bg-[#D1A054] hover:bg-[#b4843d] text-white">
                      <FaEdit></FaEdit>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost btn-sm bg-red-500 hover:bg-red-700 text-white"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageItems;
