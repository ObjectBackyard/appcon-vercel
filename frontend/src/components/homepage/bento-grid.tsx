import React from "react";
import { cn } from "../../utils/cn.ts";
import {
  IconTallymark1,
  IconTallymark2,
  IconTallymark3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  urgency,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  urgency?: string;
  header?: React.ReactNode;
  id?: string,
}) => {
  function truncateString(str, maxLength) {
    if (str?.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    } else {
      return str;
    }
  }
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}

      onClick={(()=>{
        
        console.log("hii im clicking the cause id", id)
      })}
    >
      {header}
      <Link to={`/cause/${id}`}>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
    
        <div>Urgency: {urgency} </div>
        {/* </Link> */}
        <div className="font-sans font-bold text-neutral-600 mb-2 mt-2">
        {/* <Link to={`/causes/${id}`}> */}
          {title}
          {/* </Link> */}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs">
        {/* <Link to={`/causes/${id}`}> */}
          {truncateString(description, 120)}
         
        </div>
      </div>
      </Link>
    </div>
   
    
  );
};
