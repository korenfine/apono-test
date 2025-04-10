import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Typography
} from '@mui/material';
import { columns, Column } from './consts';
import { Table } from '../../components/Table';
import { fetchAccessLogs } from '../../services/accessService';
import { AccessLogDto } from '@apono/dto';

// Component to display the access logs in a table
export function AccessLog() {
  const [data, setData] = useState<AccessLogDto[]>([]);

  // Fetch the access logs from the server on component mount
  useEffect(() => {
    const getAccessLogs = async () => {
      try {
        const res: AccessLogDto[] = await fetchAccessLogs();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch access logs", err);
      }
    }

    getAccessLogs()
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Access Log
      </Typography>
      <Box>
        <Table data={data} columns={columns as Column[]} />
      </Box>
    </>
  )
}