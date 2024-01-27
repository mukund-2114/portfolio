import React from 'react'
import { Icon } from '@iconify/react';
import { saveAs } from 'file-saver';
import resume from '../Components/resume.pdf'

const Contact = () => {
    const handleDownload = () => {
        // Use FileSaver.js to save the existing PDF file
        saveAs(resume, 'resume.pdf');
      };
  return (
    <section className='h-[85vh] flex items-center' id='contact'>
        <div className='w-4/6 mx-auto flex gap-10 p-5 justify-center mt-10'>
        <div className='space-y-5  p-10 w-[50%]'>
            <h1 className='font-extrabold text-5xl mb-7'>Contact Me</h1>
            <div className='flex gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m5.812 11l2.178 2.168a1.1 1.1 0 0 0 1.05.3a1.119 1.119 0 0 0 .809-.74l3.576-10.72A1.118 1.118 0 0 0 11.987.57L1.267 4.147a1.119 1.119 0 0 0-.74.859a1.099 1.099 0 0 0 .3 1l2.737 2.737l-.09 3.466zM13.106.79L3.564 8.742"/></svg>
                <span>mukund@gmail.com</span>
            </div>
            <div className='flex gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none"><g clipPath="url(#healthiconsPhoneNegative0)"><path fill="currentColor" fillRule="evenodd" d="M48 0H0v48h48zM26.42 34.76c-5.66-2.9-10.3-7.52-13.18-13.18l4.4-4.4c.56-.56.72-1.34.5-2.04A22.72 22.72 0 0 1 17 8c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2c0 18.78 15.22 34 34 34c1.1 0 2-.9 2-2v-6.98c0-1.1-.9-2-2-2c-2.48 0-4.9-.4-7.14-1.14c-.7-.24-1.5-.06-2.04.48z" clipRule="evenodd"/></g><defs><clipPath id="healthiconsPhoneNegative0"><path d="M0 0h48v48H0z"/></clipPath></defs></g></svg>
                <span>437-249-2900</span>
            </div>
            <ul className='flex gap-3'>
                            <li><Icon icon="skill-icons:instagram" width={20}/></li>
                            <li><Icon icon="devicon:linkedin" width={20}/></li>
                            <li><Icon icon="devicon:github" width={20} className='bg-white rounded-sm'/></li>
            </ul>
            <button className='border rounded px-8 py-2 cursor-pointer'onClick={handleDownload}>Download CV</button>
        </div>

        <div className='flex flex-col gap-5 p-10 w-full'>
            <input type="text" placeholder='Your Name' className='px-5 p-2' />
            <input type="email" placeholder='Your Email' className='px-5 p-2'  />
            <textarea name="" id="" cols="30" rows="5" placeholder='Your Message' className='px-5 p-2' ></textarea>
             <button className='border rounded px-7 py-2 cursor-pointer w-52 mx-auto'>Submit</button>

        </div>
    </div>
    </section>
  )
}

export default Contact