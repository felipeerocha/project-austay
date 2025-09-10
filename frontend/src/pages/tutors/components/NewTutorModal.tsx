import { TextField, Button, Box } from "@mui/material";
import BaseModal from "../../../components/modais/Modal"; 

type NewTutorModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewTutorModal({ open, onClose }: NewTutorModalProps) {
  const handleSave = () => {
    console.log("Salvando novo tutor...");
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Cadastrar Novo Tutor"
      actions={
        <>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </>
      }
    >
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField label="Nome completo" fullWidth required />
        <TextField label="Telefone" placeholder="(99) 99999-9999" fullWidth required />
      </Box>
    </BaseModal>
  );
}