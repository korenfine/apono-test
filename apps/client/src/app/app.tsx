import { Route, Routes, Link } from 'react-router-dom';
import { AccessForm } from '../pages/AccessForm';
import { Container, Grid, Typography } from '@mui/material';
import { AccessLog } from '../pages/AccessLog';

export function App() {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h3" gutterBottom>
            Apalalula Island
          </Typography>
        </Grid>
        <Grid>
          <div>
            <Grid container spacing={1}>
              <Grid>
                <Link to="/">Access Form</Link>
              </Grid>
              <Grid>|</Grid>
              <Grid>
                <Link to="/log">Access Log</Link>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div>

        <Routes>
          <Route
            path="/"
            element={
              <AccessForm />
            }
          />
          <Route
            path="/log"
            element={
              <AccessLog />
            }
          />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
