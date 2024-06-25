import { getBookedDatesByCabinId, getCabin } from "@/app/_libs/data-service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params }: { params: Params }) {
  const { cabinID } = params;
  try {
    const [cabin, bookedDate] = await Promise.all([
      getCabin(cabinID),
      getBookedDatesByCabinId(cabinID),
    ]);
    return Response.json({
      status: "success",
      message: "All data cabin and booked date",
      cabin,
      bookedDate,
    });
  } catch {
    return Response.json({ status: "fail", message: "Cabins not found" });
  }
}

export async function POST() {}
