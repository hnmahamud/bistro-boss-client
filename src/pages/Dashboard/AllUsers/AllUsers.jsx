import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUser, FaUserSecret } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/users");
      return response.json();
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are giving admin power to a normal user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire(`The user ${user.name} is an admin now!`, "success");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <div className="overflow-x-auto w-[80%] mx-auto space-y-4">
        <h2 className="text-2xl font-semibold uppercase">
          Total Users: {users && users.length}
        </h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <th>
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-ghost hover:bg-success hover:text-white rounded-full tooltip"
                        data-tip="Admin"
                      >
                        <FaUserSecret></FaUserSecret>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost hover:bg-error hover:text-white rounded-full tooltip"
                        data-tip="User"
                      >
                        <FaUser></FaUser>
                      </button>
                    )}
                  </th>
                  <th>
                    <button className="btn btn-ghost hover:bg-error hover:text-white rounded-full">
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

export default AllUsers;
