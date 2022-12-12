import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import CreateQuiz from './Pages/CreateQuiz';
import Questions from './Pages/Questions';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProtectedRoute from './Components/Routes/ProtectedRoutes';
import Logout from './Components/Common/Logout';

const App = () => {
  return (
    <Router>
      <Logout />
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={10}>
          <Routes>
            <Route path='/' exact element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/questions' element={<ProtectedRoute />}>
              <Route path='/questions' element={<Questions />} />
            </Route>
            <Route path='/createquiz' element={<ProtectedRoute />}>
              <Route path='/createquiz' element={<CreateQuiz />} />
            </Route>
            <Route path='/home' element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />}/>
            </Route>
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
