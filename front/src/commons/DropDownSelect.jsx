import Select from "react-select";

import DynamicTable from "./DynamicTable";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { setUiOpenNew } from "../store/slices/index.js";

export default function DropDownSelect({
  value,
  options,
  handleSelect,
  handleDelete,
}) {
  const dispatch = useDispatch();
  const handleNew = () => {
    dispatch(setUiOpenNew(true));
  };
  return (
    <>
      <Select value={value} options={options} onChange={handleSelect} />
      <DynamicTable object={Array(value.value)} handleDelete={handleDelete} />
      <div class="text-center">
        <Button onClick={handleNew}>Crear nuevo</Button>
      </div>
    </>
  );
}
