import React from "react";
import "./DataTable.css";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "../Button/Button";

const DataTable = ({ data, columns, count, clickFunction, actions }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {actions && actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, rowIndex) => (
            <tr key={item._id || rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      onClick={() => action.onClick(item)}
                      className={action.className || "action-button"}
                      title={action.title || ""}
                    >
                      {action.label}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={count}
        onPageChange={clickFunction}
        containerClassName="pagination"
        nextLabel={<ArrowCircleRightOutlinedIcon fontSize="medium" />}
        previousLabel={<ArrowCircleLeftOutlinedIcon fontSize="medium" />}
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

// PropTypes validation
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  count: PropTypes.number.isRequired,
  clickFunction: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

export default DataTable;
