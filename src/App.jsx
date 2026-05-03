import { Routes, Route } from 'react-router-dom'; 
import Success from './components/Success';
import Login from './components/Login';
import './App.css';

export default function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Success" element={<Success />} />
    </Routes>
  );
}