import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { adminData, lessons, SECTION_TITLES } from '../data/mockData';
import { 
  ArrowLeft, Users, BookOpen, BarChart3, Settings, Plus, Edit, Trash2, 
  ChevronDown, ChevronRight, Eye, Clock, Award, Activity, TrendingUp,
  Video, FileText, HelpCircle, GripVertical
} from 'lucide-react';

export default function AdminPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'content', label: t('manageContent'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'students', label: t('students'), icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: t('analytics'), icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{t('adminPanel')}</h1>
              <p className="text-xs text-gray-500">XL in Maths Management</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1">
            {t('logout')}
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Total Students</span>
                </div>
                <p className="text-2xl font-bold">{adminData.totalStudents}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Activity className="w-5 h-5" />
                  <span className="text-sm">Active Today</span>
                </div>
                <p className="text-2xl font-bold">{adminData.activeToday}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">Lessons</span>
                </div>
                <p className="text-2xl font-bold">{adminData.lessonsCreated}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Avg Completion</span>
                </div>
                <p className="text-2xl font-bold">{adminData.avgCompletionRate}%</p>
              </div>
            </div>

            {/* Recent Activity & Top Students */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {adminData.recentActivity.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <div className="flex-1">
                        <span className="font-medium">{item.student}</span>
                        <span className="text-gray-500"> — {item.action}</span>
                      </div>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Top Students</h3>
                <div className="space-y-3">
                  {adminData.topStudents.map((student, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-400' : 'bg-indigo-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">Class {student.class} • {student.watchTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-indigo-600">{student.progress}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
                <p className="text-sm text-gray-500">CBSE → Class 8 → Mathematics</p>
              </div>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" /> Add Lesson
              </button>
            </div>

            {/* Add Lesson Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6 border-2 border-indigo-200">
                <h3 className="font-semibold text-gray-900 mb-4">Add New Lesson</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title (English)</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter lesson title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title (Malayalam)</label>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="പാഠ ശീർഷകം" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={2} placeholder="Brief description" />
                </div>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">Create Lesson</button>
                  <button onClick={() => setShowAddForm(false)} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            )}

            {/* Lesson List with Sections */}
            <div className="space-y-3">
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                      <p className="text-xs text-gray-500">{lesson.totalSections} sections • {lesson.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      {expandedLesson === lesson.id ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </button>

                  {expandedLesson === lesson.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sections (8 fixed per lesson)</h5>
                      <div className="space-y-2">
                        {SECTION_TITLES.map((title, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                            <span className="text-xs font-bold text-gray-400 w-5">{sIdx + 1}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{title}</p>
                            </div>
                            <select className="text-xs border border-gray-300 rounded px-2 py-1">
                              <option>Video</option>
                              <option>Video + Quiz + Explainer</option>
                              <option>Text + Quiz + Explainer</option>
                            </select>
                            <div className="flex gap-1">
                              <button className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium">Edit Content</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Management</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Search students..." />
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Classes</option>
                  <option>Class 5</option>
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-500">Student</th>
                    <th className="text-left p-3 font-medium text-gray-500">Class</th>
                    <th className="text-left p-3 font-medium text-gray-500">Progress</th>
                    <th className="text-left p-3 font-medium text-gray-500">Watch Time</th>
                    <th className="text-left p-3 font-medium text-gray-500">Last Active</th>
                    <th className="text-left p-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Arjun Kumar', class: 8, progress: 72, time: '18h', lastActive: '2 min ago' },
                    { name: 'Sneha Rajan', class: 9, progress: 85, time: '24h', lastActive: '5 min ago' },
                    { name: 'Priya Sharma', class: 7, progress: 68, time: '15h', lastActive: '1 hr ago' },
                    { name: 'Ravi Menon', class: 10, progress: 62, time: '12h', lastActive: '3 hrs ago' },
                    { name: 'Arun Thomas', class: 6, progress: 45, time: '8h', lastActive: '1 day ago' },
                  ].map((student, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{student.name}</td>
                      <td className="p-3 text-gray-600">Class {student.class}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-gray-600">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{student.time}</td>
                      <td className="p-3 text-gray-500">{student.lastActive}</td>
                      <td className="p-3">
                        <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('analytics')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Watch Time by Lesson</h3>
                <div className="space-y-3">
                  {['Basic Fundamentals', 'Number Systems', 'Intro to Algebra', 'Geometry'].map((name, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{name}</span>
                        <span className="text-gray-500">{[450, 320, 180, 90][idx]} hrs total</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${[90, 65, 35, 18][idx]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Quiz Pass Rates</h3>
                <div className="space-y-3">
                  {['Lesson 1 - MCQ', 'Lesson 1 - Exercise', 'Lesson 2 - MCQ', 'Lesson 2 - Exercise'].map((name, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{name}</p>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className={`h-full rounded-full ${[85, 72, 68, 55][idx] >= 70 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${[85, 72, 68, 55][idx]}%` }} />
                      </div>
                      <span className="text-sm font-medium w-10 text-right">{[85, 72, 68, 55][idx]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-4">Student Engagement (Last 7 Days)</h3>
                <div className="flex items-end justify-between gap-3 h-40">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                    const heights = [65, 72, 45, 80, 58, 90, 55];
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-indigo-100 rounded-t-lg relative" style={{ height: `${heights[idx]}%` }}>
                          <div className="absolute inset-0 bg-indigo-500 rounded-t-lg opacity-80" />
                        </div>
                        <span className="text-xs text-gray-500">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
