import About from "./components/About";
import Contact from "./components/contact";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Story from "./components/Story";

export default function App() {
  return (
    // min-h-screen by this minimum height of the screen will be 100% of the view height
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
     <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <Story/>
      <Contact/>
      <Footer/>

    </main>
  )
}