import { useCallback, useEffect, useState } from 'react';

import { GetFormDataOptionDto, GetFormDataResponseDto } from '@apono/dto';
import { checkAuth, fetchFormData } from '../../services/accessService';
import { APPROVED_MSG, FORBIDDEN_MSG } from './consts';

import { Box, AlertColor, Button, Typography, SelectChangeEvent } from '@mui/material';

import { SelectInput } from '../../components/SelectInput';
import { Alert } from '../../components/Alert';

import styles from './styles.module.scss';

// Main component that renders the access form
export function AccessForm() {
  // Options for select inputs (fetched from server)
  const [citizenOptions, setCitizenOptions] = useState<GetFormDataOptionDto[]>([]);
  const [placeOptions, setPlaceOptions] = useState<GetFormDataOptionDto[]>([]);

  // Currently selected values
  const [citizen, setCitizen] = useState<string>('');
  const [place, setPlace] = useState<string>('');

  // State for showing feedback alert
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  const handleCitizenChange = useCallback((e: SelectChangeEvent) => {
    debugger
    setCitizen(e.target.value);
  }, []);

  const handlePlaceChange = useCallback((e: SelectChangeEvent) => {
    setPlace(e.target.value);
  }, []);

  // Submits the form to check if the selected citizen is allowed in the selected place
  const checkAuthorization = useCallback(async () => {
    // check data entered
    if (!citizen || !place) {
      return;
    }

    const res = await checkAuth({ citizen: citizen, place: place, });
    const isValid = res?.status === 'allowed';

    showAlertMessage(isValid);
    resetForm()
  }, [citizen, place])

  // Displays the result alert (approved/forbidden)
  const showAlertMessage = useCallback((isValid: boolean) => {
    let msg = isValid ? APPROVED_MSG : FORBIDDEN_MSG;
    msg = msg.replace('{{citizen}}', citizen).replace('{{place}}', place)
    const severity = isValid ? 'success' : 'error';

    setAlertMessage(msg);
    setAlertSeverity(severity);
    setShowAlert(true);
  }, [citizen, place]);

  // Resets the form to its initial state
  const resetForm = useCallback(() => {
    setCitizen('');
    setPlace('');
  }, []);

  // Fetches initial data for the form (citizens and places)
  useEffect(() => {
    const getFormData = async () => {
      try {
        const res: GetFormDataResponseDto = await fetchFormData();
        setCitizenOptions(res?.citizens ?? []);
        setPlaceOptions(res?.places ?? []);
      } catch (err) {
        console.error("Failed to fetch form data", err);
      }
    }

    getFormData();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Access Form
      </Typography>
      {
        showAlert &&
        <Alert
          severity={alertSeverity}
          text={alertMessage}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      }
      <Box component="section" className={styles['form-section']}>
        <SelectInput
          label="Citizen"
          value={citizen}
          options={citizenOptions}
          onChange={handleCitizenChange}
        />
        <SelectInput
          label="Place"
          value={place}
          options={placeOptions}
          onChange={handlePlaceChange}
        />
        <div className={styles['button-wrapper']}>
          <Button
            variant="outlined"
            color="inherit"
            className={styles['button']}
            onClick={checkAuthorization}
          >Check authorization</Button>
        </div>
      </Box>
    </div>
  );
}