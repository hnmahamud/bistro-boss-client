import { useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logRegImg from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Registration = () => {
  // Context API
  const { createUser, profileUpdate, setLoading } = useAuth();

  // state
  const [error, setError] = useState("");
  const [nLoading, setNLoading] = useState(false);

  // Use Location for redirect target page or home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  // Registration with email password
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const photo = data.photoUrl;
    const password = data.password;

    setNLoading(true);

    // Create user
    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // Update user profile
        profileUpdate(name, photo)
          .then(() => {
            const saveUser = { name: data.name, email: data.email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
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
                    title: "Registration successful!",
                  });
                  setLoading(false);
                  setNLoading(false);
                  navigate(from, { replace: true });
                }
              })
              .catch((error) => {
                setLoading(false);
                setNLoading(false);
                console.log(error);
                setError(error);
              });
          })
          .catch((error) => {
            setLoading(false);
            setNLoading(false);
            console.log(error);
            setError(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setNLoading(false);
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign up</title>
      </Helmet>
      <div className="my-8 border shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-center md:items-center my-8 gap-4 p-2">
          <div className="card max-w-lg order-2 md:ml-12 md:order-1">
            <div className="card-body rounded-md border">
              <h1 className="text-center text-2xl text-gray-500 font-extrabold mb-4">
                Sign up
              </h1>
              <p className="text-red-600">{error}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    {...register("photoUrl")}
                    name="photoUrl"
                    type="url"
                    placeholder="Photo URL"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      pattern:
                        /(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/i,
                    })}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600" role="alert">
                      Password should be at least 6 character long, one special
                      character, one upper and lower case letter and at least
                      one digit.
                    </p>
                  )}
                  <label className="label justify-end">
                    <Link className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control">
                  {nLoading ? (
                    <button className="bg-[#D1A054] w-full rounded-lg text-white border border-gray-200 p-2">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#D1A054] hover:bg-[#ac7c36] w-full text-white font-semibold border rounded-lg"
                    >
                      <div className="flex justify-center items-center space-x-4 p-2">
                        Sign up
                      </div>
                    </button>
                  )}
                </div>
              </form>
              <p className="text-[#D1A054] text-center mt-4">
                <span>Already registered?</span>
                <Link to="/login" className="font-semibold ml-2">
                  Go to log in
                </Link>
              </p>
              <div className="divider">Or sign in with</div>
              <div className="text-center space-x-4">
                <button className="border border-gray-500 rounded-full hover:bg-gray-300 p-2">
                  <FaFacebookF className="h-4 w-4"></FaFacebookF>
                </button>
                <button className="border border-gray-500 rounded-full hover:bg-gray-300 p-2">
                  <FaGoogle className="h-4 w-4"></FaGoogle>
                </button>
                <button className="border border-gray-500 rounded-full hover:bg-gray-300 p-2">
                  <FaGithub className="h-4 w-4"></FaGithub>
                </button>
              </div>
            </div>
          </div>
          <div className="md:ml-16 order-1 md:order-2">
            <img src={logRegImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
