import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: {
    label: string;
    value: string;
  }[];
}

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  return (
    <Grid container alignItems="center" sx={{ marginBottom: "1rem" }}>
      <Grid size={2}>
        <InputLabel id="citizen-select-label">{label}</InputLabel>
      </Grid>
      <Grid size={10}>
        <FormControl fullWidth size="small">
          <Select
            labelId="citizen-select-label"
            id="citizen-select"
            value={value}
            displayEmpty
            onChange={onChange}
          >
            {
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}