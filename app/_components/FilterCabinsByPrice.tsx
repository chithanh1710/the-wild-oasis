"use client";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import "@/app/_styles/multiRangeSlider.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MultiRangeSlider = ({ min, max }: { min: number; max: number }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("priceMin", min.toString());
    params.set("priceMax", max.toString());
    router.push(`${pathName}?${params}`);
  }, []);

  const handleMinValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("priceMin", value.toString());
      router.push(`${pathName}?${params}`);
    }, 500); // 0.5 seconds
  };

  const handleMaxValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;

    // Clear the previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("priceMax", value.toString());
      router.push(`${pathName}?${params}`);
    }, 500); // 0.5 seconds
  };

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinValChange}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 10 ? "5" : "3" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxValChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">${minVal}</div>
        <div className="slider__right-value">${maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
