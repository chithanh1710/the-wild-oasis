import Image from "next/image";
import { ReactNode } from "react";
import { updateProfile } from "../account/profile/actions";
import { Button } from "./Button";

export default function UpdateForm({
  children,
  guest,
}: {
  children: ReactNode;
  guest: {
    nationalID: string | null | undefined;
    nationality: string | null | undefined;
    countryFlag: string | null | undefined;
    fullName: string | null | undefined;
    email: string | null | undefined;
    id: number;
  };
}) {
  const { email, fullName, countryFlag, nationalID, nationality, id } = guest;
  return (
    <form
      action={updateProfile}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input readOnly type="hidden" name="id" value={id} className="hidden" />
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          value={fullName || ""}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          value={email || ""}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="flex gap-2">
            <span>{nationality}</span>
            <Image
              width={100}
              height={100}
              src={countryFlag || "https://flagcdn.com/vn.svg"}
              alt="Country flag"
              className="h-6 w-6 rounded-sm"
            />
          </div>
        </div>
      </div>
      {children}
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID || ""}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button text="Update profile" />
      </div>
    </form>
  );
}
