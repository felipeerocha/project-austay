import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import AddTutorModal from "../../components/modals/AddTutorModal";
import AddIcon from "@mui/icons-material/Add";

export function Tutors() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = [
    { id: 1, tutor: "Lizandra", pets: "Marcão, Tutu, Pipoca", telefone: "(xx)xxxxx-xxxx" },
    { id: 2, tutor: "Ana Maria", pets: "Frajola, Flor", telefone: "(xx)xxxxx-xxxx" },
    { id: 3, tutor: "Marcos", pets: "Panqueca", telefone: "(xx)xxxxx-xxxx" },
  ];

  const columns = [
    { field: "tutor", headerName: "TUTOR", flex: 1 },
    { field: "pets", headerName: "PETS", flex: 1 },
    { field: "telefone", headerName: "TELEFONE", flex: 1 },
    {
      field: "visualizar",
      headerName: "VISUALIZAR",
      renderCell: () => (
        <img
          src="https://cdn-icons-png.flaticon.com/512/6381/6381533.png"
          alt="visualizar"
          style={{ width: 24, height: 24, cursor: "pointer" }}
        />
      ),
      flex: 0.5,
      sortable: false,
      filterable: false
    }
  ];  

  return (
    <Box sx={{ height: 450, width: "100%", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen} endIcon={<AddIcon />}>
          Novo tutor
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            fontSize: "1.5rem"
          }
        }}
      />
      <AddTutorModal open={open} onClose={handleClose} />
    </Box>
  );
}
