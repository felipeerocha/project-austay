import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PurpleButton } from "../buttons/PurpleButton";

export default function AddTutorModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontSize: "2rem" }}>Novo tutor</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          <TextField label="Nome completo" fullWidth InputLabelProps={{ sx: { fontSize: "1.3rem" } }} inputProps={{ sx: { fontSize: "1.2rem" } }} />
          <TextField label="Telefone" fullWidth InputLabelProps={{ sx: { fontSize: "1.3rem" } }} inputProps={{ sx: { fontSize: "1.2rem" } }} />
          <TextField label="CPF" fullWidth InputLabelProps={{ sx: { fontSize: "1.3rem" } }} inputProps={{ sx: { fontSize: "1.2rem" } }} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField select label="Pet" fullWidth InputLabelProps={{ sx: { fontSize: "1.3rem" } }} inputProps={{ sx: { fontSize: "1.2rem" } }}>
              <MenuItem value="pet1">Pet 1</MenuItem>
              <MenuItem value="pet2">Pet 2</MenuItem>
            </TextField>
            <PurpleButton
              variant="contained"
              endIcon={<AddIcon />}
              sx={{ width: "13rem", height: "4rem", fontSize: "1.1rem" }}
            >
              Novo pet
            </PurpleButton>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ gap: 2, mt: 2 }}>
        <Button
          onClick={onClose}
          sx={{ width: "14rem", height: "4rem", fontSize: "1.1rem" }}
        >
          Cancelar
        </Button>
        <PurpleButton
          variant="contained"
          sx={{ width: "14rem", height: "4rem", fontSize: "1.1rem" }}
        >
          Cadastrar serviço
        </PurpleButton>
      </DialogActions>
    </Dialog>
  );
}
