import React from 'react';
import projectsData from '../data.json'; // Import the JSON file

const Project = () => {
  const handleDivClick = (website) => {
    const newTab = window.open(website, '_blank');
    newTab.focus();
  };

  return (
    <section className='min-h-screen py-20 px-4' id='project'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block'>
            Featured Projects
          </h1>
          <p className='text-muted text-lg max-w-2xl mx-auto'>
            A collection of projects showcasing my journey in full-stack development and AI integration.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projectsData.projects.map((project, index) => (
            <div
              className="pcards group relative bg-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
              key={index}
            >
              <div className='aspect-video w-full overflow-hidden'>
                <div className='w-full h-full bg-slate-800 animate-pulse absolute inset-0 -z-10'></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6'>
                  <a
                    href={project.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='px-6 py-2 bg-primary text-dark font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white'
                  >
                    View Project
                  </a>
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors'>
                  {project.title}
                </h3>
                <p className='text-muted text-sm line-clamp-3'>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;