export default function InputBox({ label, placeholder, type = "text" }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
