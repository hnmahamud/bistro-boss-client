import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ item }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {item.map((item) => (
        <FoodCard key={item.id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
