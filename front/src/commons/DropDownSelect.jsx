import Select from "react-select";

import DynamicTable from "./DynamicTable";

export default function DropDownSelect({ value, options, handleSelect }) {
  return (
    <>
      <Select value={value} options={options} onChange={handleSelect} />
      <DynamicTable object={Array(value.value)} />
    </>
  );
}
