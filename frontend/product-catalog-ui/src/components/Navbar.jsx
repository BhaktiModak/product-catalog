import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Product Catalog</h2>
      <div>
        <Link to="/">Products</Link>
        <Link to="/categories">Categories</Link>
      </div>
    </nav>
  );
}
