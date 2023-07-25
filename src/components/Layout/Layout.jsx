export default function Layout({ children }) {
  return (
    <div className="p-8  min-h-screen flex bg-black text-white flex-col">
      <header className="mb-8">
        <h1 className="text-6xl font-bebas text-red-600">Movie Sagas</h1>
      </header>
      <div>{children}</div>
    </div>
  );
}
