"use client";

import { ItemFilter } from "./ItemFilter";

export default function FilterCabins({
  data,
}: {
  data: {
    field: string;
    list: {
      name: string;
      value: string;
    }[];
  };
}) {
  const capacity = {
    field: "capacity",
    list: [
      { name: "All cabins", value: "all" },
      { name: "2-3 guests", value: "small" },
      { name: "4-7 guests", value: "medium" },
      { name: "8-12 guests", value: "large" },
    ],
  };

  return (
    <div className="flex border border-primary-800">
      {capacity.list.map((item) => (
        <ItemFilter
          field={capacity.field}
          key={item.name}
          name={item.name}
          value={item.value}
        />
      ))}
    </div>
  );
}
