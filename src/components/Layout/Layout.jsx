import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="p-8  min-h-screen flex bg-black text-white flex-col">
      <header className="mb-8">
        <Link to={"/"}>
          <h1 className="text-6xl font-bebas text-red-600">Movie Sagas</h1>
        </Link>
      </header>
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}
