import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";
import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  console.log("id,name", id, name);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {success}
      <Card>
        <Heading title="Send Money" />

        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
            <span>{name.charAt(0).toUpperCase()}</span>
          </div>
          <h3 className="font-semibold">{name}</h3>
        </div>

        <div className="mt-4">
          <InputBox onChange={(e) => setAmount(e.target.value)} label="Amount (in Rs)" placeholder="Enter amount" />
        </div>

        <Button onClick={async () => {
          const token = localStorage.getItem("token");
          const response = await axios.post("http://localhost:3000/api/v1/accounts/transfer",{
                to: id,
                amount: amount
              },{headers: {
                Authorization: "Bearer " + token
              }}
          )
          if(response.status === 200){
            setSuccess("Transfer successful");
            navigate("/dashboard")
          }else{
            setSuccess("Transfer failed");
          }

        }} label="Initiate Transfer" />
      </Card>
    </div>
  );
}
