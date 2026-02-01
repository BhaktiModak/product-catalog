import { useEffect, useState } from "react";
import api from "../api";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadCategories = async () => {
    const res = await api.get("/categories?page=0&size=10");
    setCategories(res.data.content);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    await api.post("/categories", { name, description });
    setName("");
    setDescription("");
    loadCategories();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    loadCategories();
  };

  return (
    <div>
      <h2>Categories</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map(c => (
          <li className="category-item" key={c.id}>
  <div className="category-info">
    <strong>{c.name}</strong>
  </div>

  <div className="category-actions">
    <button
      className="delete"
      onClick={() => deleteCategory(c.id)}
    >
      Delete
    </button>
  </div>
</li>

        ))}
      </ul>
    </div>
  );
}
