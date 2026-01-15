import { onClick } from "react";

export default function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:opacity-90">
      {label}
    </button>
  );
}
