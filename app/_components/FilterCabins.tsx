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
  return (
    <div className="flex border border-primary-800">
      {data.list.map((item) => (
        <ItemFilter
          field={data.field}
          key={item.name}
          name={item.name}
          value={item.value}
        />
      ))}
    </div>
  );
}
