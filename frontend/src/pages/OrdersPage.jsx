import React, { useEffect, useState } from "react";
import { fetchOrders, fetchProductById } from "../api";

// Helper untuk format Rupiah
const formatRupiah = (value) => {
  return typeof value === "number" ? "Rp" + value.toLocaleString() : "Rp0";
};

// Helper untuk format waktu UTC+8
const formatUTCPlus8 = (utcDate) => {
  const date = new Date(utcDate);
  const options = { 
    weekday: "short", year: "numeric", month: "short", day: "numeric", 
    hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Asia/Jakarta" 
  };
  return date.toLocaleString("en-GB", options); // Returns formatted date with timezone
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [products, setProducts] = useState({}); // Simpan data produk berdasarkan ID

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch data orders:", error);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      // Ambil produk yang belum ada di state `products`
      const productPromises = orders.flatMap((order) =>
        order.or_products
          .filter((item) => !products[item.or_pd_id]) // Hanya yang belum ada di state
          .map(async (item) => {
            const product = await fetchProductById(item.or_pd_id);
            setProducts((prevState) => ({
              ...prevState,
              [item.or_pd_id]: product,
            }));
          })
      );
      await Promise.all(productPromises);
    };

    if (orders.length > 0) {
      getProducts();
    }
  }, [orders, products]); // Hanya update produk jika ada perubahan pada orders

  return (
    <div style={{ padding: "20px" }}>
      <h2>List of Orders</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: "20px",
            padding: "10px",
          }}
        >
          <h4>Order #{index + 1}</h4>
          <p>
            <strong>Total Qty:</strong> {order.or_total_qty}
          </p>
          <p>
            <strong>Total Amount:</strong> {formatRupiah(order.or_amount)}
          </p>
          <p>
            <strong>Order Created At:</strong> {formatUTCPlus8(order.or_created_at)}
          </p>
          <button onClick={() => setSelectedOrder(order)}>Details</button>
        </div>
      ))}

      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ backgroundColor: "white", padding: "20px", width: "400px" }}>
            <h3>Detail Order</h3>
            <ul>
              {selectedOrder.or_products.map((item, i) => {
                const product = products[item.or_pd_id];
                return (
                  <li key={i}>
                    {product ? (
                      <>
                        {product.pd_name} ({item.or_pd_qty} pcs) -{" "}
                        {formatRupiah(product.pd_price)}
                      </>
                    ) : (
                      "Loading Product..."
                    )}
                  </li>
                );
              })}
            </ul>
            <p>
              <strong>Total Qty:</strong> {selectedOrder.or_total_qty}
            </p>
            <p>
              <strong>Total Amount:</strong> {formatRupiah(selectedOrder.or_amount)}
            </p>
            <button onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
