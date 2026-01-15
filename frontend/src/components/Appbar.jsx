export default function AppBar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-bold text-xl">Payments App</h1>
      <div className="flex items-center gap-2">
        <span>Hello, User</span>
        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
          U
        </div>
      </div>
    </div>
  );
}
