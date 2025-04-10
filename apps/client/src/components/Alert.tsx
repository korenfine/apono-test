import { Alert as AlertComponent, AlertColor } from '@mui/material';

interface AlertProps {
  severity: AlertColor;
  text?: string;
  onClose?: (() => void) | undefined;
}

export function Alert({ severity = "success", text = "", onClose }: AlertProps) {
  return (
    <AlertComponent
      variant="filled"
      severity={severity}
      sx={{ marginBottom: "1rem" }}
      {...(onClose ? { onClose: onClose } : {})}
    >
      {text}
    </AlertComponent>
  )
}