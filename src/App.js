import './App.css';
import Quiz1 from './components/Quiz1';
import Quiz2 from './components/Quiz2'
import { Stack } from '@mui/material';
function App() {
  return (
    <>
    <Stack spacing={2} direction="row">
      <Quiz1/>
      <Quiz2/>
    </Stack>
    </>
  );
}

export default App;
