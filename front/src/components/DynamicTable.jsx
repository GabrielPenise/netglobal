import React from "react";
import Table from "react-bootstrap/Table";

export default function DynamicTable({ object }) {
  if (!object || !Object.keys(object).length) {
    return <div>Select an option</div>;
  }

  const columns = Object.keys(object).filter((element) => {
    return element === "name" || element === "lastname" || element === "email";
  });

  return (
    <>
      <Table responsive striped bordered hover style={{ display: "block" }}>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((element) => {
              return <th>{element}</th>;
            })}
            <th>Edit</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
