import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navbar = ({ debugMode, setDebugMode }) => {
    const [activeLink, setActiveLink] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];

    useEffect(() => {
        setActiveLink(currentLocation);
    }, [currentLocation]);

    return (
        <header className='text-gray-200 w-full fixed z-[999] top-0 bg-[#030303]/80 backdrop-blur-md border-b border-white/5'>
            <nav className='lg:w-4/6 w-screen lg:mx-auto flex justify-between items-center p-3 lg:p-5'>
                <Link to='/' className="logo group" style={{ width: "200px", height: "50px" }} onClick={() => setActiveLink('')}>
                    <img src="logo2.png" alt="Logo" className='w-full h-full transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' />
                </Link>
                <div className="lg:hidden z-50">
                    <Icon icon={open ? 'fa:times' : 'fa:bars'} className="text-2xl cursor-pointer text-white/70 hover:text-white transition-colors" onClick={() => setOpen(!open)} />
                </div>
                <div className={`lg:flex lg:items-center lg:gap-8 absolute lg:static w-full lg:w-auto left-0 lg:left-auto bg-[#030303] lg:bg-transparent transition-all duration-500 ease-in-out ${open ? 'top-[74px] opacity-100' : 'top-[-400px] lg:top-0 opacity-0 lg:opacity-100'} text-center lg:text-left border-b lg:border-none border-white/5`}>
                    <ul className='flex flex-col lg:flex-row lg:items-center lg:gap-8 p-6 lg:p-0'>
                        <li><Link to='/' className={`${activeLink === '' ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`} onClick={() => setOpen(false)}>Home</Link></li>
                        <li><Link to='/about' className={`${activeLink === 'about' ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`} onClick={() => setOpen(false)}>About</Link></li>
                        <li><Link to='/services' className={`${activeLink === 'services' ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`} onClick={() => setOpen(false)}>Services</Link></li>
                        <li><Link to='/projects' className={`${activeLink === 'projects' ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`} onClick={() => setOpen(false)}>Projects</Link></li>
                        <li><Link to='/contact' className={`${activeLink === 'contact' ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`} onClick={() => setOpen(false)}>Contact</Link></li>

                        {/* Debug Toggle */}
                        <li>
                            <button
                                onClick={() => {
                                    setDebugMode(!debugMode);
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${debugMode
                                        ? 'bg-green-900/20 border-green-500 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                <Icon icon="lucide:terminal" className="text-sm" />
                                <span className="text-xs font-mono">{debugMode ? 'BSOD_ACTIVE' : 'CMD'}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
