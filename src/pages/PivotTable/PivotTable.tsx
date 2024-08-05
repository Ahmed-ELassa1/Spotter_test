import React, { useCallback, useEffect, useState } from "react";
import {
  PivotViewComponent,
  FieldList,
  Inject,
} from "@syncfusion/ej2-react-pivotview";
import useDataFromExcelContext from "../../context/GetDataFromExcelContext";
import { ITruckingListData } from "../../Interfaces/GlobalInterfaces";
import "./PivotTable.css";

function PivotTable() {
  const { data } = useDataFromExcelContext();
  const [truckingData, setTruckingData] = useState<ITruckingListData[]>([]);
  let dataSourceSettings: any = {
    columns: [{ name: "created_dt", caption: "Created Date" }],
    rows: [
      { name: "data_source_modified_dt", caption: "Data Source Modified Date" },
      { name: "entity_type", caption: "Entity Type" },
      { name: "operating_status", caption: "Operating Status" },
      { name: "legal_name", caption: "Legal Name" },
      { name: "dba_name", caption: "Dba Name" },
      { name: "physical_address", caption: "Physical Address" },
      { name: "phone", caption: "Phone" },
      { name: "usdot_number", caption: "Usdot Number" },
      { name: "mc_mx_ff_number", caption: "Mc_mx_ff Number" },
      { name: "power_units", caption: "Power Units" },
    ],
    values: [
      { name: "data_source_modified_dt", caption: "Data Source Modified Date" },
      { name: "operating_status", caption: "Operating Status" },
      { name: "legal_name", caption: "Legal Name" },
      { name: "dba_name", caption: "Dba Name" },
      { name: "physical_address", caption: "Physical Address" },
      { name: "phone", caption: "Phone" },
      { name: "usdot_number", caption: "Usdot Number" },
      { name: "mc_mx_ff_number", caption: "Mc_mx_ff Number" },
      { name: "power_units", caption: "Power Units" },
    ],
    filters: [
      { name: "entity_type", caption: "Entity Type" },
      { name: "operating_status", caption: "Operating Status" },
      { name: "legal_name", caption: "Legal Name" },
      { name: "dba_name", caption: "Dba Name" },
      { name: "physical_address", caption: "Physical Address" },
      { name: "phone", caption: "Phone" },
      { name: "usdot_number", caption: "Usdot Number" },
      { name: "mc_mx_ff_number", caption: "Mc_mx_ff Number" },
      { name: "power_units", caption: "Power Units" },
    ],
    dataSource: truckingData,
    expandAll: false,
    showSortIcon: true,
    enableSorting: true,
    showFieldList: true,
  };
  const getData = useCallback(() => {
    setTruckingData(data);
  }, [data]);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <PivotViewComponent
      id="PivotView"
      height={"100vh"}
      width={"100%"}
      showFieldList={true}
      dataSourceSettings={dataSourceSettings}
    >
      <Inject services={[FieldList]}></Inject>
    </PivotViewComponent>
  );
}

export default PivotTable;
