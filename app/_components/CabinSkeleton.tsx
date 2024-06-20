import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CabinSkeleton = () => {
  return (
    <div className="flex border-primary-800 border relative">
      <div className="flex-1 border-r border-primary-800 absolute z-0">
        <Skeleton height="100%" />
      </div>

      <div className="flex-grow z-10">
        <div className="pt-5 pb-4 px-7 bg-primary-950/60">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            <Skeleton width={100} />
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <Skeleton circle={true} height={20} width={20} />
            <p className="text-lg text-primary-200">
              <Skeleton width={150} />
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            <Skeleton width={50} />
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950/80 border-t border-t-primary-800 text-right">
          <Skeleton width={150} height={50} />
        </div>
      </div>
    </div>
  );
};

export default CabinSkeleton;
