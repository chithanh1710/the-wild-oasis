"use server";

import { auth } from "@/app/_libs/auth";
import { getBookings, updateBooking } from "@/app/_libs/data-service";
import { revalidatePath } from "next/cache";

export async function updateBookingAction(formData: FormData) {
  const id = formData.get("id");
  if (!id) throw new Error("Not found reservation edit");
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const allIdBooking = await guestBookings.map((item) => item.id);

  if (!allIdBooking.includes(Number(id)))
    throw new Error("You are not allowed to edit this booking");

  const update = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
  };

  await updateBooking(id, update);

  revalidatePath("/account/reservations", "page");
  revalidatePath(`/account/reservations/edit/${id}`);
}
