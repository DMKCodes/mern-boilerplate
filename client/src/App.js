import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
            </Routes>
        </div>
    );
}

export default App;