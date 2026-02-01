import { useEffect, useState } from "react";
import api from "../api";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: ""
  });

  const loadData = async () => {
    const prodRes = await api.get(`/products?page=${page}&size=5`);
    setProducts(prodRes.data.content);

    const catRes = await api.get("/categories?page=0&size=10");
    setCategories(catRes.data.content);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  // CREATE
  const addProduct = async () => {
    await api.post("/products", form);
    resetForm();
    loadData();
  };

  // DELETE
  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadData();
  };

  // EDIT (fill form)
  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category.id
    });
  };

  // UPDATE
  const updateProduct = async () => {
    await api.put(`/products/${editingId}`, {
      name: form.name,
      price: form.price,
      quantity: form.quantity
    });
    resetForm();
    loadData();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      quantity: "",
      categoryId: ""
    });
  };

  return (
    <div>
      <h2>Products</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: e.target.value })}
      />

      <select
        value={form.categoryId}
        onChange={e => setForm({ ...form, categoryId: e.target.value })}
        disabled={editingId !== null}
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button onClick={editingId ? updateProduct : addProduct}>
        {editingId ? "Update Product" : "Add Product"}
      </button>

      {editingId && (
        <button onClick={resetForm}>Cancel</button>
      )}

      <ul>
        {products.map(p => (
<li className="product-item" key={p.id}>
  <div className="product-info">
    <strong>{p.name}</strong><br />
    Price: ₹{p.price} <br />
    Quantity: {p.quantity} <br />
    Category: {p.category.name}
  </div>

  <div className="product-actions">
    <button onClick={() => editProduct(p)}>Edit</button>
    <button
      className="delete"
      onClick={() => deleteProduct(p.id)}
    >
      Delete
    </button>
  </div>
</li>


        ))}
      </ul>

    <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 0))}>Prev</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>

    </div>
  );
}
