import React from 'react'
import ProductViewer from "./components/ProductViewer.jsx";
import Hero from "./components/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
       <main>
           <NavBar />
           <Hero />
           <ProductViewer />
       </main>
    )
}
export default App
