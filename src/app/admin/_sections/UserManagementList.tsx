import Button from "@/components/elements/Button";
import Link from "next/link";
import React from "react";

export default function UserManagementList({ data, refetch }: any) {
  return (
    <div>
      <h2>Users On Platform</h2>
      <UserCard slug="1" name="Name" email="Email" phone="Phone No." isBlock={null} />
      <UserCard slug="1" name="Name" email="Email" phone="Phone No." isBlock={true} />
    </div>
  );
}

function UserCard({ slug, name, email, phone, isBlock }: any) {
  return (
    <div className="grid grid-cols-12 rounded bg-white p-4 shadow">
      <Link href={slug ? `/admin/user/${slug}` : "#"} className="col-span-4">
        {name}
      </Link>
      <p className="col-span-4">{email}</p>
      <p className="col-span-4">{phone}</p>
      {isBlock !== null && (
        <Button variant={isBlock ? "white" : "orange"} className="col-span-4">
          {isBlock ? "Blocked" : "Active"}
        </Button>
      )}
    </div>
  );
}
