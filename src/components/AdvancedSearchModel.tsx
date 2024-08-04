import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import { ITruckingListData } from "../Interfaces/GlobalInterfaces";
interface Column {
  id: keyof ITruckingListData;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => any;
}
interface AdvancedSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSearch: (filters: Partial<ITruckingListData>) => void;
  onClear: () => void;
  gridDataHeaders: readonly Column[];
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  open,
  onClose,
  onSearch,
  onClear,
  gridDataHeaders,
}) => {
  const [filters, setFilters] = useState<Partial<ITruckingListData>>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({});
    onClear();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Advanced Search</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {gridDataHeaders.map((column) => (
            <Grid item xs={6} key={column.id}>
              <TextField
                label={column.label}
                name={column.id}
                value={(filters as any)[column.id] || ""}
                onChange={handleInputChange}
                fullWidth
                placeholder={`Search by ${column.label}`}
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleClear}
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            Clear
          </Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdvancedSearchModal;
