import React, { memo, useState } from "react";

const InputFields = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full relative">
      {value.trim() !== "" || focus ? (
        <label
          className="text-[0.8rem] absolute top-[-8px] left-2  block bg-white px-1 animate-slide-top-focus "
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
        </label>
      ) : (
        !focus && (
          <label
            className="text-[1rem] absolute top-[50%] translate-y-[-50%] left-2 block bg-white px-1 select-none pointer-events-none text-gray-400"
            htmlFor={nameKey}
          >
            {nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
          </label>
        )
      )}

      <input
        type={type || "text"}
        className="w-full border p-2 rounded-lg outline-none"
        // placeholder={nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(el) => setValue((prev) => ({ ...prev, [nameKey]: el.target.value }))}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required
      />
    </div>
  );
};

export default memo(InputFields);
