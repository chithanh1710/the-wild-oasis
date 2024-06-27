import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, maxNights, numGuests, totalPrice, guestID, cabinID, cabins(name, image)"
    )
    .eq("guestID", guestId)
    .order("startDate");
  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinID) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinID", cabinID)
    .or(`startDate.gte.${today},status.eq.checked-in`);
  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function createGuest(newGuest) {
  const { count, error: errorAll } = await supabase
    .from("guests")
    .select("*", { count: "exact" });

  if (errorAll) {
    throw new Error("Guest could not be created");
  }

  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest, id: count + 1 }]);

  if (error) {
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function updateBooking(id, updatedFields) {
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    throw new Error("Booking could not be updated");
  }
}
