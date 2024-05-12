import React from 'react'
import { Select, Option } from "@material-tailwind/react";
import { CategoriesProps } from '../../Data';

interface propss {
    label:string,
    array: CategoriesProps[],
    onChange:()=>void,
    placeholder?:string
}
export default function SelectDropdown({label,array,onChange,placeholder}:propss) {
  return (
    <div className="w-72">
      <Select
        label={label}
        placeholder={placeholder}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={onChange}
      >
        {Array.isArray(array) &&
          array.map(({ value, label }) => {
            return <Option value={label}>{label}</Option>;
          })}
      </Select>
    </div>
  );
}
