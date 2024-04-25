import React, { memo, useState } from "react";

const InputFields = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, nameKeyVN }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full flex flex-col relative">
      <div className="relative">
        {value?.trim() !== "" || focus ? (
          <label
            className="text-[0.7rem] absolute top-[-8px] left-2  block bg-white px-1 animate-slide-top-focus "
            htmlFor={nameKeyVN}
          >
            {nameKeyVN?.slice(0, 1)?.toUpperCase() + nameKeyVN?.slice(1)}
          </label>
        ) : (
          !focus && (
            <label
              className="text-[1rem] absolute top-[50%] translate-y-[-50%] left-2 block bg-white px-1 select-none pointer-events-none text-gray-400"
              htmlFor={nameKeyVN}
            >
              {nameKeyVN?.slice(0, 1)?.toUpperCase() + nameKeyVN?.slice(1)}
            </label>
          )
        )}

        <input
          type={type || "text"}
          className="w-full border p-2 rounded-lg outline-none"
          value={value}
          onChange={(el) => setValue((prev) => ({ ...prev, [nameKey]: el.target.value }))}
          onFocus={() => {
            setFocus(true);
            setInvalidFields((prev) => prev.filter((el) => el.name !== nameKey));
          }}
          onBlur={() => {
            setFocus(false);
          }}
          required
        />
      </div>
      {/* some trả về true false,find trả về giá trị thỏa */}
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-600 text-[0.8rem] italic mt-3">
          {invalidFields?.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputFields);
