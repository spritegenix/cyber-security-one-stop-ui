import { AdminNoticeInput, useAdminManageNotices } from "@/app/_queryCall/adminAuth/adminTalk";
import {
  useAdminBlockBusinesses,
  useAdminVerifyBusinesses,
} from "@/app/_queryCall/adminAuth/business";
import Button from "@/components/elements/Button";
import { TextareaAutoGrowing } from "@/components/elements/Input";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function BusinessCard({
  id,
  slug,
  name,
  email,
  phone,
  isVerified,
  isBlock,
  adminNotice,
  selectedUserId,
  setSelectedUserId,
  refetchData,
}: any) {
  const [addAdminNote, setAddAdminNote] = useState(!!adminNotice?.id || false);
  const [noteValue, setNoteValue] = useState(adminNotice?.note || "");
  const { adminManageNotices, data, loading, error } = useAdminManageNotices();

  const { adminBlockBusinesses } = useAdminBlockBusinesses();
  const { adminVerifyBusinesses } = useAdminVerifyBusinesses();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newNotice: AdminNoticeInput = {
      id: adminNotice?.id || undefined,
      note: noteValue,
      businessId: id,
      toDelete: false,
      type: "INDIVIDUAL_BUSINESS",
    };
    await adminManageNotices([newNotice]);
    await refetchData();
  }

  async function handleDelete() {
    const newNotice = {
      id: adminNotice?.id || undefined,
      toDelete: true,
    };
    await adminManageNotices([newNotice]);
    await refetchData();
    setAddAdminNote(false);
    setNoteValue("");
  }

  async function handleBlockUser() {
    await adminBlockBusinesses([{ businessId: id, block: !isBlock }]);
    refetchData();
  }

  async function handleVerifyBackUser() {
    await adminVerifyBusinesses([{ businessId: id, verify: !isVerified }]);
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
        <Button
          variant={isVerified ? "orange" : "white"}
          className="col-span-2 my-auto h-min"
          onClick={handleVerifyBackUser}
        >
          {isVerified ? "Verified User" : "Unverified User"}
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
            onClick={() => setAddAdminNote(true)}
            title="Add Admin Note"
          >
            <AiOutlinePlusCircle />
            <span>Add Admin Note</span>
          </p>
        )}
        {addAdminNote && (
          <form className="grid grid-cols-12 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-9">
              <TextareaAutoGrowing
                rows={3}
                label="Admin Note"
                placeholder=" "
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
              />
            </div>
            <div className="col-span-3 space-y-3 pt-2">
              <Button type="submit" variant="orange-gradient" className="w-full" disabled={loading}>
                Send
              </Button>
              <Button variant="white" className="w-full" onClick={handleDelete} disabled={loading}>
                Delete
              </Button>
            </div>
            {data && <p className="col-span-12 text-xs text-green-500">{data?.[0]?.message}</p>}
            {error && <p className="col-span-12 text-xs text-red-500">{error?.message}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
