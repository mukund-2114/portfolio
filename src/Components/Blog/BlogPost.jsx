import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { blogs } from './blogData';
import OIDCAnimation from './Animations/OIDCAnimation';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Find the blog from our "database"
        const foundBlog = blogs.find(b => b.id.toString() === id);
        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            // Re-route to home if not found
            navigate('/');
        }
    }, [id, navigate]);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    if (!blog) return null;

    return (
        <div className="min-h-screen bg-[#050505] relative w-full pt-10">
            {/* Nav Header */}
            <div className="fixed top-0 left-0 w-full p-6 z-[100] bg-gradient-to-b from-[#050505] to-transparent">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2"
                >
                    <Icon icon="lucide:arrow-left" className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Portfolio</span>
                </button>
            </div>

            {/* Article Container wrapper properly centered without modal constraint */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl mx-auto pb-32 mt-12 px-4 shadow-2xl"
            >
                {/* Hero Image Section */}
                <div className="w-full h-[300px] lg:h-[500px] relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="px-4 lg:px-12 -mt-32 relative z-10 text-left">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-400 font-mono mb-16 border-b border-white/5 pb-8">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <Icon icon="lucide:calendar" />
                            <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <Icon icon="lucide:clock" />
                            <span>{blog.readTime}</span>
                        </div>
                    </div>

                    {/* Dynamic Content Renderer */}
                    <article className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {blog.content.map((block, idx) => {
                            // Rich text parser for all block texts
                            const htmlContent = block.text ? block.text
                                .replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-semibold">$1</b>')
                                .replace(/\*(.*?)\*/g, '<i class="text-emerald-400 italic font-medium">$1</i>')
                                .replace(/==(.*?)==/g, '<span class="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-md font-medium border border-blue-500/30">$1</span>')
                                .replace(/`(.*?)`/g, '<code class="bg-[#1a1a1a] text-emerald-400 px-1.5 py-0.5 rounded-md text-sm border border-white/10 font-mono">$1</code>')
                                .replace(/\n/g, '<br/>') : '';

                            if (block.type === 'paragraph') {
                                return <p key={idx} className="mb-8 leading-relaxed text-lg text-gray-400" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                            }
                            if (block.type === 'heading') {
                                return <h2 key={idx} className="text-3xl lg:text-4xl font-bold text-white mt-16 mb-8 pb-4 border-b border-white/5">{block.text}</h2>;
                            }
                            if (block.type === 'subheading') {
                                return <h3 key={idx} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mt-12 mb-6">{block.text}</h3>;
                            }
                            if (block.type === 'callout') {
                                return (
                                    <div key={idx} className="my-10 p-6 lg:p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/5 border border-emerald-500/20 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-blue-500 rounded-l-2xl" />
                                        <p className="text-emerald-100/90 text-lg lg:text-xl leading-relaxed m-0" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                    </div>
                                );
                            }
                            if (block.type === 'image') {
                                return (
                                    <figure key={idx} className="my-16">
                                        <div className="bg-[#111]/80 p-4 lg:p-6 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex justify-center items-center">
                                            <img src={block.src} alt={block.caption || 'Article image'} className="max-w-full h-auto rounded-xl object-contain" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center text-sm text-gray-500 mt-6 font-mono px-4 lg:px-20 leading-relaxed border-l-2 border-gray-700 mx-auto max-w-2xl pl-4">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                            if (block.type === 'internalLink') {
                                return (
                                    <div 
                                        key={idx} 
                                        onClick={() => navigate(block.link)}
                                        className={`my-12 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center group cursor-pointer hover:bg-white/10 transition-colors ${block.direction === 'left' ? 'justify-start' : 'justify-between'}`}
                                    >
                                        {block.direction === 'left' && (
                                            <Icon icon="lucide:arrow-left" className="text-gray-400 group-hover:text-white group-hover:-translate-x-2 transition-all text-2xl mr-6 flex-shrink-0" />
                                        )}
                                        <div className={block.direction === 'left' ? 'text-left' : 'text-left'}>
                                            <span className="text-emerald-400 text-sm font-bold tracking-wider uppercase mb-2 block">{block.label}</span>
                                            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{block.title}</span>
                                        </div>
                                        {block.direction !== 'left' && (
                                            <Icon icon="lucide:arrow-right" className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all text-2xl ml-6 flex-shrink-0" />
                                        )}
                                    </div>
                                );
                            }
                            if (block.type === 'animation' && block.name === 'oidc') {
                                return <OIDCAnimation key={idx} />;
                            }
                            return null;
                        })}
                    </article>
                    
                    {/* End of article marker */}
                    <div className="mt-20 flex justify-center border-t border-white/5 pt-12">
                        <div className="flex items-center gap-4 text-gray-500 font-mono">
                            <span className="w-12 h-[1px] bg-gray-600 block rounded-full" />
                            <Icon icon="lucide:check-circle-2" className="text-emerald-500" />
                            <span>End of Article</span>
                            <span className="w-12 h-[1px] bg-gray-600 block rounded-full" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPost;
