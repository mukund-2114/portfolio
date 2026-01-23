import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { saveAs } from 'file-saver';
import resume from '../Components/resume.pdf';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleDownload = () => {
        saveAs(resume, 'resume.pdf');
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE ID, TEMPLATE ID, AND PUBLIC KEY
        // Sign up at https://www.emailjs.com/
        const SERVICE_ID = 'service_5evsxnc';
        const TEMPLATE_ID = 'template_btsy0tj';
        const PUBLIC_KEY = 'wxmT3d03F99HM0Xy3';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setLoading(false);
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                e.target.reset();
            }, (error) => {
                setLoading(false);
                setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
                console.error('EmailJS Error:', error.text);
            });
    };

    return (
        <section className='min-h-[85vh] flex items-center justify-center py-20 px-4' id='contact'>
            <div className='max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center bg-card p-8 lg:p-12 rounded-3xl border border-white/10 backdrop-blur-md'>

                <div className='space-y-8'>
                    <div>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block'>
                            Let's Connect
                        </h1>
                        <p className='text-muted text-lg'>
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className='flex items-center gap-4 group'>
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div>
                                <h3 className="text-sm text-muted font-medium">Email Me</h3>
                                <p className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">mdrkkapadia@gmail.com</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 group'>
                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm text-muted font-medium">Call Me</h3>
                                <p className="text-lg font-semibold hover:text-secondary transition-colors cursor-pointer">437-249-2900</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm text-muted font-medium mb-4">Follow Me</h3>
                        <ul className='flex gap-4'>
                            <li>
                                <a href="https://www.instagram.com/mukund.kapadia1987/" target='_blank' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 transform duration-300">
                                    <Icon icon="skill-icons:instagram" width={20} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/mukund1987/" target='_blank' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 transform duration-300">
                                    <Icon icon="devicon:linkedin" width={20} />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/mukund-2114" target='_blank' className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 transform duration-300">
                                    <Icon icon="akar-icons:github-fill" width={20} className="text-white" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button className='px-8 py-3 rounded-lg font-bold border border-secondary/50 bg-transparent hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/30 transition-all text-white w-fit' onClick={handleDownload}>Download CV</button>
                </div>

                <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-6 bg-dark/30 p-6 lg:p-8 rounded-2xl border border-white/5'>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Your Name</label>
                            <input type="text" name="from_name" required placeholder='John Doe' className='w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all' />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Your Email</label>
                            <input type="email" name="from_email" required placeholder='john@example.com' className='w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all' />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Message</label>
                            <textarea name="message" required rows="4" placeholder='Tell me about your project...' className='w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none' ></textarea>
                        </div>
                    </div>
                    {status.message && (
                        <div className={`p-3 rounded text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {status.message}
                        </div>
                    )}
                    <button type="submit" disabled={loading} className='w-full py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;