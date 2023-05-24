const FoodCard = ({ item }) => {
  const { name, recipe, image, price } = item;
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
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
