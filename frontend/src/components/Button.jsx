export default function Button({ label }) {
  return (
    <button className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:opacity-90">
      {label}
    </button>
  );
}
