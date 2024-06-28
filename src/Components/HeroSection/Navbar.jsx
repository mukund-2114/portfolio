import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];

    useEffect(() => {
        setActiveLink(currentLocation);
    }, [currentLocation]);

    return (
        <div className=' text-gray-200 w-full fixed z-[999] bg-black top-0'>
            <nav className='lg:w-4/6 w-screen lg:mx-auto flex justify-between items-center p-3 lg:p-5'>
                <Link to='/' className="logo" style={{width:"200px",height:"50px"}} onClick={() => setActiveLink('')}>
                    <img src="logo2.png" alt="Logo" className='w-full h-full' />
                </Link>
                <div className="lg:hidden z-50">
                    <Icon icon={open ? 'fa:times' : 'fa:bars'} className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className={`lg:flex lg:items-center lg:gap-8 absolute lg:static w-full lg:w-auto left-0 lg:left-auto bg-black lg:bg-transparent transition-transform duration-300 ${open ? 'translate-y-10 text-center' : '-translate-y-full'} lg:translate-y-0`}>
                    <ul className='flex flex-col lg:flex-row lg:items-center lg:gap-8 p-3 lg:p-0'>
                        <li><Link to='/' className={`${activeLink === '' ? 'text-white active' : 'text-gray-400'}`} onClick={() => setOpen(false)}>Home</Link></li>
                        <li><Link to='/about' className={`${activeLink === 'about' ? 'text-white active' : 'text-gray-400'}`} onClick={() => setOpen(false)}>About</Link></li>
                        <li><Link to='/services' className={`${activeLink === 'services' ? 'text-white active' : 'text-gray-400'}`} onClick={() => setOpen(false)}>Services</Link></li>
                        <li><Link to='/projects' className={`${activeLink === 'projects' ? 'text-white active' : 'text-gray-400'}`} onClick={() => setOpen(false)}>Projects</Link></li>
                        <li><Link to='/contact' className={`${activeLink === 'contact' ? 'text-white active' : 'text-gray-400'}`} onClick={() => setOpen(false)}>Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
