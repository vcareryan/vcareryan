import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Award, Users, Globe, Smartphone, Shield, BarChart3, ChevronRight, Star } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{t('appName')}</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">{t('howItWorks')}</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">{t('features')}</a>
              <button onClick={() => navigate('/login')} className="text-gray-700 font-medium hover:text-indigo-600 transition">
                {t('login')}
              </button>
              <button onClick={() => navigate('/signup')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md">
                {t('signup')}
              </button>
            </div>
            <div className="md:hidden flex gap-2">
              <button onClick={() => navigate('/login')} className="text-gray-700 font-medium px-3 py-2">
                {t('login')}
              </button>
              <button onClick={() => navigate('/signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
                {t('signup')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" /> For Classes 5-10 | CBSE & State Board
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {t('tagline')}
                <span className="block gradient-text">with VidyaPath</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={() => navigate('/signup')} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  {t('getStarted')} <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/login')} className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:text-indigo-600 transition flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" /> Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center md:justify-start text-sm text-gray-500">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 10,000+ Students</span>
                <span className="flex items-center gap-1"><Award className="w-4 h-4" /> 4.9 Rating</span>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              {/* App Preview Mock */}
              <div className="bg-gray-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="gradient-bg p-6 text-white text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">VidyaPath</h3>
                    <p className="text-indigo-100 text-sm">Class 8 - Mathematics</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Introduction</p>
                        <p className="text-xs text-green-600">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">▶</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Important Points</p>
                        <p className="text-xs text-indigo-600">In Progress</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-60">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">🔒</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400">Exercise</p>
                        <p className="text-xs text-gray-400">Locked</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-40">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">🔒</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400">Multiple Choice Questions</p>
                        <p className="text-xs text-gray-400">Locked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('howItWorks')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Simple 4-step process to start learning</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Globe className="w-8 h-8" />, title: t('step1Title'), desc: t('step1Desc'), step: '1' },
              { icon: <Play className="w-8 h-8" />, title: t('step2Title'), desc: t('step2Desc'), step: '2' },
              { icon: <Award className="w-8 h-8" />, title: t('step3Title'), desc: t('step3Desc'), step: '3' },
              { icon: <BarChart3 className="w-8 h-8" />, title: t('step4Title'), desc: t('step4Desc'), step: '4' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold md:right-auto md:-top-2 md:left-1/2 md:translate-x-5">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Flow Diagram */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Learning Journey</h2>
            <p className="text-lg text-gray-600">Here's exactly how VidyaPath guides your learning</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="space-y-6">
              {[
                { label: 'Sign Up', desc: 'WhatsApp OTP or Phone SMS', color: 'bg-green-500' },
                { label: 'Choose Language', desc: 'Malayalam / English / Hindi', color: 'bg-blue-500' },
                { label: 'Select Board', desc: 'CBSE or State Board', color: 'bg-purple-500' },
                { label: 'Pick Class', desc: 'Class 5 through Class 10', color: 'bg-orange-500' },
                { label: 'Start Lessons', desc: 'Sequential, locked content', color: 'bg-indigo-500' },
                { label: 'Complete Sections', desc: '8 sections per lesson, in order', color: 'bg-pink-500' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.label}</h4>
                        <p className="text-sm text-gray-500">{step.desc}</p>
                      </div>
                      {i < 5 && <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-white/80 rounded-xl border border-indigo-200">
              <h4 className="font-semibold text-gray-900 mb-2">📋 8 Fixed Sections in Every Lesson:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Introduction', 'Important Points', 'Exercise', 'Subjective Type Questions', 'Multiple Choice Questions', 'Previous Question Paper', 'Shortcuts', 'Conclusion'].map((s, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {i + 1}. {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('features')}</h2>
            <p className="text-lg text-gray-600">Everything you need to excel in your studies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-7 h-7" />, title: t('feature1Title'), desc: t('feature1Desc'), color: 'bg-indigo-100 text-indigo-600' },
              { icon: <Globe className="w-7 h-7" />, title: t('feature2Title'), desc: t('feature2Desc'), color: 'bg-green-100 text-green-600' },
              { icon: <Users className="w-7 h-7" />, title: t('feature3Title'), desc: t('feature3Desc'), color: 'bg-orange-100 text-orange-600' },
              { icon: <Smartphone className="w-7 h-7" />, title: t('feature4Title'), desc: t('feature4Desc'), color: 'bg-purple-100 text-purple-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Students & Parents Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-700 italic mb-4">{t('testimonial1')}</p>
              <p className="font-semibold text-gray-900">{t('testimonial1Author')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-700 italic mb-4">{t('testimonial2')}</p>
              <p className="font-semibold text-gray-900">{t('testimonial2Author')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">{t('ctaDesc')}</p>
            <button onClick={() => navigate('/signup')} className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition shadow-lg">
              {t('getStarted')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">VidyaPath</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Contact Us</a>
            </div>
            <p className="text-sm"> 2024 VidyaPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
