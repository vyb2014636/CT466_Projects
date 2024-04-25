import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select className="form-select w-full text-sm" name={value} onChange={(e) => changeValue(e.target.value)}>
      <option value="">Tất cả</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
