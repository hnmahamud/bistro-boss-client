import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [axiosSecure] = useAxiosSecure();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostingToken}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const newItem = {
            name: data.name,
            recipe: data.recipe,
            image: result.data.display_url,
            category: data.category.toLowerCase(),
            price: parseFloat(data.price),
          };
          axiosSecure
            .post("/menu", newItem)
            .then((data) => {
              reset();
              console.log(data);
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
                title: "Menu added successful!",
              });
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full px-10">
      <SectionTitle
        subHeading="What's new"
        heading="Add an item"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Recipe Name*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("name", { maxLength: 120 })}
            className="input input-bordered w-full "
            required
          />
          {errors.name?.type === "maxLength" && (
            <p className="text-red-600" role="alert">
              Name should be maximum 120 character long
            </p>
          )}
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered"
              required
            >
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Dessert</option>
              <option>Drinks</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price")}
              placeholder="Type here"
              className="input input-bordered w-full "
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            {...register("recipe")}
            className="textarea textarea-bordered h-24"
            placeholder="Details"
            required
          ></textarea>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        <button className="btn mt-4" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
