import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as XLSX from "xlsx";
import { ITruckingListData } from "../Interfaces/GlobalInterfaces";
export const DataFromExcelContext = createContext<
  { data: ITruckingListData[] } | undefined
>(undefined);

export function DataFromExcelProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [data, setData] = useState<ITruckingListData[]>([]);
  const defaultValues: ITruckingListData = {
    created_dt: "",
    data_source_modified_dt: "",
    entity_type: "",
    operating_status: "",
    legal_name: "",
    dba_name: "",
    physical_address: "",
    p_street: "",
    p_city: "",
    p_state: "",
    p_zip_code: "",
    phone: "",
    mailing_address: "",
    m_street: "",
    m_city: "",
    m_state: "",
    m_zip_code: "",
    usdot_number: 0,
    mc_mx_ff_number: "",
    power_units: 0,
    mcs_150_form_date: "",
    out_of_service_date: "",
    state_carrier_id_number: "" || 0,
    duns_number: "",
    drivers: 0,
    mcs_150_mileage_year: "0",
    id: 0,
    credit_score: "",
    record_status: "",
  };
  async function fetchData() {
    try {
      // fetching xlsx file from file system
      const response = await fetch(`${window.origin}/data/data.xlsx`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as Array<ITruckingListData[]>;
      if (jsonData.length > 0) {
        const [headers, ...rows] = jsonData;
        const formattedData: ITruckingListData[] = rows.map((row) => {
          const rowObject: any = { ...defaultValues };
          headers.forEach((header: any, index: number) => {
            rowObject[header] = row[index];
          });
          return rowObject;
        });
        setData(formattedData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching and parsing the Excel file:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataFromExcelContext.Provider value={{ data }}>
      {children}
    </DataFromExcelContext.Provider>
  );
}
export default function useDataFromExcelContext() {
  const context = useContext(DataFromExcelContext);
  if (context === undefined) {
    throw new Error(
      "useDataFromExcelContext must be used within a DataFromExcelProvider"
    );
  }
  return context;
}
