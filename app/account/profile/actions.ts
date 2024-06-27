"use server";

import { supabase } from "@/app/_libs/supabase";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const id = formData.get("id")?.toString();
  const regex = /^[0-9]{6,12}$/;

  if (!id) throw new Error("You must be logged in");

  const update = {
    nationalID: formData.get("nationalID")?.toString(),
    nationality: formData.get("nationality")?.toString().split("(%_%)")[0],
    countryFlag: formData.get("nationality")?.toString().split("(%_%)")[1],
  };

  if (update.nationalID && !regex.test(update.nationalID))
    throw new Error(
      "National id is not in correct format. National id needs 6 - 12 numbers"
    );

  const { error } = await supabase.from("guests").update(update).eq("id", id);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile", "page");
  revalidatePath("/account", "page");
}
