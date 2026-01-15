export default function Card({ children }) {
  return (
    <div className="bg-white w-11/12 md:w-96 p-6 rounded-xl shadow-2xl">
      {children}
    </div>
  );
}
