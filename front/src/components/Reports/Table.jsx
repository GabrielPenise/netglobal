import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const TableData = ({ reports, days }) => {
  console.log(days);
  const hours = days * 8 - Math.floor(days / 7) * 8;
  const handleClick = () => {
    alert("crear tabla y descargar Excel");
  };

  return (
    <div>
      <Table
        bordered
        hover
        responsive
        size="sm"
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Horas Periodo</th>
            <th>Horas Cubiertas</th>
            <th>Horas Por Cubrir</th>
            <th>Descarga</th>
          </tr>
        </thead>
        <tbody>
          {reports
            ? reports.map((report, i) => (
                <tr key={i}>
                  <td>
                    {report.name} {report.lastname || ""}
                  </td>
                  <td>{report.lastname ? hours : days * 24} hs</td>
                  <td>{report.events.length * 8} hs</td>
                  <td>
                    {report.lastname
                      ? hours - report.events.length * 8
                      : days * 24 - report.events.length * 8}
                    hs
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
    </div>
  );
};

export default TableData;
