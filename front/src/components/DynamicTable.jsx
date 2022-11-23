import React, { useRef } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function DynamicTable({ object }) {
  const { user } = useSelector((state) => state.user);
  const column = useRef([]);
  const row = useRef([]);
  if (!object[0]) {
    return <div>Select an option</div>;
  }
  const { pathname } = useLocation();

  const headingColumnsAdm = [
    { heading: "id", value: "id" },
    { heading: "Razon Social", value: "name" },
    { heading: "Direccion", value: "direccion" },
    { heading: "Email", value: "email" },
  ];

  const headingColumnsGuards = [
    { heading: "id" },
    { heading: "Razon Social" },
    { heading: "Direccion" },
    { heading: "Email" },
  ];

  const headingColumnsBranchs = [
    { heading: "id", value: "id" },
    { heading: "Sucursal", value: "name" },
    { heading: "Provincia", value: "province" },
    { heading: "Ciudad", value: "city" },
    { heading: "Calle", value: "street" },
    { heading: "Altura", value: "number" },
  ];

  if (pathname === "/superadmin") {
    column.current = headingColumnsAdm;
    row.current = object.map((element) => {
      return {
        id: element.id,
        name: element.razon_social,
        direccion: element.direccion,
        email: element.email,
      };
    });
  }

  if (pathname === `/branch/${user.id}`) {
    column.current = headingColumnsBranchs;
    row.current = object.map((element) => {
      return {
        id: element.id,
        name: element.name,
        province: element.province,
        city: element.city,
        street: element.street,
        number: element.number,
      };
    });
  }

  return (
    <>
      <Table responsive striped bordered hover style={{ display: "block" }}>
        <thead>
          <tr>
            {column.current.map((item, index) => {
              return <TableHeadItem item={item.heading} />;
            })}
            <th>Editar</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableRowItem item={row.current} column={column.current} />;
            <td>Boton Mod</td>
            <td>Boton Delete</td>
            <td> Boton</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const TableHeadItem = ({ item }) => <th>{item}</th>;
const TableRowItem = ({ item, column }) => (
  <>
    {column.map((columnItem, index) => {
      return <td>{item[0][`${columnItem.value}`]}</td>;
    })}
  </>
);
