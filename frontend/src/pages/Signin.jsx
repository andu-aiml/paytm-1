import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  Subheading  from "../components/Subheading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";

export function Signin() {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <Card>
        <Heading title="Sign In" />
        <Subheading title="Enter your credentials to access your account" className="mt-2" />

        <div className="space-y-3 mt-4">
          <InputBox label="Email" placeholder="johndoe@example.com" />
          <InputBox label="Password" type="password" />
        </div>

        <Button label="Sign In" />

        <p className="text-sm text-center mt-3">
          Don&apos;t have an account? <span className="underline cursor-pointer">Sign Up</span>
        </p>
      </Card>
    </div>
  );
}
