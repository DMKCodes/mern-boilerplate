import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import PersistLogin from './components/PersistLogin';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route 
                        path='/' 
                        element={<HomePage />} 
                    />
                    <Route 
                        path='/dashboard' 
                        element={<DashboardPage />}
                    />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;