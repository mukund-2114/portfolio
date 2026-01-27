import React from 'react';
import data from '../../data.json'
import { Icon } from '@iconify/react';

const AboutMe = ({ about }) => {
  // Define your data in JSON format


  return (
    <div className='about'>
      {about === "skills" && (
        <div className='lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
          {/* Frontend Section */}
          <div className="group">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5">
                <Icon icon="lucide:monitor" className="text-primary w-6 h-6" />
              </div>
              <h3 className='font-bold text-xl text-white/90 tracking-tight'>Modern Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.frontend.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-sm hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Section */}
          <div className="group">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20 shadow-lg shadow-secondary/5">
                <Icon icon="lucide:server" className="text-secondary w-6 h-6" />
              </div>
              <h3 className='font-bold text-xl text-white/90 tracking-tight'>Backend & Infrastructure</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.backendAndCloud.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-sm hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Tools Section */}
          <div className="group">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 shadow-lg shadow-accent/5">
                <Icon icon="lucide:sparkles" className="text-accent w-6 h-6" />
              </div>
              <h3 className='font-bold text-xl text-white/90 tracking-tight'>AI & DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.aiAndTools.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-sm hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Practices Section */}
          <div className="group">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Icon icon="lucide:settings" className="text-white/70 w-6 h-6" />
              </div>
              <h3 className='font-bold text-xl text-white/90 tracking-tight'>Engineering Culture</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.skills.practices.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-sm hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {about === "experience" && (
        <div className='lg:mt-10'>
          {data.experience.map(exp => (
            <div key={exp.title}>
              <div className='flex justify-between '>
                <h3>{exp.title}</h3>
                <h3>{exp.date}</h3>
              </div>
              <p className='text-base mt-4'>{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      {about === "education" && (
        <div className='lg:mt-10'>
          {data.education.map(edu => (
            <div key={edu.title} className=''>
              <div className='flex justify-between'>
                <h3>{edu.title}</h3>
                <h3>{edu.date}</h3>
              </div>
              <p className='text-base mt-4'>{edu.description}</p>
            </div>
          ))}
        </div>
      )}


      {about === "certification" && (
        <div className='lg:mt-10'>
          {data.certification.map(cert => (
            <div key={cert.title} className='lg:mr-5 mt-5'>
              <div className='lg:flex lg:items-center lg:justify-between'>
                <div className='flex items-center'>
                  <Icon icon={cert.icon} className={`${cert.icon == "simple-icons:canvas" ? "text-red-600" : "text-blue-500"}`} style={{ fontSize: '24px', marginRight: '8px' }} />
                  <h3>{cert.title}</h3>
                </div>
                <div className=' lg:mt-0 mt-2 '>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className='border border-white p-1 text-black bg-white'>View Credential</a>
                </div>
              </div>
              <div className='flex justify-between mt-2'>
                <p>{cert.organization}</p>
                <p>{cert.dateIssued}</p>
              </div>
              <div className='mt-2'>
                <p><strong>Skills :</strong> <span className='font-light'>{cert.skills.join(', ')}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}



    </div>
  );
};

export default AboutMe;