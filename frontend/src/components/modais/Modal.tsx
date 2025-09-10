import type { ReactNode } from "react"; // <-- type-only import
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
};

export default function BaseModal({
  open,
  onClose,
  title,
  children,
  actions,
}: BaseModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && (
        <DialogTitle sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
          {title}
        </DialogTitle>
      )}

      <DialogContent sx={{ mt: 2 }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ gap: 2, mt: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
