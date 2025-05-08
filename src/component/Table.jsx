import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";

const ReusableTable = ({
  headers,
  tableData,
  totalLength,
  loading,
  enableGlobalSearch = false,
  actionMenu,
  columnHide,
  filterDropdown,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const pageSize = searchParams.get("pageSize") || 10;
  const [currPage, setCurrPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const [menuAnchorEls, setMenuAnchorEls] = useState({});
  const menuRefs = useRef({});

  const [globalSearch, setGlobalSearch] = useState(
    searchParams.get("globalSearch") || ""
  );

  const hiddenColumns = (searchParams.get("hiddenColumns") || "")
    .split(",")
    .filter(Boolean);

  const handleChangePage = (_, newPage) => {
    setCurrPage(newPage);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev); // Clone existing search params

      updatedParams.set("page", newPage);
      updatedParams.set("pageSize", rowsPerPage);
      return updatedParams;
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrPage(0);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);

      updatedParams.set("page", 0);
      updatedParams.set("pageSize", parseInt(event.target.value, 10));
      return updatedParams;
    });
  };

  const handleSort = (column) => {
    const currentSortBy = searchParams.get("sort_by");
    const currentDirection = searchParams.get("direction");
    let newDirection = "ASC";

    if (currentSortBy === column.sortKey) {
      newDirection = currentDirection === "ASC" ? "DESC" : "ASC";
    }

    const params = new URLSearchParams(window.location.search);
    params.set("sort_by", column.sortKey);
    params.set("direction", newDirection);
    setSearchParams(params.toString());
  };
  const defaultSearch = {};
  headers.forEach((h) => {
    defaultSearch[h.sortKey] = searchParams.get(h.sortKey) || "";
  });

  const [searchTerms, setSearchTerms] = useState(defaultSearch);
  const handleSearchChange = (key) => (e) => {
    const value = e.target.value;
    const newSearch = {
      ...searchTerms,
      [key]: value,
    };
    setSearchTerms(newSearch);

    // Update URL
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };

  const handleGlobalSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const updatedParams = new URLSearchParams(searchParams);
      if (globalSearch.trim()) {
        updatedParams.set("globalSearch", globalSearch.trim());
      } else {
        updatedParams.delete("globalSearch");
      }
      setSearchParams(updatedParams);
      setCurrPage(0); // Reset to first page on search
    }
  };

  const handleMenuOpen = (event, rowIndex) => {
    setMenuAnchorEls((prev) => ({ ...prev, [rowIndex]: event.currentTarget }));
  };

  const handleMenuClose = (rowIndex) => {
    setMenuAnchorEls((prev) => {
      const newState = { ...prev };
      delete newState[rowIndex];
      return newState;
    });
  };

  const pinIndex = searchParams.get("pinIndex");

  const handlePinClick = (index) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (pinIndex == index) {
      updatedParams.delete("pinIndex");
    } else {
      updatedParams.set("pinIndex", index);
    }
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(menuRefs.current).forEach(([rowIndex, ref]) => {
        if (ref && !ref.contains(event.target)) {
          handleMenuClose(rowIndex);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let headerComp = headers?.map(
    (header, index) =>
      !hiddenColumns.includes(header.columnHideKey) && (
        <TableCell padding="none" key={index}>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <span>{header?.title}</span>
              {header?.sortKey && (
                <button onClick={() => handleSort(header)}>
                  <ArrowDropDownIcon
                    className={`${
                      searchParams.get("sort_by") == header.sortKey &&
                      searchParams.get("direction") === "ASC"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              )}
              {header?.pin && (
                <>
                  <PushPinIcon
                    onClick={() => handlePinClick(index)}
                    style={{
                      width: "15px",
                      color:
                        searchParams.get("pinIndex") == index
                          ? "green"
                          : "gray", // replace `someFlag` with your actual condition
                    }}
                    className="hover:cursor-pointer hover:!text-slate-700"
                  />
                </>
              )}
            </div>
          </div>
          {header?.isSearchAble && (
            <TextField
              placeholder={`Search ${header?.title}`}
              value={searchTerms[header?.sortKey] || ""}
              onChange={(e) =>
                setSearchTerms({
                  ...searchTerms,
                  [header?.sortKey]: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchChange(header?.sortKey)(e);
                }
              }}
              size="small"
            />
          )}
        </TableCell>
      )
  );

  function moveToTop(arr, index) {
    if (index < 0 || index >= arr.length) return arr; // invalid index
    const item = arr[index];
    const newArr = [...arr]; // clone to avoid mutation
    newArr.splice(index, 1); // remove the item from its original position
    newArr.unshift(item); // insert it at the start
    return newArr;
  }

  const dropdownValue = searchParams.get(filterDropdown?.paramKey) || "";

  const handleDropdownChange = (e) => {
    const updatedParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      updatedParams.set(filterDropdown.paramKey, value);
    } else {
      updatedParams.delete(filterDropdown.paramKey);
    }

    setSearchParams(updatedParams);
  };

  if (pinIndex) {
    headerComp = moveToTop(headerComp, parseInt(pinIndex));
  }

  let dataComp = (data) => {
    let temp = Object.entries(data).map(([key, cell], index) => {
      return (
        !(
          headers[index]?.columnHideKey &&
          hiddenColumns?.includes(headers[index]?.columnHideKey)
        ) && (
          <TableCell key={index} className={cell?.outerStyle}>
            {cell?.text ? (
              cell?.link ? (
                <Link to={cell?.link} className={cell?.innerStyle}>
                  {cell?.text}
                </Link>
              ) : (
                cell?.text
              )
            ) : cell?.content ? (
              cell?.content
            ) : null}
          </TableCell>
        )
      );
    });
    if (pinIndex) {
      temp = moveToTop(temp, pinIndex);
    }
    return temp;
  };

  return (
    <>
      <div className="px-5">
        {enableGlobalSearch && (
          <div
            style={{
              padding: "10px",
              marginLeft: "auto",
              width: "max-content",
            }}
          >
            <TextField
              label="Search All"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onKeyDown={handleGlobalSearchKeyDown}
              fullWidth
              size="small"
            />
          </div>
        )}
        {columnHide && (
          <>
            {headers?.map(
              (hd) =>
                hd?.columnHideKey && (
                  <span
                    key={hd.columnHideKey}
                    style={{
                      cursor: "pointer",
                      marginRight: 10,
                      textDecoration: hiddenColumns.includes(hd.columnHideKey)
                        ? "line-through"
                        : "none",
                    }}
                    onClick={() => {
                      const currentHidden = (
                        searchParams.get("hiddenColumns") || ""
                      )
                        .split(",")
                        .filter(Boolean);
                      const updated = currentHidden.includes(hd.columnHideKey)
                        ? currentHidden.filter(
                            (col) => col !== hd.columnHideKey
                          )
                        : [...currentHidden, hd.columnHideKey];

                      const params = new URLSearchParams(searchParams);
                      if (updated.length > 0) {
                        params.set("hiddenColumns", updated.join(","));
                      } else {
                        params.delete("hiddenColumns");
                      }
                      setSearchParams(params);
                    }}
                  >
                    {hd?.title}
                  </span>
                )
            )}
          </>
        )}

        {filterDropdown && (
          <div
            style={{
              padding: "10px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <TextField
              select
              label={filterDropdown.label}
              value={dropdownValue}
              onChange={handleDropdownChange}
              size="small"
              className="w-[200px]"
            >
              <MenuItem value="">All</MenuItem>
              {filterDropdown.options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}

        <TableContainer>
          <Table>
            <TableHead
              className="bg-[#D9D9D9] !rounded-md !overflow-hidden"
              sx={{ borderRadius: 10 }}
            >
              <TableRow
                sx={{ borderRadius: 12, overflow: "hidden" }}
                className="!rounded-xl !overflow-hidden"
              >
                {headerComp}
                {actionMenu && <TableCell padding="none">Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + (actionMenu ? 1 : 0)}
                    align="center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.map((data, index) => (
                  <TableRow key={index}>
                    {dataComp(data)}
                    {actionMenu && (
                      <TableCell>
                        <MoreVertIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleMenuOpen(e, index)}
                        />
                        <Menu
                          anchorEl={menuAnchorEls[index]}
                          open={Boolean(menuAnchorEls[index])}
                          onClose={() => handleMenuClose(index)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          slotProps={{
                            list: { autoFocusItem: false },
                          }}
                        >
                          {actionMenu.map((ac, i) => (
                            <MenuItem key={i} onClick={ac?.onClick}>
                              {ac?.text}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={"div"}
          count={totalLength}
          page={currPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        ></TablePagination>
      </div>
    </>
  );
};

export default ReusableTable;
