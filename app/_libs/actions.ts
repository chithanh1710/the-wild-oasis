"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { createBooking, getBookings } from "./data-service";
import { addDays, differenceInBusinessDays, isPast, subDays } from "date-fns";
import { cabinProps } from "../_interfaces/Cabin";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function deleteReservationAction(id: string) {
  try {
    if (!id) throw new Error("Not found reservation delete");
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    const guestBookings = await getBookings(session.user.guestId);
    const idGuestBookings = guestBookings.map((item) => item.id);

    if (!idGuestBookings.includes(id))
      throw new Error("You are not allowed to delete this booking");

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      throw new Error("Delete fail");
    }
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("/account/reservations", "page");
  }
}

export async function createReservationAction(
  formData: FormData,
  newData: { form: Date; to: Date; cabin: cabinProps }
) {
  const session = await auth();
  if (!session?.user || !session.user.guestId)
    throw new Error("You need logged");
  if (isPast(newData.form))
    throw new Error("You cannot select a start date after today");
  const maxNights = differenceInBusinessDays(newData.to, newData.form);
  const newBooking = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString(),
    startDate: newData.form,
    endDate: addDays(newData.to, 1),
    maxNights,
    cabinPrice: newData.cabin.regularPrice,
    totalPrice:
      (newData.cabin.regularPrice - newData.cabin.discount) * maxNights,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    cabinID: newData.cabin.id,
    guestID: session.user.guestId,
  };

  try {
    await createBooking(newBooking);
    redirect("/cabins/thankyou");
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("/account/reservations");
    revalidatePath(`/cabins/${newData.cabin.id}`);
  }
}
