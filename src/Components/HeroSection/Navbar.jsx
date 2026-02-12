import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const Navbar = ({ debugMode, setDebugMode, lenis }) => {
    const [activeLink, setActiveLink] = useState('home');
    const [open, setOpen] = useState(false);

    const handleScroll = (id) => {
        setOpen(false);
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: -80 });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = ['home', 'about', 'services', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveLink(section);
                }
            }
        };

        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'services', label: 'Services' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header className='text-gray-200 w-full fixed z-[999] top-0 bg-[#030303]/80 backdrop-blur-md border-b border-white/5'>
            <nav className='lg:w-4/6 w-full lg:mx-auto flex justify-between items-center p-3 lg:p-5'>
                <a href="#home" className="logo group" style={{ width: "200px", height: "50px" }} onClick={(e) => { e.preventDefault(); handleScroll('home'); }}>
                    <img src="logo2.png" alt="Logo" className='w-full h-full transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' />
                </a>
                <div className="lg:hidden z-50">
                    <Icon icon={open ? 'fa:times' : 'fa:bars'} className="text-2xl cursor-pointer text-white/70 hover:text-white transition-colors" onClick={() => setOpen(!open)} />
                </div>
                <div className={`lg:flex lg:items-center lg:gap-8 absolute lg:static w-full lg:w-auto left-0 lg:left-auto bg-[#030303] lg:bg-transparent transition-all duration-500 ease-in-out ${open ? 'top-[74px] opacity-100' : 'top-[-400px] lg:top-0 opacity-0 lg:opacity-100'} text-center lg:text-left border-b lg:border-none border-white/5`}>
                    <ul className='flex flex-col lg:flex-row lg:items-center lg:gap-8 p-6 lg:p-0'>
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    className={`${activeLink === link.id ? 'text-white active' : 'text-gray-400 font-medium hover:text-white transition-colors'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScroll(link.id);
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}

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
