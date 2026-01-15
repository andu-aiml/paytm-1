export default function Subheading({ title, className = "" }) {
  return (
    <p className={`text-gray-500 text-center ${className}`}>
      {title}
    </p>
  );
}
