/* eslint-disable react/prop-types */

import { Tooltip } from "@material-tailwind/react";

export default function DropDown({ title, options, func }) {
  return (
    <Tooltip
      className="bg-gray-800 font-extralight text-primary px-2 py-1"
      content={title}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <div className="w-28 sm:w-[12%] mt-1 mb-1 text-primary relative">
        <select
          defaultValue="0"
          onChange={func}
          className="w-full px-2 py-0.5 text-sm bg-gray-700 rounded-lg appearance-none  focus:outline-none "
        >
          {options?.map((elm, i) => (
            <option key={i} value={elm} className="text-xs font-thin">
              {elm.toUpperCase().replace("_", " ")}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
          />
        </svg>
      </div>
    </Tooltip>
  );
}
