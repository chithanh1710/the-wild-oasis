"use client";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "@/app/_styles/multiRangeSlider.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MultiRangeSlider = ({ min, max }: { min: number; max: number }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const priceMin = useMemo(
    () =>
      (Number(searchParams.get("priceMin")) >= min &&
        Number(searchParams.get("priceMin"))) ||
      min,
    [min, searchParams]
  );
  const priceMax = useMemo(
    () =>
      (Number(searchParams.get("priceMax")) <= max &&
        Number(searchParams.get("priceMax"))) ||
      max,
    [max, searchParams]
  );
  const [minVal, setMinVal] = useState(priceMin);
  const [maxVal, setMaxVal] = useState(priceMax);
  const minValRef = useRef(priceMin);
  const maxValRef = useRef(priceMax);
  const range = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    }, 500);
  };

  const handleMaxValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("priceMax", value.toString());
      router.push(`${pathName}?${params}`);
    }, 500);
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
    <div>
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
