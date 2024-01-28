import React from 'react'

const Project = () => {
    const handleDivClick = (website) => {
        const newTab = window.open(website, '_blank');
        newTab.focus();
      };
  return (
    // this is the projects sections 
    //Mukund Kapadia 301403876 24/01/2024 Project.jsx
    // also some projects listed here when click can be accessed as they are hosted live
    
    <section className='flex items-center mb-10' id='project'>    
    <div className='w-4/6 mx-auto flex flex-col justify-center items-center'>
        <h1 className='font-extrabold text-5xl'>My Projects</h1>
        <div className='grid grid-cols-3 gap-5 mt-2'>

        <div className="pcards border border-white relative" onClick={()=>handleDivClick('https://cheerful-kashata-a3ec8d.netlify.app/')}>
            <div style={{width:"420px",height:"250px"}}>
                    <img src="apple.png" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400 '>Apple Landing Page Clone</h3>
                        <p className='text-sm mt-2'>From cutting-edge devices to seamless software integration, AppleClone captures the spirit of innovation, simplicity, and elegance that defines the Apple ecosystem.</p>
                        
                </div>
            </div>

            <div className="pcards border border-white relative">
            <div style={{width:"420px",height:"250px"}}>
                    <img src="aribnb.jpg" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400 '>Airbnb Clone</h3>
                        <p className='text-sm mt-2'>AirbnbClone offers a streamlined platform for users to effortlessly discover, book, and host unique accommodations, simplifying the travel experience for both guests and hosts.</p>
                        
                </div>
            </div>
            
            <div className="pcards border border-white relative" onClick={()=>handleDivClick('https://tiny-begonia-6358f5.netlify.app/')}>
            <div style={{width:"420px",height:"250px"}}>
                    <img src="multipshop.png" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400 '>Multishop</h3>
                        <p className='text-sm mt-2'>Explore our curated collection of exquisite furniture crafted to transform your living spaces. From modern elegance to timeless classics and style that truly complements your lifestyle.</p>
                        
                </div>
            </div>
           
            <div className="pcards border border-white relative" onClick={()=>handleDivClick('https://remarkable-sopapillas-50641b.netlify.app/')}>
            <div style={{width:"420px",height:"250px"}}>
                    <img src="eccomerce.png" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400'>Full Stack Ecommerce Website</h3>
                        <p className='text-sm mt-2'>Offering a user-friendly interface, secure transactions, and efficient order management,SastiDukan provides customers with a convenient and satisfying shopping experience.</p>
                        
                </div>
            </div>
            
            <div className="pcards border border-white relative" onClick={()=>handleDivClick('https://wondrous-dragon-9fee94.netlify.app/')}>
            <div style={{width:"420px",height:"250px"}}>
                    <img src="vegefoods.png" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400'>Vegefoods</h3>
                        <p className='text-sm mt-2'>With convenient online ordering and doorstep delivery, Vegefoods brings the goodness of the farm straight to your kitchen, ensuring a healthy and flavorful dining experience</p>
                        
                </div>
            </div>
            <div className="pcards border border-white relative">
            <div style={{width:"420px",height:"250px"}}>
                    <img src="bus.jpg" alt="" className='w-[100%] h-[100%]'/>
                </div>
                <div className='text-center p-4'> 
                    <h3 className='text-lg border border-x-0 border-y-green-400'>Exploriana Travels</h3>
                        <p className='text-sm mt-2'>With an intuitive interface, real-time schedules, and secure transactions, travelers can easily plan and book their bus journeys, enhancing the convenience of bus travel arrangements.</p>
                        
                </div>
            </div>
            
           
        </div>
    </div>
    </section>

  )
}

export default Project