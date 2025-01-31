import { useAdminBlockUsers } from "@/app/_queryCall/adminAuth/user";
import Button from "@/components/elements/Button";
import { TextareaAutoGrowing } from "@/components/elements/Input";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function UserCard({
  id,
  slug,
  name,
  email,
  phone,
  isVerified,
  isBlock,
  selectedUserId,
  setSelectedUserId,
  refetchData,
}: any) {
  const [addAdminNote, setAddAdminNote] = useState(false);

  const { adminBlockUsers, data, loading, error } = useAdminBlockUsers();
  function handleSubmit(e: any) {
    e.preventDefault();
    // console.log(e.target[0].value, id);
  }
  function handleDelete() {
    setAddAdminNote(false);
  }
  async function handleBlockUser() {
    await adminBlockUsers([{ userId: id, block: !isBlock }]);
    refetchData();
  }
  return (
    <div className="text-wrap rounded bg-white p-4 shadow">
      <div className="grid grid-cols-12 gap-1">
        <h6
          onClick={() => setSelectedUserId(id)}
          className="col-span-3 flex cursor-pointer items-center gap-2 font-medium text-bg1"
        >
          {selectedUserId === id ? <FaCircleArrowRight className="text-2xl" /> : ""}
          {name}
        </h6>
        <div className="col-span-5">
          <p>{email}</p>
          <p>{phone}</p>
        </div>
        <Button variant={isVerified ? "orange" : "white"} className="col-span-2 my-auto h-min">
          {isVerified ? " Verified User" : " Unverified User"}
        </Button>
        {isBlock !== null && (
          <Button
            variant={isBlock ? "white" : "orange"}
            className="col-span-2 my-auto h-min"
            onClick={handleBlockUser}
          >
            {isBlock ? "Blocked User" : "Active User"}
          </Button>
        )}
      </div>
      <div className="">
        {!addAdminNote && (
          <p
            className="flex cursor-pointer items-center gap-2 text-blue-500 hover:underline"
            onClick={() => setAddAdminNote(!addAdminNote)}
            title="Add Admin Note"
          >
            <AiOutlinePlusCircle />
            <span>Add Admin Note</span>
          </p>
        )}
        {addAdminNote && (
          <form className="grid grid-cols-12 gap-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="col-span-9">
              <TextareaAutoGrowing rows={3} label="Admin Note" placeholder=" " />
            </div>
            <div className="col-span-3 space-y-3 pt-2">
              <Button type="submit" variant="orange-gradient" className="w-full">
                Send
              </Button>
              <Button variant="white" className="w-full" onClick={() => handleDelete()}>
                Delete
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
