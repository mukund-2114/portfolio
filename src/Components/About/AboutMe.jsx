import React from 'react';
import data from '../../data.json'
import { Icon } from '@iconify/react';

const AboutMe = ({ about }) => {
  // Define your data in JSON format


  return (
    <div className='about'>
      {about === "skills" && (
        <div className='lg:mt-10 grid lg:grid-cols-2 gap-4'>
          <div>
            <h3 className='font-bold text-lg mb-2'>Frontend</h3>
            <ul className='list-disc px-4'>
              {data.skills.frontend.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2'>Backend & Cloud</h3>
            <ul className='list-disc px-4'>
              {data.skills.backendAndCloud.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2'>AI & Tools</h3>
            <ul className='list-disc px-4'>
              {data.skills.aiAndTools.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-lg mb-2'>Practices</h3>
            <ul className='list-disc px-4'>
              {data.skills.practices.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
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