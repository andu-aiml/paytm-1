import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  Subheading  from "../components/Subheading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";

export function Signup() {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <Card>
        <Heading title="Sign Up" />
        <Subheading title="Enter your information to create an account" className="mt-2" />

        <div className="space-y-3 mt-4">
          <InputBox label="First Name" placeholder="John" />
          <InputBox label="Last Name" placeholder="Doe" />
          <InputBox label="Email" placeholder="johndoe@example.com" />
          <InputBox label="Password" type="password" />
        </div>

        <Button label="Sign Up" />

        <p className="text-sm text-center mt-3">
          Already have an account? <span className="underline cursor-pointer">Login</span>
        </p>
      </Card>
    </div>
  );
}
