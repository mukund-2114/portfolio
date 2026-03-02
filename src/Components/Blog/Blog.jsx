import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { blogs } from './blogData';

const Blog = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 lg:py-32 relative z-10">
            <div className="w-[90%] lg:w-4/6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12 lg:mb-20 text-center"
                >
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Articles</span>
                    </h2>
                    <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights on web development, design, and my journey in tech.
                    </p>
                </motion.div>

                {/* Grid of Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                            onClick={() => navigate(`/blog/${blog.id}`)}
                        >
                            <div className="relative overflow-hidden aspect-[16/10]">
                                <img
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {blog.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-mono">
                                    <span>{blog.date}</span>
                                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                    <span>{blog.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                    {blog.summary}
                                </p>
                                
                                <div className="mt-auto flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                    Read Article <Icon icon="lucide:arrow-right" className="ml-2 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
