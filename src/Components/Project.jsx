import React from 'react';
import projectsData from '../data.json'; // Import the JSON file

const Project = () => {
  const handleDivClick = (website) => {
    const newTab = window.open(website, '_blank');
    newTab.focus();
  };

  return (
    <section className='flex items-center' id='project'>
      <div className='w-4/6 mx-auto flex flex-col justify-center items-center'>
        <h1 className='font-extrabold text-5xl'>My Projects</h1>
        <div className='grid grid-cols-3 gap-5 mt-10'>
          {projectsData.projects.map(project => (
            <div className="pcards border border-white relative" key={project.title} onClick={() => handleDivClick(project.website)}>
              <div style={{ width: "400px", height: "230px" }}>
                <img src={project.image} alt={project.title} className='w-[100%] h-[100%]' />
              </div>
              <div className='text-center p-4'>
                <h3 className='text-lg border border-x-0 border-y-green-400'>{project.title}</h3>
                <p className='text-sm mt-2'>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
