import Select from "react-select";

export default function DropDownSelect({ value, options, handleSelect }) {
  return (
    <>
      <Select value={value} options={options} onChange={handleSelect} />
    </>
  );
}
