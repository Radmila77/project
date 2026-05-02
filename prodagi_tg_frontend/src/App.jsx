import {BrowserRouter, Route, Routes} from "react-router-dom";
import Library from "./components/frontend/Library.jsx";
import './index.css';
import Workshop from "./components/frontend/Workshop.jsx";
import Home from "./components/frontend/Home.jsx";
// import Neuroclub from "./components/frontend/Neuroclub.jsx";
import About from "./components/frontend/About.jsx";
import Quiz from "./components/frontend/Quiz.jsx";
import Questionnaire from "./components/frontend/Questionnaire.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <ScrollToTop/>
            <div className="flex min-h-screen flex-col">
                <Navbar/>
                <div className="flex flex-1 flex-col">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/library' element={<Library/>}/>
                        <Route path='/workshop' element={<Workshop/>}/>
                        {/*<Route path='/neuroclub' element={<Neuroclub/>}/>*/}
                        <Route path='/about' element={<About/>}/>
                        <Route path='/quiz' element={<Quiz/>}/>
                        <Route path='/questionnaire' element={<Questionnaire/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
