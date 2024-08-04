import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import { TruckingService } from "../../Services/Tracking/TruckingService";
import { ITruckingListData } from "../../Interfaces/GlobalInterfaces";
import useDataFromExcelContext from "../../context/GetDataFromExcelContext";
import {
  LoadingOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import "./TruckingList.css";
import {
  Skeleton,
  Pagination,
  PaginationItem,
  TextField,
  Button,
} from "@mui/material";
import AdvancedSearchModal from "../../components/AdvancedSearchModel";
interface Column {
  id: keyof ITruckingListData;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => any;
}
function TruckingList() {
  /*_________________ States _________________*/
  const truckingInstance = new TruckingService();
  const { data } = useDataFromExcelContext();
  const [truckingData, setTruckingData] = useState<ITruckingListData[]>([]);
  const [filteredData, setFilteredData] = useState<ITruckingListData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<"asc" | "des">("asc");
  const [sortColumnId, setSortColumnId] = useState<
    keyof ITruckingListData | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridDataHeaders: readonly Column[] = [
    { id: "created_dt", label: "Created Data", minWidth: 170 },
    {
      id: "data_source_modified_dt",
      label: "data_source_modified_dt",
      minWidth: 100,
    },
    {
      id: "entity_type",
      label: "entity_type",
      minWidth: 100,
      align: "right",
    },
    {
      id: "operating_status",
      label: "operating_status",
      minWidth: 100,
    },
    {
      id: "legal_name",
      label: "legal_name",
      minWidth: 100,
    },
    {
      id: "dba_name",
      label: "dba_name",
      minWidth: 100,
    },
    {
      id: "physical_address",
      label: "physical_address",
      minWidth: 100,
    },
    {
      id: "phone",
      label: "phone",
      minWidth: 100,
    },
    {
      id: "usdot_number",
      label: "usdot_number",
    },
    {
      id: "mc_mx_ff_number",
      label: "mc_mx_ff_number",
    },
    {
      id: "power_units",
      label: "power_units",
    },
  ];
  const [pageNo, setPageNo] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  /*_________________ Handlers _________________*/
  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNo(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPageNo(0);
  };

  const handleSort = (columnId: keyof ITruckingListData) => {
    let direction: "asc" | "des" = "asc";
    if (sortColumnId === columnId && sortConfig === "asc") {
      direction = "des";
    }
    setSortConfig(direction);
    setSortColumnId(columnId);
  };
  const applySort = (data: ITruckingListData[]) => {
    console.log("sort");
    if (!sortColumnId) return data;

    const sortedData = [...data].sort((a: any, b: any) => {
      if (a[sortColumnId] < b[sortColumnId]) {
        return sortConfig === "asc" ? -1 : 1;
      }
      if (a[sortColumnId] > b[sortColumnId]) {
        return sortConfig === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (filters: Partial<ITruckingListData>) => {
    // Apply filtering logic here
    const filtered = data?.filter((item: any) =>
      Object?.keys(filters).every((key: any) =>
        item[key as keyof ITruckingListData]
          ?.toString()
          ?.toLowerCase()
          ?.includes(
            filters[key as keyof ITruckingListData]!.toString()?.toLowerCase()
          )
      )
    );
    setFilteredData(filtered);
    setPageNo(1);
  };

  const handleClear = () => {
    setFilteredData(data || []);
    setFilters({});
    setPageNo(1);
  };
  async function getData() {
    setIsLoading(false);
    toast.dismiss();
    setTruckingData(data);
  }

  useEffect(() => {
    getData();
  }, [data?.length]);

  // this solution we will use it if there is endpoint
  // async function getData() {
  //   toast.loading("Loading...");
  //   const response = await truckingInstance.getTruckingList({
  //     pageSize: "",
  //   });
  //   if (response?.status === 200) {
  //     const data: ITruckingListData[] = response?.data?.data;
  //     toast.dismiss();
  //     setTruckingData(data);
  //   } else {
  //     toast.error(`failed to load data`);
  //   }
  // }
  // useEffect(() => {
  //   getData();
  // }, [pageNo, rowsPerPage]);
  useEffect(() => {
    setTruckingData(data);
    setFilteredData(data);
  }, [data]);
  useEffect(() => {
    const sorted = applySort(filteredData);
    setFilteredData(sorted);
  }, [sortConfig, sortColumnId]);
  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpenModal}>
          Advanced Search
        </Button>
        {/* Include your table rendering logic here, using filteredData instead of truckingData */}
        <AdvancedSearchModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSearch={handleSearch}
          onClear={handleClear}
          gridDataHeaders={gridDataHeaders}
        />
      </div>
      <div className="trucking-page">
        {isLoading && (
          <div className="trucking-page-overlay">
            <LoadingOutlined />
          </div>
        )}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {gridDataHeaders.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      onClick={() => {
                        handleSort(column.id);
                        setSortColumnId(column.id);
                      }}
                    >
                      {column.label}
                      {sortConfig === "asc" && sortColumnId === column.id ? (
                        <SortAscendingOutlined />
                      ) : (
                        <SortDescendingOutlined />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      {gridDataHeaders.map((column) => (
                        <TableCell key={column.id}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredData?.length ? (
                  filteredData
                    ?.slice(
                      (pageNo - 1) * rowsPerPage,
                      (pageNo - 1) * rowsPerPage + rowsPerPage
                    )
                    ?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {gridDataHeaders.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={gridDataHeaders.length - 1}
                      className="grid-empty-cell"
                    >
                      No Data To show
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={pageNo}
            showFirstButton
            showLastButton
            onChange={handleChangePage}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px 0",
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                style={{
                  minWidth: 40,
                  margin: "0 5px",
                  borderRadius: "4px",
                  backgroundColor: item.page === pageNo ? "#1976d2" : "#e0e0e0",
                  color: item.page === pageNo ? "#fff" : "#000",
                }}
              />
            )}
          />
        </Paper>
      </div>
    </>
  );
}

export default TruckingList;
