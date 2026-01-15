import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  Subheading  from "../components/Subheading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <Card>
        <Heading title="Sign In" />
        <Subheading title="Enter your credentials to access your account" className="mt-2" />

        <div className="space-y-3 mt-4">
          <InputBox onChange={(e)=>{setuserName(e.target.value)}} label="Email" placeholder="johndoe@example.com" />
          <InputBox onChange={(e)=>{setpassword(e.target.value)}} label="Password" type="password" />
        </div>

        <Button onClick={()=>{
          console.log("username,password",userName,password);
          axios.post("http://localhost:3000/api/v1/user/signin",{
            userName,
            password
          }).then((res)=>{
            console.log("res",res);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
          }).catch((err)=>{
            console.log(err);
          })
        }} label="Sign In" />

        <p className="text-sm text-center mt-3">
          Don&apos;t have an account? <span className="underline cursor-pointer">Sign Up</span>
        </p>
      </Card>
    </div>
  );
}
