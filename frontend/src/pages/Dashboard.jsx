import { useState, useEffect } from "react";
import  AppBar  from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchBalance = async ()=>{
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/accounts/balance",{
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setBalance(response.data.balance);
    }
    const fetchName = async ()=>{
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/user/me",{
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setName(response.data.firstName);
    }
    fetchBalance();
    fetchName();
    console.log("name useeffect", name);
    console.log("balance useeffect", balance);
  }, [balance, name])

  useEffect(()=>{
    const fetchData = async ()=>{
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/v1/user/all",{
      headers: {
        Authorization: "Bearer " + token
      },
      params: {
        search: search
      }
    });
    setUsers(response.data);
  }
  fetchData();
} ,[search])
  console.log(users);
  return (
    <div className="min-h-screen">
      <AppBar name={name} />

      <div className="p-4">
        <h2 className="font-bold text-lg">Your Balance Rs.{balance.toFixed(2)}</h2>

        <h3 className="font-semibold mt-4">Users</h3>

        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full border rounded-lg px-3 py-2 mt-2"
        />

        <div className="mt-4 space-y-3">
          {users.map((user, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>{user.firstName[0]}</span>
                </div>
                <span>{user.firstName}</span>
              </div>
              <button onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)} className="bg-black text-white px-4 py-1 rounded-lg">
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
