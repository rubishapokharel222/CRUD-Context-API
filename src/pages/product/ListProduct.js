import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import moment from "moment";
import { ProductContext } from "../../contexts/product/ProductContext";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const ListProduct = () => {
  const navigate = useNavigate();
  const { data, loading, error, deleteProduct } = useContext(ProductContext);

  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (row, i) => i + 1,
        headerStyle: {
          width: "100px",
        },
      },
      {
        Header: "Title",
        accessor: "title",
        headerStyle: {
          width: "300px",
        },
      },
      {
        Header: "Price",
        accessor: (row) => "$ " + row?.price,
      },
      {
        Header: "Image",
        accessor: (row) => (
          <div className="h-[100px] w-[100px]">
            <img
              src={`${row.image}`}
              alt="product-img"
              className="h-full w-full object-contain"
            />
          </div>
        ),
      },
      {
        Header: "Category",
        accessor: (row) => row?.category,
        headerStyle: {
          textTransform: "capitalize",
        },
      },
      {
        Header: "Created At",
        accessor: (row) => moment(row.created_at).format("MMM Do YYYY"),
        headerStyle: {
          width: "170px",
        },
      },
      {
        Header: "Action",
        accessor: (row) => (
          <div className="flex space-x-4 text-xl">
            <Link
              to={`/edit/${row.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fa-regular fa-edit"></i>
            </Link>
            <div
              onClick={() => {
                setShowDeleteModal(row);
              }}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <i className="fa-regular fa-trash"></i>
            </div>
          </div>
        ),
        headerStyle: {
          width: "200px",
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data: useMemo(() => data ?? [], [data]),
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      {loading && <div>Loading...</div>}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Products </h1>
          <div className="flex justify-between items-center">
            <h2 className="text-lg">
              <span>
                <i className="fa-regular fa-dumpster-fire"></i>
              </span>
              &nbsp;/ Product Management
            </h2>
            <Link
              className="border border-black py-2 px-6 text-base rounded-sm"
              to="/add"
            >
              <span>
                <i className="fa-regular fa-plus"></i>
              </span>
              &nbsp;&nbsp; Add Product
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="border rounded-sm border-black flex items-center">
            <input
              type="search"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setGlobalFilter(e.target.value);
              }}
              className="p-2 outline-none"
            />
            <i className="fa-regular fa-magnifying-glass p-2"></i>
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="border border-gray-300 rounded-sm p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={data?.length}>All</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gray-100"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={column.headerStyle}
                      className="p-2 text-left border-b"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    Data not found.
                  </td>
                </tr>
              ) : (
                page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map((cell, cellIndex) => (
                        <td {...cell.getCellProps()} className="p-2">
                          {cell.column.Header === "S.N"
                            ? rowIndex + 1 + pageIndex * pageSize
                            : cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {pageSize !== data?.length && (
            <div className="flex justify-end items-center p-2 gap-4">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="disabled:opacity-50"
              >
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="disabled:opacity-50"
              >
                {"<"}
              </button>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="disabled:opacity-50"
              >
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="disabled:opacity-50"
              >
                {">>"}
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          title="Delete Product"
          handleCloseModal={() => setShowDeleteModal(false)}
        >
          <div className=" p-4 text-center">
            <i className="fa-regular fa-circle-exclamation text-red-500 text-4xl mb-4"></i>
            <p className="mb-4 text-center">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-sm"
                onClick={() => {
                  deleteProduct(showDeleteModal?.id);
                  setShowDeleteModal(null);
                  toast.success("Product Deleted Successfully");
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-6 rounded-sm"
                onClick={() => setShowDeleteModal(null)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ListProduct;
