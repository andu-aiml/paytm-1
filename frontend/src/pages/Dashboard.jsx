import  AppBar  from "../components/Appbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <AppBar />

      <div className="p-4">
        <h2 className="font-bold text-lg">Your Balance $5000</h2>

        <h3 className="font-semibold mt-4">Users</h3>

        <input
          placeholder="Search users..."
          className="w-full border rounded-lg px-3 py-2 mt-2"
        />

        <div className="mt-4 space-y-3">
          {["User 1", "User 2", "User 3"].map((user, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  U{i + 1}
                </div>
                <span>{user}</span>
              </div>
              <button className="bg-black text-white px-4 py-1 rounded-lg">
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
