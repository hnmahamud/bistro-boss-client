import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed py-14 md:py-28 my-16">
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check it out"
        clr="text-white"
      ></SectionTitle>
      <div className="text-white grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 md:gap-10 px-2 md:px-52 mt-11">
        <img src={featuredImage} alt="" />
        <div>
          <h4 className="text-2xl">
            March 20, 2023 <br /> WHERE CAN I GET SOME?
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-2 text-white mt-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
