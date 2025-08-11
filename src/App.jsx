  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import './App.css';
  import {Login} from './pages/login';
  import {Register} from './pages/register';
  import { Comments } from './pages/Comments';
  import Home from './pages/home';
  import { Profile } from './pages/profile';
  import { CompleteProfile } from './pages/profileComplete';
  import GuestRoute from './guards/GuestOnly';
  import LoggedinRoute from './guards/LoggedinRoute';

  function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Login/>} />
        <Route path="/feed" element={<GuestRoute><Home /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/completeProfile" element={<LoggedinRoute><CompleteProfile /></LoggedinRoute>} />
        <Route path="/profile" element={<LoggedinRoute><Profile/></LoggedinRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/comments/:postId" element={<Comments />} />
      </Routes>
      </BrowserRouter>
    );
  }

  export default App;
