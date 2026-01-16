import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  Subheading  from "../components/Subheading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <Card>
        <Heading title="Sign Up" />
        <Subheading title="Enter your information to create an account" className="mt-2" />

        <div className="space-y-3 mt-4">
          <InputBox onChange={(e)=>{setfirstName(e.target.value)}} label="First Name" placeholder="John" />
          <InputBox onChange={(e)=>{setlastName(e.target.value)}} label="Last Name" placeholder="Doe" />
          <InputBox onChange={(e)=>{setuserName(e.target.value)}} label="Email" placeholder="johndoe@example.com" />
          <InputBox onChange={(e)=>{setpassword(e.target.value)}}label="Password" type="password" />
        </div>

        <Button onClick={async ()=>{
          axios.post("http://localhost:3000/api/v1/user/signup",{
            userName,
            firstName,
            lastName,
            password
          }).then((res)=>{
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
          }).catch((err)=>{
            console.log(err);
          })
            }} label="Sign Up" />

        <p className="text-sm text-center mt-3">
          Already have an account? <Link to="/signin" className="underline cursor-pointer">Login</Link>
        </p>
      </Card>
    </div>
  );
}
