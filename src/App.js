import { useEffect, useState } from "react";
import './App.css';
import { FaYoutube, FaTwitter, FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import profilPic from "./948760.jpg";
import { createClient } from "@supabase/supabase-js";
import Icons from "./Icons";

function App() {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_PROJ_URL, process.env.REACT_APP_SUPABASE_PROJ_KEY);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

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

  return (
    <div className="App">
      <header className="App-header container mx-auto">
        <img src={profilPic} className="profilePic w-20 h-20 mb-4 rounded-full " alt="logo" />
        {loading ? <p>Please Wait</p> :
          <ul className='flex flex-col w-full'>
            {links.map((link, index) => (
              <li key={index} className='cursor-pointer m-2 py-3 px-10 border-black border-2 text-sm md:text-md  text-slate-900'>
                <a className='flex items-center' title={link.title} target='_blank' rel="noreferrer" href={link.url}>
                  <Icons iconName={link.icon} />
                  <p className='ml-3'>{link.title}</p>
                </a>
              </li>
            ))}

          </ul>
        }

      </header >
    </div>
  );
}

export default App;
