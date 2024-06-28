import React from 'react';
import projectsData from '../data.json'; // Import the JSON file

const Project = () => {
  const handleDivClick = (website) => {
    const newTab = window.open(website, '_blank');
    newTab.focus();
  };

  return (
    <section className='lg:flex items-center justify-center lg:h-[110vh] h-auto w-full' id='project'>
      <div className='lg:w-4/6 w-full lg:p-0 lg:pt-10 p-3 mx-auto flex flex-col items-center'>
        <h1 className='lg:font-extrabold font-bold lg:text-5xl text-3xl text-center lg:text-left'>My Projects</h1>
        <div className='lg:grid lg:grid-cols-3 grid grid-cols-1 lg:gap-5 gap-8 mt-10'>
          {projectsData.projects.map(project => (
            <div className="pcards border border-white relative" key={project.title} onDoubleClick={() => handleDivClick(project.website)}>
              <div className='lg:w-[400px] lg:h-[230px] w-full h-52'>
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