// use this function to fetch the orders.
import { useEffect, useState } from "react";
import { ApiOrder, ApiOrderItem, getOrders } from "../../api/api";
import styles from "./OrdersList.module.css";
import { Button } from "../Button/Button";

export function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    }

    fetchOrders();
  });

  const totalProducts = (products: ApiOrderItem[]) => {
    const totalQuantity = products.reduce(
      (total, product) => total + product.quantity,
      0
    );

    const totalPrice = products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );

    return { totalQuantity, totalPrice };
  };

  return (
    <div>
      <h1>Orders List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {orders.map((order: ApiOrder) => (
            <div key={order.id} className={styles.orderItemContainer}>
              <h2>Order number: {order.id}</h2>
              <p>Date created: {order.created_at}</p>
              <p>Customer name: {order.first_name + " " + order.last_name}</p>
              <p>
                Total products: {totalProducts(order.products).totalQuantity}
              </p>
              <p>Total price: {totalProducts(order.products).totalPrice}</p>
              <Button
                variant="primary"
                onClick={() => alert(`Order: ${order.id}`)}
              >
                <span>Order info</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
