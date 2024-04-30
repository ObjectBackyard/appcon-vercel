import React from "react";

const CauseCard = (props) => {
  return (
    <>
      <a
        className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition max-w-sm max-h-[500px]"
        href="#"
      >
        <div className="card w-96 bg-base-100">
          <figure className="px-10 pt-10">
            <img
              src={props.details.images[0]}
              alt="Cause image"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-blue-700 ">
              {props.details.title}
            </h2>
            <p className="text-neutral-600 text-xs">
              {props.details.post_content}
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default CauseCard;
