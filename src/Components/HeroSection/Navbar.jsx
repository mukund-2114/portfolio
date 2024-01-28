import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
    const [activelink, setActiveLink] = useState('');
    const location =useLocation();
    const currentLocattion = location.pathname.split('/')[1];
    // using useEffect for checking the navlinks
    useEffect(() => {
        setActiveLink(currentLocattion)
    },[])
   
  return (
    // Mukund Kapadia 301403876 27/01/2024 Navbar.jsx
    <>
        <div className="navbar flex w-4/6 mx-auto justify-between p-7 items-center uppercase" >
            <Link to='/' className="logo" style={{width:"200px",height:"50px"}} onClick={()=>setActiveLink('')}>
                <img src="logo2.png" alt="" className='w-full h-full' />
            </Link>
            <div className="links">
                <ul className='flex gap-8'>
                    <Link to='/' className={`${activelink==''? 'active':''}`} onClick={()=>setActiveLink('')}>Home</Link>
                    <Link to='/about' className={`${activelink=='about'? 'active':''}`} onClick={()=>setActiveLink('about')} >About</Link>
                    <Link to='/services' className={`${activelink=='services'? 'active':''}`} onClick={()=>setActiveLink('services')}>Services</Link>
                    <Link to='/projects' className={`${activelink=='projects'? 'active':''}`} onClick={()=>setActiveLink('projects')}>Projects</Link>
                    <Link to='/contact' className={`${activelink=='contact'? 'active':''}`} onClick={()=>setActiveLink('contact')}>Contact</Link>
                    {/* <ul className='flex gap-3'>
                        <li><Icon icon="skill-icons:instagram" width={20}/></li>
                        <li><Icon icon="devicon:linkedin" width={20}/></li>
                        <li><Icon icon="devicon:github" width={20} className='bg-white rounded-sm'/></li>
                    </ul> */}
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar