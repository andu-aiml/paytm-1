import  Card  from "../components/Card";
import  Heading  from "../components/Heading";
import  InputBox  from "../components/Inputbox";
import  Button  from "../components/Button";

export default function SendMoney() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card>
        <Heading title="Send Money" />

        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <h3 className="font-semibold">Friend&apos;s Name</h3>
        </div>

        <div className="mt-4">
          <InputBox label="Amount (in Rs)" placeholder="Enter amount" />
        </div>

        <Button label="Initiate Transfer" />
      </Card>
    </div>
  );
}
