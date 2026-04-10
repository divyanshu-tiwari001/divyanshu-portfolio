import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

// Custom Codecademy logo icon (official "cc" circle mark)
const CodecademyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="Codecademy">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.26 16.408c-.88.512-1.857.77-2.928.77-1.6 0-2.903-.5-3.908-1.498C2.9 14.682 2.397 13.392 2.397 12c0-1.392.503-2.682 1.507-3.68C4.91 7.322 6.213 6.822 7.812 6.822c1.057 0 2.022.252 2.893.755.87.503 1.55 1.207 2.04 2.11l-2.08 1.21c-.272-.562-.64-.994-1.1-1.296a2.847 2.847 0 0 0-1.584-.45c-.863 0-1.565.287-2.106.862-.54.574-.81 1.3-.81 2.176 0 .875.27 1.6.81 2.174.541.575 1.243.862 2.106.862.603 0 1.137-.153 1.6-.46.463-.306.835-.748 1.115-1.325l2.067 1.197c-.482.904-1.154 1.61-2.018 2.121zm8.65.77c-.879.512-1.857.77-2.928.77-1.6 0-2.903-.5-3.907-1.498-.303-.298-.565-.628-.785-.986l2.067-1.197c.28.577.652 1.019 1.115 1.325.463.307.997.46 1.6.46.864 0 1.566-.287 2.107-.862.54-.575.81-1.3.81-2.174 0-.876-.27-1.602-.81-2.176-.541-.575-1.243-.862-2.107-.862-.578 0-1.1.15-1.564.45-.464.3-.84.733-1.12 1.296l-2.08-1.21c.49-.903 1.17-1.607 2.04-2.11.871-.503 1.836-.755 2.894-.755 1.6 0 2.902.5 3.907 1.498 1.004.998 1.507 2.288 1.507 3.68 0 1.392-.503 2.682-1.507 3.68z"/>
  </svg>
);

export default function ContactSection({ isDark, formData, formStatus, formErrors, handleInputChange, handleSubmit }) {
  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-90 animate-gradient"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 animate-float-delay-2"></div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider text-white font-montserrat">
              Let's Connect
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white font-playfair">Ready to Collaborate?</h2>
          <p className="text-xl max-w-2xl mx-auto text-white/90 font-poppins">
            I'm always open to new opportunities and learning experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'divyanshutiwari@duck.com', link: 'mailto:divyanshutiwari@duck.com' },
              { icon: MapPin, label: 'Location', value: 'Motihari, Bihar, India', link: 'https://maps.app.goo.gl/vFeCLKMcwDbopCi79' }
            ].map((contact, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <contact.icon className="w-8 h-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <div>
                    <div className="text-sm font-semibold text-white/80 font-roboto mb-1">{contact.label}</div>
                    {contact.link ? (
                      <a href={contact.link} className="text-white font-semibold hover:underline font-poppins">{contact.value}</a>
                    ) : (
                      <div className="text-white font-semibold font-poppins">{contact.value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              {[
                { icon: Github, link: 'https://github.com/divyanshu-tiwari001' },
                { icon: Linkedin, link: 'https://www.linkedin.com/in/its-tiwari/' },
                { icon: Twitter, link: 'https://x.com/Divyanshut011' },
                { icon: Instagram, link: 'https://www.instagram.com/divyanshu.tiiwari' },
                { icon: CodecademyIcon, link: 'https://www.codecademy.com/profiles/divyanshutiwari01' }
              ].map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-125 hover:rotate-12">
                  <social.icon className="w-6 h-6 text-white group-hover:text-orange-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-2">
              <Send className="w-6 h-6" />
              Send Me a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Honeypot field — hidden from real users, traps bots */}
              <input
                type="text"
                name="_honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                />
                {formErrors.name && <p className="text-xs text-red-300 mt-1">{formErrors.name}</p>}
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                />
                {formErrors.email && <p className="text-xs text-red-300 mt-1">{formErrors.email}</p>}
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 1234567890 (optional)"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                />
                {formErrors.subject && <p className="text-xs text-red-300 mt-1">{formErrors.subject}</p>}
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell me about your project, idea, or just say hi..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 resize-none font-roboto"
                />
                {formErrors.message && <p className="text-xs text-red-300 mt-1">{formErrors.message}</p>}
              </motion.div>

              <button
                type="submit"
                disabled={formStatus === 'loading' || formStatus === 'success'}
                className="w-full px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 font-poppins relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === 'loading' && (
                    <>
                      <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Sent!</span>
                    </>
                  )}
                  {(formStatus === 'idle' || formStatus === 'error') && (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-white text-center"
                >
                  <p className="text-sm">Unable to send message. Please check your connection and try again, or email me directly at divyanshutiwari@duck.com</p>
                </motion.div>
              )}

              <p className="text-xs text-white/60 text-center font-roboto">
                Your message will be sent directly to my email
              </p>
            </form>

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-white text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm text-white/80">I'll get back to you soon.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
