// 
import React, { useState,useEffect } from 'react';
import SidebarData from './SidebarData';
import { Link, Outlet } from 'react-router-dom';
import img1 from '../sidebar/images/Logo.png';
import img2 from './images/image 55 (1).png';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';


function Sidebar() {
 
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [currentPath, setCurrentPath] = useState('/layout/home');
  // const [act,setAct]=useState(false)
  useEffect(() => {
    const storedPath = localStorage.getItem(('currentPath'));
    if (storedPath) {
      setCurrentPath(storedPath);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPath', currentPath);
  }, [currentPath]);
  const handleClick = (index) => {
    setActiveItem(index);
    // if (val.title === 'Dashboard') {
    //   setAct(true);
    // } else {
    //   setAct(false);
    // }
  };
  
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <div className='ml-10'>
      <img className='mt-8 mb-20' src={img1} alt='boy' />
      <ul className=''>
        {SidebarData.map((val, index) => (
          <li key={index} onClick={() => handleClick(index)} 
          className={`hover:text-[#CF9832] hover:bg-[#F5EAD6] hover:rounded-3xl mb-6 p-2 ${activeItem === index? 'text-[#CF9832] bg-[#F5EAD6] rounded-3xl ' : ''} `}
          >
            {/* ${val.title === 'Dashboard' && act ?'text-[#CF9832] bg-[#F5EAD6] rounded-3xl ':''} */}
           <button onClick={() => setCurrentPath('${val.link}')}><Link to={val.link}>
              <div className='flex space-x-2'>
                <div className=' ml-4 '>{val.icon}</div>
                <div>{val.title}</div>
              </div>
            </Link>
            </button> 
          </li>
        ))}
      </ul>

      <img className='mt-20 mb-20' src={img2} alt='girl' />
      <button onClick={handleLogout} className='flex space-x-4 mb-20 text-[#404040]'>
        <Icon icon='ic:round-logout' width={24} height={24} />
        <span className=''><p>Log out</p></span>
      </button>
      
    </div>
  );
}

export default Sidebar;
