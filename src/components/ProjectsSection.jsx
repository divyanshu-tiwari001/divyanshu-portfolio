import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code, Github, Sparkles, ExternalLink, Rocket, CalendarDays, Users } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const CARD_BASE = 'group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl';
const TILT_PROPS = {
  tiltMaxAngleX: 10,
  tiltMaxAngleY: 10,
  scale: 1.02,
  transitionSpeed: 400,
  glareEnable: true,
  glareMaxOpacity: 0.2,
  glarePosition: 'all',
};

const ProjectCard = React.memo(function ProjectCard({
  isDark,
  icon,
  year,
  title,
  subtitle,
  description,
  tags,
  stats,
  githubUrl,
  liveUrl,
  gradientFrom,
  gradientTo,
  glowColor,
  borderColor,
  chipColor,
  textColor,
  iconBadgeTextColor,
  iconBadgeBorderColor,
  glareColor,
}) {
  const Icon = icon;

  return (
    <motion.div variants={staggerItem}>
      <Tilt {...TILT_PROPS} glareColor={glareColor}>
        <div
          className={`${CARD_BASE} hover:shadow-${glowColor}-500/30 ${
            isDark
              ? `bg-slate-900/50 border-slate-800 hover:border-${borderColor}-500/50`
              : `bg-white/50 border-slate-200 hover:border-${borderColor}-500/50`
          }`}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div
              className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br from-${gradientFrom}-500 to-${gradientTo}-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg flex-shrink-0`}
            >
              <Icon className="w-10 h-10 text-white" />
              <div
                className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isDark ? `bg-slate-800 text-${iconBadgeTextColor}-400` : `bg-white text-${iconBadgeTextColor}-600`
                } border border-${iconBadgeBorderColor}-500/50`}
              >
                {year}
              </div>
            </div>

            <div className="flex-1">
              <h3 className={`text-3xl font-bold mb-1 font-poppins bg-gradient-to-r from-${gradientFrom}-500 to-${gradientTo}-500 bg-clip-text text-transparent`}>
                {title}
              </h3>

              <p className={`text-sm font-semibold mb-4 font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {subtitle}
              </p>

              <p className={`mb-6 font-roboto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isDark ? `bg-${chipColor}-500/20 text-${chipColor}-400` : `bg-${chipColor}-500/20 text-${chipColor}-600`
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={`flex flex-wrap gap-6 mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r from-${gradientFrom}-500 to-${gradientTo}-500 bg-clip-text text-transparent font-poppins`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-${gradientFrom}-500 to-${gradientTo}-500 text-white font-bold font-poppins hover:scale-105 hover:shadow-lg transition-all duration-300`}
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>

                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-bold font-poppins hover:scale-105 transition-all duration-300 ${
                      isDark ? `border-${textColor}-500/50 text-${textColor}-400 hover:bg-${textColor}-500/20` : `border-${textColor}-500/50 text-${textColor}-600 hover:bg-${textColor}-500/10`
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
});

function ProjectsSection({ isDark }) {
  const projects = [
    // Existing 1 (unchanged theme)
    {
      icon: Sparkles,
      year: '2025',
      title: 'Premium Student Portfolio',
      subtitle: 'React · Tailwind CSS · Framer Motion · Vercel',
      description:
        'This flagship portfolio is a premium front-end showcase built with React, Tailwind CSS, and Framer Motion—crafted for smooth animations, optimized performance, and polished visual storytelling.',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'Performance Optimization', 'Web Design'],
      stats: [
        { value: '98.8%', label: 'JavaScript' },
        { value: '0.9%', label: 'CSS' },
        { value: '0.1%', label: 'HTML' },
      ],
      githubUrl: 'https://github.com/divyanshu-tiwari001/divyanshu-portfolio',
      liveUrl: 'https://divyanshu.is-a.dev/',
      gradientFrom: 'purple',
      gradientTo: 'pink',
      glowColor: 'purple',
      borderColor: 'purple',
      chipColor: 'purple',
      textColor: 'purple',
      iconBadgeTextColor: 'purple',
      iconBadgeBorderColor: 'purple',
      glareColor: '#a855f7',
    },

    // Existing 2 (unchanged theme)
    {
      icon: Code,
      year: '2026',
      title: 'Class 11th IP Practicals',
      subtitle: 'Informatics Practices — Python & MySQL',
      description:
        'A comprehensive collection of 16 Python programs and 9 MySQL queries covering core IP syllabus — from grade calculators and financial math to dictionary operations and full SQL query practice.',
      tags: ['Python', 'MySQL', 'Data Structures', 'CRUD'],
      stats: [
        { value: '16', label: 'Python Programs' },
        { value: '9', label: 'MySQL Queries' },
        { value: '25', label: 'Total Programs' },
      ],
      githubUrl: 'https://github.com/divyanshu-tiwari001/class11th-practical',
      liveUrl: '',
      gradientFrom: 'blue',
      gradientTo: 'cyan',
      glowColor: 'blue',
      borderColor: 'blue',
      chipColor: 'blue',
      textColor: 'blue',
      iconBadgeTextColor: 'blue',
      iconBadgeBorderColor: 'blue',
      glareColor: '#3b82f6',
    },

    // New 1 (required order)
    {
      icon: Rocket,
      year: '2026',
      title: 'Agency OS Prototype',
      subtitle: 'Agency workflow system prototype',
      description:
        'Prototype for an Agency OS style workflow experience focused on structured operations, management flow, and clear UI-driven process handling.',
      tags: ['JavaScript', 'UI/UX', 'Workflow', 'Prototype'],
      stats: [
        { value: 'v1', label: 'Prototype' },
        { value: 'UI', label: 'Focused' },
        { value: 'Fast', label: 'Iteration' },
      ],
      githubUrl: 'https://github.com/divyanshu-tiwari001/Agency-OS-Prototype-',
      liveUrl: 'https://divyanshu-tiwari001.github.io/Agency-OS-Prototype-/',
      gradientFrom: 'emerald',
      gradientTo: 'teal',
      glowColor: 'emerald',
      borderColor: 'emerald',
      chipColor: 'emerald',
      textColor: 'emerald',
      iconBadgeTextColor: 'emerald',
      iconBadgeBorderColor: 'emerald',
      glareColor: '#10b981',
    },

    // New 2 (required order)
    {
      icon: CalendarDays,
      year: '2026',
      title: 'RSVP Platform (Class 12th)',
      subtitle: 'Event RSVP workflow platform',
      description:
        'A practical RSVP platform tailored for class-level event flow, participant responses, and structured submission handling with a modern interface.',
      tags: ['RSVP', 'Forms', 'Frontend', 'Event Tech'],
      stats: [
        { value: 'Class 12', label: 'Target' },
        { value: 'RSVP', label: 'Flow' },
        { value: 'Modern', label: 'UI' },
      ],
      githubUrl: 'https://github.com/divyanshu-tiwari001/RSVP-Platform-Class-12th',
      liveUrl: 'https://divyanshu-tiwari001.github.io/RSVP-Platform-Class-12th/',
      gradientFrom: 'amber',
      gradientTo: 'orange',
      glowColor: 'amber',
      borderColor: 'amber',
      chipColor: 'amber',
      textColor: 'amber',
      iconBadgeTextColor: 'amber',
      iconBadgeBorderColor: 'amber',
      glareColor: '#f59e0b',
    },

    // New 3 (required order)
    {
      icon: Users,
      year: '2026',
      title: 'Twilight 2026 Farewell RSVP',
      subtitle: 'Farewell event RSVP experience',
      description:
        'A themed farewell RSVP app for Twilight 2026, designed to collect attendee responses with a clean and engaging event-first user experience.',
      tags: ['Event App', 'RSVP', 'Frontend', 'Themed UI'],
      stats: [
        { value: 'Twilight', label: 'Theme' },
        { value: '2026', label: 'Batch' },
        { value: 'Live', label: 'Ready' },
      ],
      githubUrl: 'https://github.com/divyanshu-tiwari001/Twilight-2026---Farewell-RSVP-to-class-12th',
      liveUrl: 'https://divyanshu-tiwari001.github.io/Twilight-2026---Farewell-RSVP-to-class-12th/',
      gradientFrom: 'rose',
      gradientTo: 'red',
      glowColor: 'rose',
      borderColor: 'rose',
      chipColor: 'rose',
      textColor: 'rose',
      iconBadgeTextColor: 'rose',
      iconBadgeBorderColor: 'rose',
      glareColor: '#f43f5e',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-float-slow" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-montserrat">
              My Work
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Projects</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Real-world projects demonstrating practical application of my skills
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto space-y-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} isDark={isDark} {...project} />
          ))}

          <motion.div variants={staggerItem}>
            <div
              className={`p-10 rounded-3xl border-2 border-dashed backdrop-blur-xl transition-all duration-500 hover:border-solid ${
                isDark ? 'border-blue-700/60 bg-slate-800/30 hover:border-blue-500/80' : 'border-blue-300 bg-blue-50/40 hover:border-blue-400'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold font-poppins mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Always Building
                </h4>
                <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  New projects with Python, React, and AI are actively in development — check back soon for more!
                </p>
                <a
                  href="https://github.com/divyanshu-tiwari001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 mt-4 text-sm font-semibold font-poppins transition-all duration-300 hover:scale-105 ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  Follow on GitHub for updates
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const areEqual = (prev, next) => prev.isDark === next.isDark;
export default React.memo(ProjectsSection, areEqual);
