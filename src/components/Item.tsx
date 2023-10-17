import { forwardRef, HTMLAttributes } from "react";
import Skeleton from "react-loading-skeleton";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  item: {
    id: number;
    tag: string;
    path: string;
    gridPlacement: {
      colStart: number;
      colEnd: number;
      rowStart: number;
      rowEnd: number;
    };
  };
  isLoading: boolean[];
  handleImageLoad: Function;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ item, isLoading, handleImageLoad, style, ...props }, ref) => {
    return (
      <div ref={ref} className={`relative h-[200px] md:h-[289px]`} {...props}>
        <div key={item.id} className={`relative h-[289px]`}>
          {isLoading[item.id] ? <Skeleton className="w-full h-full" /> : null}
          <img
            src={item.path}
            alt=""
            className={`h-full w-full object-cover absolute top-0 left-0 bottom-0 right-0 ${
              isLoading[item.id] ? "hidden" : ""
            }`}
            onLoad={() => handleImageLoad(item.id)}
          />
          <div className="absolute bottom-2 left-2 bg-[#b3b3b3] text-white p-1 rounded-lg text-xs">
            {item.tag}
          </div>
        </div>
      </div>
    );
  }
);

export default Item;
