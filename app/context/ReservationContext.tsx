"use client";
import { ReactNode, createContext, use, useState } from "react";

type Range = {
  from: Date | undefined;
  to: Date | undefined;
};

interface ContextReservationProps {
  range: Range;
  setRange: ({ from, to }: Range) => void;
}

const ContextReservation = createContext<ContextReservationProps | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range>({
    from: undefined,
    to: undefined,
  });

  const value = {
    range,
    setRange,
  };

  return (
    <ContextReservation.Provider value={value}>
      {children}
    </ContextReservation.Provider>
  );
}

export function useContextReservation() {
  const data = use(ContextReservation);
  if (!data) {
    throw new Error("Not found data");
  }
  return data;
}
