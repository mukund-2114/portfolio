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
              className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              key={index}
            >
              {/* The "Magic" Animated Border - Only visible on hover */}
              <div className='absolute inset-[-500%] bg-[conic-gradient(from_0deg,transparent_0%,#38bdf8_25%,transparent_50%,#818cf8_75%,transparent_100%)] animate-border-rotate opacity-0 group-hover:opacity-100 transition-opacity duration-1000' />

              {/* Card Content - Inheriting Glassmorphism */}
              <div className="relative h-full w-full bg-slate-950/80 backdrop-blur-3xl rounded-2xl overflow-hidden border border-white/[0.05] group-hover:border-transparent transition-all duration-500">
                <div className='aspect-video w-full overflow-hidden relative'>
                  {/* Image Placeholder/Skeleton fallback */}
                  <div className='w-full h-full bg-slate-900 absolute inset-0 -z-10'></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    loading="lazy"
                  />

                  {/* Glassy Overlay on hover */}
                  <div className='absolute inset-0 bg-dark/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center'>
                    <a
                      href={project.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-8 py-3 bg-primary text-dark font-bold rounded-xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl shadow-primary/20'
                    >
                      Launch Project
                    </a>
                  </div>
                </div>

                <div className='p-6 bg-gradient-to-b from-transparent to-white/[0.01]'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-xl font-bold text-white/90 group-hover:text-primary transition-colors duration-300'>
                      {project.title}
                    </h3>
                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                      <div className='h-2 w-2 rounded-full bg-primary animate-pulse'></div>
                    </div>
                  </div>
                  <p className='text-white/50 text-sm leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors duration-300'>
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;