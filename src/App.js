import React from "react";
import { useEffect, useState, createContext } from "react";
import './App.css';
import { FaYoutube, FaTwitter, FaInstagram, FaTelegram, FaGithub, FaRegSun, FaRegMoon } from "react-icons/fa";
import profilPic from "./948760.jpg";
import { createClient } from "@supabase/supabase-js";
import Icons from "./Icons";
import ReactSwitch from "react-switch";
import { Loading } from "./components/Loading/Loading";

export const ThemeContext = createContext(null);


function App() {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_PROJ_URL, process.env.REACT_APP_SUPABASE_PROJ_KEY);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const [theme, setTheme] = useState("dark");

  const [toggled, setToggled] = React.useState(false);
  const handleClick = () => {
    setToggled((s) => !s);
  };

  useEffect(() => {
    getLinks();
  }, []);


  async function getLinks() {
    setLoading(true);
    const { data } = await supabase.from("links").select();
    try {
      setLinks(data)
      setLoading(false);
    }
    catch (e) {
      console.log(e)
    }
    console.log(data);

  }



  // const links = [
  //   {
  //     url: "https://www.youtube.com/",
  //     title: "YouTube",
  //     icon: 'FaYoutube'
  //   },
  //   {
  //     url: "https://twitter.com/",
  //     title: "Twitter",
  //     icon: 'FaTwitter'
  //   },
  //   {
  //     url: "https://Telegram.com/",
  //     title: "Telegram",
  //     icon: 'FaTelegram'
  //   }
  // ]


  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" id={theme}>
        <header className="App-header container mx-auto justify-center justify-items-center">
          <img src={profilPic} className="profilePic w-20 h-20 mb-4 rounded-full " alt="logo" />

          <h3 className="profileid m-6" >@MOAMDX</h3>
          {/* <div >
          <Toggle className="w-9 h-10" toggled={toggled} onClick={handleClick} />
        </div> */}

          {loading ? <Loading /> :
            <ul className='flex flex-col justify-center items-center  w-full'>
              {links.map((link, index) => (
                <li key={index} className='flex justify-center buttonback cursor-pointer w-32 m-3 py-3 px-3 border-black border-2 text-sm md:text-md  text-slate-900'>
                  <a className='flex items-center' title={link.title} target='_blank' rel="noreferrer" href={link.url}>
                    <Icons iconName={link.icon} />
                    <p className='ml-3'>{link.title}</p>
                  </a>
                </li>
              ))}

            </ul>
          }

          <div className="switch flex justify-center">
            <label className="text-xs" >{theme === "dark" ? "LIGHT" : "DARK"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} height={22} width={40} checkedIcon={false} uncheckedIcon={false} onColor={'#472942'} />
          </div>

          <p className="made-with-love text-xs ">MADE WITH 💜 MOHAMMAD MEHMANDOOST</p>
        </header >



      </div>
    </ThemeContext.Provider>
  );
}

export default App;
