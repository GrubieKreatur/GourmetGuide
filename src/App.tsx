import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainSearch from './components/Search/MainSearc';
import Home from './components/Home/Home';
import Footer from "./components/Footer";
import ErrorPage from './components/errorPage';
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import ShowRecipe from "./components/ShowRecipe/ShowRecipe";


const App: React.FC = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/mainsearch' },
        { name: 'Kategorien', path: '/kategorien' },
        { name: 'Login', path: '/log-in' },
    ];
    const noNavbarFooterRoutes = ['/log-in', '/register'];
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn, "was?");


    useEffect(() => {
        const isUserLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')!);
        if (isUserLoggedIn == null){
            setIsLoggedIn(false);
        }
        if (isUserLoggedIn) {
            setIsLoggedIn(isUserLoggedIn);
        }
    }, []);
    console.log(window.location.href );
    const shouldShowNavbarFooter = !noNavbarFooterRoutes.includes(location.pathname);
    return (
        <Router>
                {shouldShowNavbarFooter && <Navbar isLoggedIn={isLoggedIn} title="GourmetGuide" links={navLinks} />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mainsearc/:receptName?/:Category?/:Difficulty?/:zutaten?/:Fruit?" element={<MainSearch />} />
                    <Route path="/categories" element={<Categories />} />/
                    <Route path="/log-in" element={<Login isUserLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/recipe/*" element={<ShowRecipe/>} />
                </Routes>
                {shouldShowNavbarFooter && <Footer />}
        </Router>
    );
};

export default App;
