import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import img from '../assets/images/choplotto.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { theme } = useContext(ThemeContext);
    const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate('/login')
  }
    return (
        <nav className={`bg-slate shadow ${theme === 'dark' ? 'bg-black shadow-gray-700' : 'bg-gray-900 shadow-blue-200'} border-gray-200 text-center`}>
            <div className='flex justify-between ml-6 lg:ml-4 items-center mx-auto'>
                {/* <div className='flex justify-end items-end ml-10 mt-3'>
                    <ThemeToggle />
                </div> */}
                <div className='flex items-center mx-auto justify-center lg:h-[60px] h-[80px]'>
                    <span className='text-white font-serif text-[24px]'>Upload Image</span>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
