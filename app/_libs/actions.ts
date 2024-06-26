"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

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
