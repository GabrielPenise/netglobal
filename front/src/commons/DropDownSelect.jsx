import Select from "react-select";

import DynamicTable from "./DynamicTable";

export default function DropDownSelect({
  value,
  options,
  handleSelect,
  handleDelete,
  handleModify,
}) {
  return (
    <>
      <Select value={value} options={options} onChange={handleSelect} />
      <DynamicTable
        object={Array(value.value)}
        handleDelete={handleDelete}
        handleModify={handleModify}
      />
    </>
  );
}
