import React, { useState, useEffect, useRef } from 'react';
import { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal } from '../ui';
import { useApp, getExamName } from '../../context/AppContext';
import MOCK_DATA, { generateId } from '../../data/mockData';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// STUDENT MATERIALS
const StudentMaterialsPage = () => {
            const [selectedMaterial, setSelectedMaterial] = useState(null);

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">My Study Materials</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_DATA.materials.map(m => (
                            <Card key={m.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedMaterial(m)}>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <Icons.FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{m.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{m.subject} • {m.topic}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <Badge variant="primary">{m.exam}</Badge>
                                            <span className="text-xs text-gray-400">{m.type} • {m.size}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {selectedMaterial && (
                        <Modal isOpen={!!selectedMaterial} onClose={() => setSelectedMaterial(null)} title={selectedMaterial.title} size="xl">
                            <div className="h-[70vh] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <iframe 
                                    src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                                    className="w-full h-full"
                                    title="PDF Viewer"
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button onClick={() => setSelectedMaterial(null)}>Close</Button>
                            </div>
                        </Modal>
                    )}
                </div>
            );
        };

// REACT SECTION
const ReactPage = () => {
            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">React Mastery</h1>
                    <Card>
                        <h2 className="text-xl font-bold mb-4">Welcome to the React Section!</h2>
                        <p className="text-gray-600 mb-4">This new section can hold specific tutorials, materials, and components specifically for learning React JS.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <Icons.Cpu className="w-8 h-8 text-blue-600 mb-2" />
                                <h3 className="font-bold text-gray-900">React Fundamentals</h3>
                                <p className="text-sm text-gray-600">Learn about Hooks, State, and Props.</p>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                <Icons.Layers className="w-8 h-8 text-indigo-600 mb-2" />
                                <h3 className="font-bold text-gray-900">Advanced React</h3>
                                <p className="text-sm text-gray-600">Context API, Redux, and Performance.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        };

// STUDENT LAYOUT
const StudentLayout = ({ children, onNavigate, activePage }) => {
            const { user, logout, switchRole, notifications, sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen, selectedExam } = useApp();
            const [showNotifications, setShowNotifications] = useState(false);
            const unreadCount = notifications.filter(n => !n.read).length;

            const navItems = [
                { id: 'student-dashboard', label: 'Dashboard', icon: Icons.Home },
                { id: 'my-exam', label: 'My Exam', icon: Icons.Target },
                { id: 'courses', label: 'Courses', icon: Icons.BookOpen },
                { id: 'materials', label: 'Materials', icon: Icons.FileText },
                { id: 'ai-tutor', label: 'AI Tutor', icon: Icons.MessageSquare },
                { id: 'practice', label: 'Practice', icon: Icons.PenTool },
                { id: 'pyqs', label: 'PYQs', icon: Icons.FileText },
                { id: 'mock-tests', label: 'Mock Tests', icon: Icons.Trophy },
                { id: 'study-plan', label: 'Study Plan', icon: Icons.Calendar },
                { id: 'progress', label: 'Progress', icon: Icons.BarChart },
            ];

            const bottomNav = [
                { id: 'notifications', label: 'Notifications', icon: Icons.Bell },
                { id: 'profile', label: 'Profile', icon: Icons.User },
            ];

            return (
                <div className="min-h-screen bg-gray-50 flex">
                    {/* Desktop Sidebar */}
                    <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                        <div className="p-4 flex items-center justify-between">
                            {sidebarOpen ? (
                                <div className="flex items-center gap-2 font-bold text-xl text-indigo-900">
                                    <Icons.GraduationCap className="w-7 h-7 text-indigo-600" />
                                    AI Learn
                                </div>
                            ) : (
                                <Icons.GraduationCap className="w-7 h-7 text-indigo-600 mx-auto" />
                            )}
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded-lg">
                                {sidebarOpen ? <Icons.ChevronLeft className="w-5 h-5" /> : <Icons.ChevronRight className="w-5 h-5" />}
                            </button>
                        </div>

                        {selectedExam && sidebarOpen && (
                            <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                                <div className="text-xs text-indigo-600 font-medium mb-1">Preparing for</div>
                                <div className="font-bold text-indigo-900">{getExamName(selectedExam)}</div>
                            </div>
                        )}

                        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    {sidebarOpen && <span>{item.label}</span>}
                                </button>
                            ))}
                        </nav>

                        <div className="p-3 border-t border-gray-200 space-y-1">
                            {bottomNav.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    {sidebarOpen && <span>{item.label}</span>}
                                    {item.id === 'notifications' && unreadCount > 0 && sidebarOpen && (
                                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
                                    )}
                                </button>
                            ))}
                            <button
                                onClick={() => { logout(); onNavigate('landing'); }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                            >
                                <Icons.LogOut className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span>Logout</span>}
                            </button>
                        </div>
                    </aside>

                    {/* Mobile Header */}
                    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                            <Icons.Menu className="w-6 h-6" />
                        </button>
                        <div className="font-bold text-lg text-indigo-900">AI Learning Assistant</div>
                        <button onClick={() => onNavigate('notifications')} className="p-2 hover:bg-gray-100 rounded-lg relative">
                            <Icons.Bell className="w-6 h-6" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unreadCount}</span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
                            <div className="w-72 h-full bg-white p-4 slide-in" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="font-bold text-xl text-indigo-900">Menu</div>
                                    <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                                        <Icons.X className="w-6 h-6" />
                                    </button>
                                </div>
                                <nav className="space-y-1">
                                    {navItems.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto lg:pt-0 pt-16">
                        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            );
        };

// STUDENT DASHBOARD
const StudentDashboard = ({ onNavigate }) => {
            const { studentProfile, selectedExam, generateStudyPlan, studyPlan } = useApp();
            const [greeting, setGreeting] = useState('');

            useEffect(() => {
                const hour = new Date().getHours();
                if (hour < 12) setGreeting('Good morning');
                else if (hour < 17) setGreeting('Good afternoon');
                else setGreeting('Good evening');
            }, []);

            const stats = [
                { label: 'Overall Progress', value: `${studentProfile?.overallProgress || 0}%`, icon: Icons.Target, color: 'indigo', trend: '+5% this week' },
                { label: 'Questions Solved', value: studentProfile?.questionsSolved || 0, icon: Icons.PenTool, color: 'green', trend: '+23 today' },
                { label: 'Average Score', value: `${studentProfile?.averageScore || 0}%`, icon: Icons.BarChart, color: 'amber', trend: '+2% improvement' },
                { label: 'Mock Tests', value: studentProfile?.mockTestsCompleted || 0, icon: Icons.Trophy, color: 'purple', trend: '2 this week' },
            ];

            const examSubjects = selectedExam && MOCK_DATA.subjects[selectedExam] ? MOCK_DATA.subjects[selectedExam].map(s => s.name) : ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];

            const weakAreas = [
                { subject: examSubjects[0] || 'Subject 1', accuracy: 52, color: 'red' },
                { subject: examSubjects[1] || 'Subject 2', accuracy: 61, color: 'amber' },
            ];

            const strongAreas = [
                { subject: examSubjects[2] || 'Subject 3', accuracy: 87, color: 'green' },
                { subject: examSubjects[3] || 'Subject 4', accuracy: 84, color: 'green' },
            ];

            const todayPlan = studyPlan?.items?.[0] || {
                items: [
                    { subject: examSubjects[0] || 'Subject 1', topic: 'Chapter 1 Concepts', activity: 'Study concepts', duration: 45, completed: false },
                    { subject: examSubjects[1] || 'Subject 2', topic: 'Chapter 2 Practice', activity: 'Practice questions', duration: 30, completed: false },
                    { subject: examSubjects[2] || 'Subject 3', topic: 'Chapter 3 Video', activity: 'Watch video lecture', duration: 30, completed: false },
                    { subject: examSubjects[3] || 'Subject 4', topic: 'Chapter 4 Problems', activity: 'Solve problems', duration: 45, completed: false },
                ]
            };

            return (
                <div className="space-y-6 fade-in">
                    {/* Welcome */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{greeting}, {studentProfile?.name || 'Student'} 👋</h1>
                            <p className="text-gray-600 mt-1">
                                {selectedExam ? `Preparing for ${getExamName(selectedExam)}` : 'Select an exam to start preparing'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="accent" onClick={() => onNavigate('ai-tutor')}>
                                <Icons.MessageSquare className="w-5 h-5" /> Ask AI Tutor
                            </Button>
                            {!studyPlan && (
                                <Button variant="outline" onClick={generateStudyPlan}>
                                    <Icons.Calendar className="w-5 h-5" /> Generate Plan
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <Card key={idx} className="border-0 shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-green-600 mt-1 font-medium">{stat.trend}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Today's Plan */}
                        <div className="lg:col-span-2">
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Today's Study Plan</h2>
                                    <Button variant="ghost" size="sm" onClick={() => onNavigate('study-plan')}>
                                        View All <Icons.ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {todayPlan.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                                {item.completed ? <Icons.Check className="w-5 h-5" /> : <Icons.BookOpen className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900">{item.subject} — {item.topic}</div>
                                                <div className="text-sm text-gray-500">{item.activity}</div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Icons.Clock className="w-4 h-4" />
                                                {item.duration} min
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Performance */}
                        <div className="space-y-6">
                            {/* Weak Areas */}
                            <Card>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Icons.AlertCircle className="w-4 h-4 text-red-500" /> Weak Areas
                                </h3>
                                <div className="space-y-3">
                                    {weakAreas.map((area, idx) => (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-700">{area.subject}</span>
                                                <span className="text-sm font-medium text-red-600">{area.accuracy}%</span>
                                            </div>
                                            <ProgressBar value={area.accuracy} max={100} color={area.color} size="sm" showLabel={false} />
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="w-full mt-4" onClick={() => onNavigate('practice')}>
                                    Practice Weak Areas
                                </Button>
                            </Card>

                            {/* Strong Areas */}
                            <Card>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Icons.CheckCircle className="w-4 h-4 text-green-500" /> Strong Areas
                                </h3>
                                <div className="space-y-3">
                                    {strongAreas.map((area, idx) => (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-700">{area.subject}</span>
                                                <span className="text-sm font-medium text-green-600">{area.accuracy}%</span>
                                            </div>
                                            <ProgressBar value={area.accuracy} max={100} color="green" size="sm" showLabel={false} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Take Quiz', desc: 'Generate a quick quiz', icon: Icons.Zap, action: () => onNavigate('practice'), color: 'bg-amber-50 text-amber-700' },
                            { title: 'Mock Test', desc: 'Full-length simulation', icon: Icons.Trophy, action: () => onNavigate('mock-tests'), color: 'bg-purple-50 text-purple-700' },
                            { title: 'PYQs', desc: 'Previous year papers', icon: Icons.FileText, action: () => onNavigate('pyqs'), color: 'bg-blue-50 text-blue-700' },
                            { title: 'AI Mentor', desc: 'Get personalized advice', icon: Icons.Brain, action: () => onNavigate('ai-tutor'), color: 'bg-indigo-50 text-indigo-700' },
                        ].map((action, idx) => (
                            <button key={idx} onClick={action.action} className="text-left">
                                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all">
                                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
                                </Card>
                            </button>
                        ))}
                    </div>
                </div>
            );
        };

// EXAM INFO PAGE
const ExamInfoPage = ({ onNavigate }) => {
            const { selectedExam } = useApp();
            const exam = MOCK_DATA.exams.find(e => e.slug === selectedExam);
            const [activeTab, setActiveTab] = useState('about');

            if (!exam) {
                return (
                    <div className="text-center py-20">
                        <Icons.AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Exam Selected</h2>
                        <p className="text-gray-600 mb-4">Please select an exam from the onboarding or dashboard.</p>
                        <Button onClick={() => onNavigate('onboarding')}>Select Exam</Button>
                    </div>
                );
            }

            const tabs = [
                { id: 'about', label: 'About', icon: Icons.Info },
                { id: 'eligibility', label: 'Eligibility', icon: Icons.CheckCircle },
                { id: 'pattern', label: 'Pattern', icon: Icons.List },
                { id: 'syllabus', label: 'Syllabus', icon: Icons.Book },
                { id: 'marking', label: 'Marking', icon: Icons.PieChart },
                { id: 'dates', label: 'Dates', icon: Icons.Calendar },
                { id: 'strategy', label: 'Strategy', icon: Icons.Target },
                { id: 'careers', label: 'Careers', icon: Icons.Briefcase },
            ];

            const tabContent = {
                about: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.about}</p></div>,
                eligibility: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.eligibility}</p></div>,
                pattern: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.pattern}</p></div>,
                syllabus: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.syllabus}</p></div>,
                marking: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.marking}</p></div>,
                dates: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.dates}</p></div>,
                strategy: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.strategy}</p></div>,
                careers: <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{exam.careers}</p></div>,
            };

            const subjects = MOCK_DATA.subjects[exam.slug] || [];

            return (
                <div className="space-y-6 fade-in">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${exam.color} rounded-2xl p-8 text-white`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                {React.createElement(Icons[exam.icon] || Icons.BookOpen, { className: 'w-8 h-8' })}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{exam.name}</h1>
                                <p className="text-white/80">{exam.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge className="bg-white/20 text-white border-0">{exam.category}</Badge>
                            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => onNavigate('courses')}>
                                <Icons.BookOpen className="w-4 h-4" /> View Courses
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => onNavigate('ai-tutor')}>
                                <Icons.MessageSquare className="w-4 h-4" /> Ask AI
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Card>
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="fade-in">
                            {tabContent[activeTab]}
                        </div>
                    </Card>

                    {/* Subjects */}
                    {subjects.length > 0 && (
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Subjects</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {subjects.map(sub => (
                                    <div key={sub.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => onNavigate('courses')}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                                            <Icons.ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {sub.topics.slice(0, 4).map(topic => (
                                                <span key={topic} className="text-xs bg-white px-2 py-1 rounded-md text-gray-600">{topic}</span>
                                            ))}
                                            {sub.topics.length > 4 && (
                                                <span className="text-xs bg-white px-2 py-1 rounded-md text-gray-500">+{sub.topics.length - 4} more</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            );
        };

// AI TUTOR
const AITutorPage = () => {
            const { selectedExam, chatSessions, addChatSession, currentChat, setCurrentChat, studentProfile, apiKeys } = useApp();
            const [messages, setMessages] = useState([]);
            const [input, setInput] = useState('');
            const [loading, setLoading] = useState(false);
            const [sidebarVisible, setSidebarVisible] = useState(true);
            const messagesEndRef = useRef(null);

            const examContext = selectedExam ? getExamName(selectedExam) : 'General';

            const suggestedPrompts = [
                `Explain a key concept for ${examContext}`,
                `Give me ${examContext} level questions`,
                `Create a study plan for ${examContext}`,
                `Analyze my weak areas`,
                `Previous year questions on important topics`,
                `What should I study today?`
            ];

            const scrollToBottom = () => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            };

            useEffect(() => {
                scrollToBottom();
            }, [messages]);

            const simulateAIResponse = async (query) => {
                if (apiKeys?.groq) {
                    try {
                        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${apiKeys.groq}`
                            },
                            body: JSON.stringify({
                                model: 'llama3-8b-8192',
                                messages: [{ role: 'system', content: `You are an AI Tutor helping a student prepare for the ${examContext} exam.` }, { role: 'user', content: query }]
                            })
                        });
                        const data = await response.json();
                        if (data.error) return `Groq API Error: ${data.error.message || JSON.stringify(data.error)}`;
                        if (data.choices && data.choices.length > 0) {
                            return data.choices[0].message.content;
                        }
                    } catch (e) {
                        console.error("Groq API Error", e);
                        return `Error connecting to Groq API: ${e.message}`;
                    }
                }

                if (apiKeys?.gemini) {
                    try {
                        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                systemInstruction: {
                                    parts: [{ text: `You are an AI Tutor helping a student prepare for the ${examContext} exam. Format your output in beautiful Markdown.` }]
                                },
                                contents: [{ parts: [{ text: query }] }]
                            })
                        });
                        const data = await response.json();
                        if (data.error) return `Gemini API Error: ${data.error.message || JSON.stringify(data.error)}`;
                        if (data.candidates && data.candidates.length > 0) {
                            return data.candidates[0].content.parts[0].text;
                        }
                    } catch (e) {
                        console.error("Gemini API Error", e);
                        return `Error connecting to Gemini API: ${e.message}`;
                    }
                }

                // Fallback to simulated response if no API keys are provided
                await delay(1500);
                const responses = {
                    'explain': `## ${examContext} Concept Explanation

Based on your study materials and ${examContext} syllabus, here's a detailed explanation:

**Key Points:**
1. This concept is fundamental to ${examContext} preparation
2. It appears frequently in previous year papers
3. Understanding this will help solve related problems

**Detailed Explanation:**
The concept involves understanding core principles that are tested in the exam. Let me break it down step by step with examples relevant to ${examContext}.

**Example:**
Consider a typical ${examContext} problem where this concept applies...

**Sources:**
- ${examContext} Study Material - Chapter 4
- Previous Year Questions - 2023, 2022

Would you like me to:
1. Give you practice questions on this?
2. Explain it more simply?
3. Show how it appeared in previous papers?`,

                    'quiz': `## Quick Quiz on ${examContext}

I've generated 5 questions based on your current level and ${examContext} pattern:

**Q1.** What is the primary purpose of normalization in DBMS?
a) To reduce data redundancy
b) To increase query speed
c) To secure data
d) To compress data

**Q2.** In operating systems, which scheduling algorithm minimizes average waiting time?
a) FCFS
b) SJF
c) Round Robin
d) Priority

**Q3-5.** [Additional questions tailored to your weak areas]

Take your time! Reply with your answers and I'll explain each one.`,

                    'plan': `## Personalized ${examContext} Study Plan

Based on your profile:
- **Preparation Level:** ${studentProfile?.preparationLevel || 'Beginner'}
- **Daily Time:** ${(studentProfile?.dailyStudyTime || 120) / 60} hours
- **Weak Areas:** ${studentProfile?.weakSubjects?.join(', ') || 'To be determined'}

### Week 1 Plan:

| Day | Subject | Topic | Duration | Activity |
|-----|---------|-------|----------|----------|
| Mon | DBMS | Normalization | 45 min | Concepts + Practice |
| Tue | OS | Process Scheduling | 45 min | Concepts + PYQs |
| Wed | CN | TCP/IP Model | 30 min | Video + Notes |
| Thu | DS | Trees | 45 min | Problem Solving |
| Fri | Algorithms | Sorting | 45 min | Practice |
| Sat | Mixed | Revision | 60 min | Weak area focus |
| Sun | Mock Test | Full Test | 180 min | Timed test |

**AI Recommendations:**
1. Focus more on ${studentProfile?.weakSubjects?.[0] || 'DBMS'} - your accuracy is below target
2. Maintain your streak! You've studied 5 days in a row.
3. Try to increase daily study time by 15 minutes next week.

Shall I adjust this plan or explain any topic in detail?`,

                    'default': `## ${examContext} Assistant Response

Thank you for your question! Based on the verified study materials and ${examContext} exam patterns, here's what I found:

**Answer:**
The information you're looking for is covered in the official syllabus and previous year analysis. Let me provide a comprehensive response tailored to ${examContext} level.

**Key Points:**
- Point 1 relevant to ${examContext}
- Point 2 with exam-specific context
- Point 3 based on previous year trends

**Sources Referenced:**
- ${examContext} Complete Study Material
- Previous Year Questions (2020-2024)
- Official Syllabus Document

Is there a specific aspect you'd like me to elaborate on, or would you like practice questions on this topic?`
                };

                const lowerQuery = query.toLowerCase();
                if (lowerQuery.includes('explain') || lowerQuery.includes('what is') || lowerQuery.includes('how')) return responses.explain;
                if (lowerQuery.includes('quiz') || lowerQuery.includes('question') || lowerQuery.includes('test me')) return responses.quiz;
                if (lowerQuery.includes('plan') || lowerQuery.includes('schedule') || lowerQuery.includes('study')) return responses.plan;
                return responses.default;
            };

            const handleSend = async () => {
                if (!input.trim() || loading) return;

                const userMessage = { id: generateId(), role: 'user', content: input, timestamp: new Date().toISOString() };
                setMessages(prev => [...prev, userMessage]);
                setInput('');
                setLoading(true);

                const aiContent = await simulateAIResponse(userMessage.content);
                const aiMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: aiContent,
                    timestamp: new Date().toISOString(),
                    sources: [
                        { material: `${examContext} Study Material`, subject: 'General', topic: 'Multiple' },
                        { material: 'Previous Year Questions', subject: 'General', topic: '2020-2024' }
                    ]
                };

                setMessages(prev => [...prev, aiMessage]);
                setLoading(false);
            };

            const startNewChat = () => {
                setMessages([]);
                setCurrentChat(null);
            };

            const loadChat = (session) => {
                setCurrentChat(session);
                setMessages([
                    { id: '1', role: 'user', content: 'Previous conversation...', timestamp: session.date },
                    { id: '2', role: 'assistant', content: 'This is a demo of chat history loading.', timestamp: session.date }
                ]);
            };

            return (
                <div className="h-[calc(100vh-6rem)] flex gap-4 fade-in">
                    {/* Chat Sidebar */}
                    {sidebarVisible && (
                        <div className="w-64 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden hidden lg:flex">
                            <div className="p-4 border-b border-gray-100">
                                <Button variant="accent" className="w-full" onClick={startNewChat}>
                                    <Icons.Plus className="w-4 h-4" /> New Chat
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                {chatSessions.map(session => (
                                    <button
                                        key={session.id}
                                        onClick={() => loadChat(session)}
                                        className={`w-full text-left p-3 rounded-xl text-sm transition-all ${currentChat?.id === session.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}
                                    >
                                        <div className="font-medium truncate">{session.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">{formatDate(session.date)} • {session.messages} messages</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Chat Area */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSidebarVisible(!sidebarVisible)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                                    <Icons.Menu className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <Icons.Brain className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">AI Tutor</h2>
                                    <p className="text-xs text-gray-500">{examContext} Mode • Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={startNewChat} title="New Chat">
                                    <Icons.Plus className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Settings">
                                    <Icons.Settings className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
                                        <Icons.Brain className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
                                    <p className="text-gray-500 mb-8 max-w-md">Ask me anything about {examContext} preparation. I can explain concepts, generate quizzes, create study plans, and more.</p>
                                    <div className="grid sm:grid-cols-2 gap-3 max-w-lg w-full">
                                        {suggestedPrompts.slice(0, 4).map((prompt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setInput(prompt); }}
                                                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-left text-sm text-gray-700 transition-all border border-gray-200"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                messages.map(msg => (
                                    <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100' : 'bg-gradient-to-br from-indigo-500 to-purple-500'}`}>
                                            {msg.role === 'user' ? <Icons.User className="w-4 h-4 text-indigo-600" /> : <Icons.Brain className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                            <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                                {msg.content.split('\n').map((line, i) => {
                                                    if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('## ', '')}</h3>;
                                                    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold mt-2">{line.replace(/\*\*/g, '')}</p>;
                                                    if (line.startsWith('- ')) return <li key={i} className="ml-4 mt-1">{line.replace('- ', '')}</li>;
                                                    if (line.startsWith('|')) return null; // Skip table rows for simplicity
                                                    if (line.trim() === '') return <br key={i} />;
                                                    return <p key={i} className="mt-1">{line}</p>;
                                                })}
                                            </div>
                                            {msg.sources && (
                                                <div className={`mt-3 pt-3 border-t ${msg.role === 'user' ? 'border-indigo-500' : 'border-gray-200'}`}>
                                                    <p className="text-xs font-medium mb-1 opacity-70">Sources:</p>
                                                    {msg.sources.map((src, i) => (
                                                        <div key={i} className="text-xs opacity-60 flex items-center gap-1">
                                                            <Icons.FileText className="w-3 h-3" />
                                                            {src.material} — {src.topic}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {msg.role === 'assistant' && (
                                                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                                                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Copy">
                                                        <Icons.Copy className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Regenerate">
                                                        <Icons.RefreshCw className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Helpful">
                                                        <Icons.ThumbsUp className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Not helpful">
                                                        <Icons.ThumbsDown className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                </div>
                                            )}
                                            <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {loading && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <Icons.Brain className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-gray-100 rounded-2xl px-5 py-4">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '0s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100">
                            <div className="flex items-end gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                                <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors" title="Attach file">
                                    <Icons.Upload className="w-5 h-5 text-gray-500" />
                                </button>
                                <textarea
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                    placeholder={`Ask about ${examContext}...`}
                                    rows={1}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-2.5 text-sm max-h-32"
                                    style={{ minHeight: '40px' }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || loading}
                                    className={`p-2.5 rounded-xl transition-all ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400'}`}
                                >
                                    <Icons.Send className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-2">AI responses are based on verified study materials. Always cross-check with official sources.</p>
                        </div>
                    </div>
                </div>
            );
        };

// PRACTICE / QUIZ
const PracticePage = ({ onNavigate }) => {
            const { selectedExam, submitQuizAttempt, questions } = useApp();
            const [activeQuiz, setActiveQuiz] = useState(null);
            const [quizConfig, setQuizConfig] = useState({ subject: '', topic: '', difficulty: 'MEDIUM', numQuestions: 10 });
            const [currentQuestion, setCurrentQuestion] = useState(0);
            const [answers, setAnswers] = useState({});
            const [quizComplete, setQuizComplete] = useState(false);
            const [timeLeft, setTimeLeft] = useState(0);

            const examQuestions = questions.filter(q => !selectedExam || q.exam === getExamName(selectedExam));
            const subjects = [...new Set(examQuestions.map(q => q.subject))];

            const filteredQuestions = examQuestions.filter(q => {
                if (quizConfig.subject && q.subject !== quizConfig.subject) return false;
                if (quizConfig.difficulty && q.difficulty !== quizConfig.difficulty) return false;
                return true;
            }).slice(0, quizConfig.numQuestions);

            const startQuiz = () => {
                if (filteredQuestions.length === 0) return;
                setActiveQuiz(filteredQuestions);
                setCurrentQuestion(0);
                setAnswers({});
                setQuizComplete(false);
                setTimeLeft(filteredQuestions.length * 90);
            };

            const startAIGeneratedQuiz = async () => {
                const aiQuestions = Array.from({ length: 100 }).map((_, i) => ({
                    id: `ai_q_${i}`,
                    exam: selectedExam ? getExamName(selectedExam) : 'General',
                    subject: 'Generated Material',
                    topic: `Topic ${Math.floor(i/10) + 1}`,
                    difficulty: 'MEDIUM',
                    question: `[AI Generated Q${i+1}] Based on the uploaded materials, what is the significance of this concept?`,
                    options: [
                        `First option for Q${i+1}`,
                        `Second option for Q${i+1}`,
                        `Third option for Q${i+1}`,
                        `Fourth option for Q${i+1}`
                    ],
                    correct: Math.floor(Math.random() * 4),
                    marks: 2,
                    negative: 0.5,
                    solution: 'This is an AI generated explanation from the materials.'
                }));
                setActiveQuiz(aiQuestions);
                setCurrentQuestion(0);
                setAnswers({});
                setQuizComplete(false);
                setTimeLeft(100 * 90);
            };

            useEffect(() => {
                if (activeQuiz && timeLeft > 0 && !quizComplete) {
                    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
                    return () => clearInterval(timer);
                } else if (timeLeft === 0 && activeQuiz) {
                    submitQuiz();
                }
            }, [activeQuiz, timeLeft, quizComplete]);

            const selectAnswer = (optionIndex) => {
                setAnswers({ ...answers, [currentQuestion]: optionIndex });
            };

            const nextQuestion = () => {
                if (currentQuestion < activeQuiz.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    submitQuiz();
                }
            };

            const submitQuiz = () => {
                let score = 0;
                const answerArray = activeQuiz.map((q, idx) => {
                    const isCorrect = answers[idx] === q.correct;
                    if (isCorrect) score += q.marks;
                    else score -= (q.negative || 0);
                    return {
                        questionId: q.id,
                        answer: answers[idx],
                        isCorrect,
                        timeTaken: 60
                    };
                });

                const accuracy = Math.round((answerArray.filter(a => a.isCorrect).length / activeQuiz.length) * 100);
                const weakTopics = [];
                const strongTopics = [];

                activeQuiz.forEach((q, idx) => {
                    if (answers[idx] !== q.correct) weakTopics.push(q.topic);
                    else strongTopics.push(q.topic);
                });

                submitQuizAttempt('generated', {
                    score: Math.max(0, score),
                    accuracy,
                    timeTaken: activeQuiz.length * 90 - timeLeft,
                    answers: answerArray,
                    weakTopics: [...new Set(weakTopics)],
                    strongTopics: [...new Set(strongTopics)]
                });

                setQuizComplete(true);
            };

            const formatTime = (seconds) => {
                const m = Math.floor(seconds / 60);
                const s = seconds % 60;
                return `${m}:${s.toString().padStart(2, '0')}`;
            };

            if (quizComplete) {
                const correct = Object.entries(answers).filter(([idx, ans]) => ans === activeQuiz[parseInt(idx)].correct).length;
                const total = activeQuiz.length;
                const score = Math.round((correct / total) * 100);

                return (
                    <div className="max-w-2xl mx-auto fade-in">
                        <Card className="text-center py-12">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${score >= 70 ? 'bg-green-100' : score >= 40 ? 'bg-amber-100' : 'bg-red-100'}`}>
                                <Icons.Trophy className={`w-12 h-12 ${score >= 70 ? 'text-green-600' : score >= 40 ? 'text-amber-600' : 'text-red-600'}`} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                            <p className="text-gray-600 mb-8">Here's how you performed</p>

                            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="text-2xl font-bold text-gray-900">{correct}/{total}</div>
                                    <div className="text-xs text-gray-500">Correct</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="text-2xl font-bold text-gray-900">{score}%</div>
                                    <div className="text-xs text-gray-500">Accuracy</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="text-2xl font-bold text-gray-900">{formatTime(activeQuiz.length * 90 - timeLeft)}</div>
                                    <div className="text-xs text-gray-500">Time Taken</div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 text-left max-w-lg mx-auto">
                                {activeQuiz.map((q, idx) => (
                                    <div key={q.id} className={`p-4 rounded-xl ${answers[idx] === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className="flex items-start gap-3">
                                            {answers[idx] === q.correct ? <Icons.CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> : <Icons.XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{q.question}</p>
                                                <p className="text-xs text-gray-500 mt-1">Your answer: {answers[idx] !== undefined ? q.options[answers[idx]] : 'Not answered'} | Correct: {q.options[q.correct]}</p>
                                                <p className="text-xs text-gray-600 mt-2">{q.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-center">
                                <Button onClick={() => { setActiveQuiz(null); setQuizComplete(false); }}>New Quiz</Button>
                                <Button variant="outline" onClick={() => onNavigate('student-dashboard')}>Dashboard</Button>
                            </div>
                        </Card>
                    </div>
                );
            }

            if (activeQuiz) {
                const q = activeQuiz[currentQuestion];
                const progress = ((currentQuestion + 1) / activeQuiz.length) * 100;

                return (
                    <div className="max-w-3xl mx-auto fade-in">
                        <Card>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <Badge variant="primary">Question {currentQuestion + 1} of {activeQuiz.length}</Badge>
                                    <span className="ml-2 text-sm text-gray-500">{q.subject} • {q.topic}</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm font-medium ${timeLeft < 30 ? 'text-red-600' : 'text-gray-600'}`}>
                                    <Icons.Clock className="w-4 h-4" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                                <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>

                            {/* Question */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant={q.difficulty === 'EASY' ? 'success' : q.difficulty === 'MEDIUM' ? 'warning' : 'danger'}>{q.difficulty}</Badge>
                                    <span className="text-sm text-gray-500">+{q.marks} marks</span>
                                    {q.negative > 0 && <span className="text-sm text-red-500">-{q.negative} negative</span>}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{q.question}</h3>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-8">
                                {q.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => selectAnswer(idx)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${answers[currentQuestion] === idx ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${answers[currentQuestion] === idx ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="text-gray-800">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    <Icons.ArrowLeft className="w-4 h-4" /> Previous
                                </Button>
                                <Button onClick={nextQuestion}>
                                    {currentQuestion === activeQuiz.length - 1 ? 'Submit' : 'Next'} <Icons.ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                );
            }

            return (
                <div className="max-w-2xl mx-auto fade-in">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Generate Quiz</h1>
                    <p className="text-gray-600 mb-8">Customize your practice session</p>

                    <Card className="space-y-6">
                        <Select
                            label="Subject"
                            value={quizConfig.subject}
                            onChange={e => setQuizConfig({ ...quizConfig, subject: e.target.value })}
                            options={[{ value: '', label: 'All Subjects' }, ...subjects.map(s => ({ value: s, label: s }))]}
                        />
                        <Select
                            label="Difficulty"
                            value={quizConfig.difficulty}
                            onChange={e => setQuizConfig({ ...quizConfig, difficulty: e.target.value })}
                            options={[
                                { value: 'EASY', label: 'Easy' },
                                { value: 'MEDIUM', label: 'Medium' },
                                { value: 'HARD', label: 'Hard' }
                            ]}
                        />
                        <Select
                            label="Number of Questions"
                            value={quizConfig.numQuestions}
                            onChange={e => setQuizConfig({ ...quizConfig, numQuestions: parseInt(e.target.value) })}
                            options={[5, 10, 15, 20, 25].map(n => ({ value: n, label: `${n} Questions` }))}
                        />

                        <div className="bg-indigo-50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <Icons.Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                <div className="text-sm text-indigo-800">
                                    <strong>{filteredQuestions.length}</strong> questions available matching your criteria
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button className="w-full" onClick={startQuiz} disabled={filteredQuestions.length === 0}>
                                <Icons.Play className="w-5 h-5" /> Start Standard Quiz
                            </Button>
                            
                            <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={startAIGeneratedQuiz}>
                                <Icons.Cpu className="w-5 h-5" /> AI Generate 100 MCQ from Materials
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        };

// PYQs
const PYQsPage = () => {
            const { selectedExam, questions } = useApp();
            const [filter, setFilter] = useState({ year: '', subject: '', topic: '' });
            const [activeQuestion, setActiveQuestion] = useState(null);

            const examQuestions = questions.filter(q => {
                if (!selectedExam || q.exam === getExamName(selectedExam)) return true;
                return false;
            });

            const years = [...new Set(examQuestions.filter(q => q.year).map(q => q.year))].sort((a, b) => b - a);
            const subjects = [...new Set(examQuestions.map(q => q.subject))];

            const filtered = examQuestions.filter(q => {
                if (filter.year && q.year !== parseInt(filter.year)) return false;
                if (filter.subject && q.subject !== filter.subject) return false;
                return true;
            });

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Previous Year Questions</h1>
                            <p className="text-gray-600">Practice questions from actual exams</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card className="flex flex-wrap gap-4">
                        <Select
                            value={filter.year}
                            onChange={e => setFilter({ ...filter, year: e.target.value })}
                            options={[{ value: '', label: 'All Years' }, ...years.map(y => ({ value: String(y), label: String(y) }))]}
                            className="w-40"
                        />
                        <Select
                            value={filter.subject}
                            onChange={e => setFilter({ ...filter, subject: e.target.value })}
                            options={[{ value: '', label: 'All Subjects' }, ...subjects.map(s => ({ value: s, label: s }))]}
                            className="w-48"
                        />
                        <Button variant="ghost" onClick={() => setFilter({ year: '', subject: '', topic: '' })}>
                            <Icons.RefreshCw className="w-4 h-4" /> Reset
                        </Button>
                    </Card>

                    {/* Questions List */}
                    <div className="space-y-4">
                        {filtered.map((q, idx) => (
                            <Card key={q.id} className="border-0 shadow-md">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="primary">{q.exam}</Badge>
                                            <Badge variant="warning">{q.year || 'General'}</Badge>
                                            <Badge variant={q.difficulty === 'EASY' ? 'success' : q.difficulty === 'MEDIUM' ? 'warning' : 'danger'}>{q.difficulty}</Badge>
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-3">{idx + 1}. {q.question}</h3>
                                        {activeQuestion === q.id && (
                                            <div className="space-y-2 mb-4">
                                                {q.options.map((opt, i) => (
                                                    <div key={i} className={`p-3 rounded-lg text-sm ${i === q.correct ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-gray-50 text-gray-700'}`}>
                                                        {String.fromCharCode(65 + i)}. {opt}
                                                        {i === q.correct && <span className="ml-2 text-green-600 font-medium">✓ Correct</span>}
                                                    </div>
                                                ))}
                                                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                                                    <strong>Explanation:</strong> {q.explanation}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <Button size="sm" variant={activeQuestion === q.id ? 'secondary' : 'outline'} onClick={() => setActiveQuestion(activeQuestion === q.id ? null : q.id)}>
                                        {activeQuestion === q.id ? 'Hide Answer' : 'Show Answer'}
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <Icons.Bookmark className="w-4 h-4" /> Save
                                    </Button>
                                    <span className="text-sm text-gray-500 ml-auto">{q.subject} • {q.topic}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            );
        };

// MOCK TESTS
const MockTestsPage = ({ onNavigate }) => {
            const { selectedExam, submitMockTest, questions } = useApp();
            const [activeTest, setActiveTest] = useState(null);
            const [currentQ, setCurrentQ] = useState(0);
            const [answers, setAnswers] = useState({});
            const [marked, setMarked] = useState({});
            const [timeLeft, setTimeLeft] = useState(0);
            const [testComplete, setTestComplete] = useState(false);
            const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

            const tests = MOCK_DATA.mockTests.filter(t => !selectedExam || t.exam === getExamName(selectedExam));

            const startTest = (test) => {
                setActiveTest(test);
                setCurrentQ(0);
                setAnswers({});
                setMarked({});
                setTimeLeft(test.duration * 60);
                setTestComplete(false);
            };

            useEffect(() => {
                if (activeTest && timeLeft > 0 && !testComplete) {
                    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
                    return () => clearInterval(timer);
                } else if (timeLeft === 0 && activeTest) {
                    finishTest();
                }
            }, [activeTest, timeLeft, testComplete]);

            const formatTime = (seconds) => {
                const h = Math.floor(seconds / 3600);
                const m = Math.floor((seconds % 3600) / 60);
                const s = seconds % 60;
                return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            };

            const finishTest = () => {
                const testQuestions = questions.slice(0, activeTest.questions);
                let score = 0;
                const subjectScores = {};
                const topicScores = {};

                testQuestions.forEach((q, idx) => {
                    const isCorrect = answers[idx] === q.correct;
                    const marks = isCorrect ? q.marks : -(q.negative || 0);
                    score += marks;

                    subjectScores[q.subject] = (subjectScores[q.subject] || 0) + marks;
                    topicScores[q.topic] = (topicScores[q.topic] || 0) + marks;
                });

                submitMockTest(activeTest.id, {
                    score: Math.max(0, score),
                    accuracy: Math.round((Object.entries(answers).filter(([i, a]) => a === testQuestions[parseInt(i)].correct).length / testQuestions.length) * 100),
                    timeTaken: activeTest.duration * 60 - timeLeft,
                    answers: Object.entries(answers).map(([i, a]) => ({
                        questionId: testQuestions[parseInt(i)].id,
                        answer: a,
                        isCorrect: a === testQuestions[parseInt(i)].correct
                    })),
                    subjectScores,
                    topicScores,
                    weakAreas: Object.entries(topicScores).filter(([k, v]) => v < 0).map(([k]) => k),
                    strongAreas: Object.entries(topicScores).filter(([k, v]) => v > 0).map(([k]) => k)
                });

                setTestComplete(true);
                setShowSubmitConfirm(false);
            };

            if (testComplete) {
                return (
                    <div className="max-w-2xl mx-auto fade-in">
                        <Card className="text-center py-12">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
                                <Icons.Trophy className="w-12 h-12 text-indigo-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Submitted!</h2>
                            <p className="text-gray-600 mb-8">Your performance has been analyzed</p>
                            <Button onClick={() => { setActiveTest(null); setTestComplete(false); }}>Back to Tests</Button>
                        </Card>
                    </div>
                );
            }

            if (activeTest) {
                const testQuestions = questions.slice(0, activeTest.questions);
                const q = testQuestions[currentQ];
                const answeredCount = Object.keys(answers).length;
                const markedCount = Object.keys(marked).length;

                return (
                    <div className="h-[calc(100vh-6rem)] flex flex-col fade-in">
                        {/* Header */}
                        <Card className="mb-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h2 className="font-bold text-gray-900">{activeTest.title}</h2>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                        <Icons.Clock className="w-4 h-4" />
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">Answered: {answeredCount}/{testQuestions.length}</span>
                                    <Button size="sm" variant="danger" onClick={() => setShowSubmitConfirm(true)}>Submit Test</Button>
                                </div>
                            </div>
                        </Card>

                        <div className="flex-1 flex gap-4 overflow-hidden">
                            {/* Question Panel */}
                            <div className="flex-1 overflow-y-auto">
                                <Card>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Badge variant="primary">Q{currentQ + 1}</Badge>
                                        <Badge variant="warning">{q.subject}</Badge>
                                        <span className="text-sm text-gray-500">+{q.marks} marks</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">{q.question}</h3>
                                    <div className="space-y-3">
                                        {q.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setAnswers({ ...answers, [currentQ]: idx })}
                                                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${answers[currentQ] === idx ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${answers[currentQ] === idx ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span>{opt}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-8">
                                        <Button variant="ghost" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
                                            <Icons.ArrowLeft className="w-4 h-4" /> Previous
                                        </Button>
                                        <Button
                                            variant={marked[currentQ] ? 'secondary' : 'ghost'}
                                            onClick={() => setMarked({ ...marked, [currentQ]: !marked[currentQ] })}
                                        >
                                            <Icons.Bookmark className="w-4 h-4" /> {marked[currentQ] ? 'Unmark' : 'Mark for Review'}
                                        </Button>
                                        <Button onClick={() => setCurrentQ(Math.min(testQuestions.length - 1, currentQ + 1))} disabled={currentQ === testQuestions.length - 1}>
                                            Next <Icons.ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Question Palette */}
                            <div className="w-64 bg-white rounded-2xl border border-gray-200 p-4 hidden lg:block overflow-y-auto">
                                <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {testQuestions.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentQ(idx)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentQ === idx ? 'ring-2 ring-indigo-600 ring-offset-2' : ''} ${answers[idx] !== undefined ? 'bg-green-100 text-green-700' : marked[idx] ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-6 space-y-2 text-sm">
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-100" /> <span>Answered</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-amber-100" /> <span>Marked</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-gray-100" /> <span>Not visited</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Confirmation */}
                        {showSubmitConfirm && (
                            <Modal isOpen={showSubmitConfirm} onClose={() => setShowSubmitConfirm(false)} title="Submit Test?" size="sm">
                                <p className="text-gray-600 mb-6">You have answered {answeredCount} out of {testQuestions.length} questions. Are you sure you want to submit?</p>
                                <div className="flex gap-3 justify-end">
                                    <Button variant="ghost" onClick={() => setShowSubmitConfirm(false)}>Continue Test</Button>
                                    <Button variant="danger" onClick={finishTest}>Submit Now</Button>
                                </div>
                            </Modal>
                        )}
                    </div>
                );
            }

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">Mock Tests</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.map(test => (
                            <Card key={test.id} className="border-0 shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="primary">{test.exam}</Badge>
                                    <span className="text-sm text-gray-500">{test.questions} Qs</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h3>
                                <div className="space-y-2 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center gap-2"><Icons.Clock className="w-4 h-4" /> {test.duration} minutes</div>
                                    <div className="flex items-center gap-2"><Icons.Target className="w-4 h-4" /> {test.totalMarks} marks</div>
                                    <div className="flex items-center gap-2"><Icons.AlertCircle className="w-4 h-4" /> -{test.negative} negative marking</div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {test.subjects.slice(0, 4).map(s => (
                                        <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">{s}</span>
                                    ))}
                                </div>
                                <Button className="w-full" onClick={() => startTest(test)}>
                                    <Icons.Play className="w-4 h-4" /> Start Test
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            );
        };

// STUDY PLAN
const StudyPlanPage = () => {
            const { studyPlan, generateStudyPlan, studentProfile } = useApp();
            const [activeDay, setActiveDay] = useState(0);

            if (!studyPlan) {
                return (
                    <div className="text-center py-20 fade-in">
                        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                            <Icons.Calendar className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Study Plan Yet</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">Generate a personalized AI study plan based on your exam, preparation level, and available time.</p>
                        <Button onClick={generateStudyPlan}>
                            <Icons.Zap className="w-5 h-5" /> Generate Study Plan
                        </Button>
                    </div>
                );
            }

            const currentDay = studyPlan.items[activeDay] || studyPlan.items[0];

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{studyPlan.title}</h1>
                            <p className="text-gray-600">{formatDate(studyPlan.startDate)} — {formatDate(studyPlan.endDate)}</p>
                        </div>
                        <Button variant="outline" onClick={generateStudyPlan}>
                            <Icons.RefreshCw className="w-4 h-4" /> Regenerate
                        </Button>
                    </div>

                    {/* Week View */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {studyPlan.items.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveDay(idx)}
                                className={`flex-shrink-0 w-20 p-3 rounded-xl text-center transition-all ${activeDay === idx ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                <div className="text-xs font-medium mb-1">Day {day.day}</div>
                                <div className="text-lg font-bold">{new Date(day.date).getDate()}</div>
                                <div className="text-xs">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            </button>
                        ))}
                    </div>

                    {/* Day Detail */}
                    <Card>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Day {currentDay.day} — {new Date(currentDay.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                        <p className="text-sm text-gray-500 mb-6">{currentDay.items.length} activities • {currentDay.items.reduce((a, b) => a + b.duration, 0)} minutes total</p>

                        <div className="space-y-3">
                            {currentDay.items.map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${item.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                    <button
                                        onClick={() => {
                                            const updated = { ...studyPlan };
                                            updated.items[activeDay].items[idx].completed = !item.completed;
                                            // In real app, would update via API
                                        }}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${item.completed ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 hover:border-indigo-500'}`}
                                    >
                                        {item.completed && <Icons.Check className="w-5 h-5" />}
                                    </button>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{item.subject} — {item.topic}</div>
                                        <div className="text-sm text-gray-500">{item.activity}</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Icons.Clock className="w-4 h-4" />
                                        {item.duration} min
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Icons.Brain className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-indigo-900 text-sm">AI Recommendation</h4>
                                    <p className="text-sm text-indigo-700 mt-1">
                                        Based on your recent performance, spend extra time on <strong>DBMS Normalization</strong> today. Your accuracy in this topic is 52% — aim for at least 70%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        };

// PROGRESS
const ProgressPage = () => {
            const { studentProfile, quizHistory, mockTestHistory, selectedExam } = useApp();
            const chartCanvasRef = useRef(null);
            const chartInstanceRef = useRef(null);

            useEffect(() => {
                if (chartCanvasRef.current && quizHistory.length > 0 && typeof Chart !== 'undefined') {
                    // Destroy previous chart
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }
                    const ctx = chartCanvasRef.current.getContext('2d');
                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: quizHistory.map((_, i) => `Quiz ${i + 1}`),
                            datasets: [{
                                label: 'Accuracy %',
                                data: quizHistory.map(q => q.accuracy),
                                borderColor: '#4f46e5',
                                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true, max: 100 } }
                        }
                    });
                }
                return () => {
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }
                };
            }, [quizHistory]);

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>

                    {/* Overview Stats */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <div className="text-sm text-gray-500 mb-1">Current Streak</div>
                            <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {studentProfile?.currentStreak || 0} days
                                <Icons.Zap className="w-5 h-5 text-amber-500" />
                            </div>
                        </Card>
                        <Card>
                            <div className="text-sm text-gray-500 mb-1">Study Hours</div>
                            <div className="text-2xl font-bold text-gray-900">{studentProfile?.totalStudyHours || 0}h</div>
                        </Card>
                        <Card>
                            <div className="text-sm text-gray-500 mb-1">Questions Solved</div>
                            <div className="text-2xl font-bold text-gray-900">{studentProfile?.questionsSolved || 0}</div>
                        </Card>
                        <Card>
                            <div className="text-sm text-gray-500 mb-1">Mock Tests</div>
                            <div className="text-2xl font-bold text-gray-900">{studentProfile?.mockTestsCompleted || 0}</div>
                        </Card>
                    </div>

                    {/* Performance Chart */}
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Quiz Performance Over Time</h3>
                                                    <div className="h-64">
                            {quizHistory.length > 0 ? (
                                <canvas ref={chartCanvasRef} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <Icons.BarChart className="w-12 h-12 mx-auto mb-2" />
                                        <p>Take some quizzes to see your progress</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Subject Performance */}
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Subject Performance</h3>
                        <div className="space-y-4">
                            {(MOCK_DATA.subjects[selectedExam] || MOCK_DATA.subjects['gate']).map(sub => {
                                const accuracy = Math.floor(Math.random() * 40) + 60;
                                return (
                                    <div key={sub.id}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                                            <span className="text-sm text-gray-500">{accuracy}% accuracy</span>
                                        </div>
                                        <ProgressBar value={accuracy} max={100} color={accuracy >= 80 ? 'green' : accuracy >= 60 ? 'amber' : 'red'} size="sm" showLabel={false} />
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {quizHistory.length === 0 && mockTestHistory.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No activity yet. Start practicing!</p>
                            ) : (
                                [...quizHistory, ...mockTestHistory].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                                <Icons.Trophy className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">Quiz Attempt</div>
                                                <div className="text-sm text-gray-500">{formatDate(item.date)}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">{item.accuracy}%</div>
                                            <div className="text-sm text-gray-500">{item.score} marks</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            );
        };

// NOTIFICATIONS
const NotificationsPage = () => {
            const { notifications, markNotificationRead } = useApp();

            return (
                <div className="max-w-2xl mx-auto fade-in">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
                    <div className="space-y-3">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                onClick={() => markNotificationRead(notif.id)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer ${notif.read ? 'bg-gray-50 border-gray-100' : 'bg-white border-indigo-200 shadow-sm'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-indigo-100'}`}>
                                        {notif.type === 'exam' ? <Icons.Trophy className={`w-5 h-5 ${notif.read ? 'text-gray-400' : 'text-indigo-600'}`} /> :
                                         notif.type === 'ai' ? <Icons.Brain className={`w-5 h-5 ${notif.read ? 'text-gray-400' : 'text-indigo-600'}`} /> :
                                         <Icons.FileText className={`w-5 h-5 ${notif.read ? 'text-gray-400' : 'text-indigo-600'}`} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-semibold ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>{notif.title}</h3>
                                            {!notif.read && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

// PROFILE
const ProfilePage = ({ onNavigate }) => {
            const { user, studentProfile, logout } = useApp();
            const [name, setName] = useState(user?.name || '');
            const [email, setEmail] = useState(user?.email || '');

            return (
                <div className="max-w-2xl mx-auto fade-in">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
                    <Card className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                                <p className="text-gray-500">{email}</p>
                                <Badge variant="primary" className="mt-1">Student</Badge>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
                            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled />
                        </div>

                        {studentProfile && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <h3 className="font-semibold text-gray-900">Preparation Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500">Target Exam:</span> <span className="font-medium">{getExamName(studentProfile.targetExam) || 'Not set'}</span></div>
                                    <div><span className="text-gray-500">Level:</span> <span className="font-medium">{studentProfile.preparationLevel}</span></div>
                                    <div><span className="text-gray-500">Daily Study:</span> <span className="font-medium">{studentProfile.dailyStudyTime / 60} hours</span></div>
                                    <div><span className="text-gray-500">Style:</span> <span className="font-medium">{studentProfile.learningStyle}</span></div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <Button onClick={() => {}}>Save Changes</Button>
                            <Button variant="danger" onClick={() => { logout(); onNavigate('landing'); }}>Logout</Button>
                        </div>
                    </Card>
                </div>
            );
        };

// COURSES
const CoursesPage = () => {
            const { selectedExam } = useApp();
            const courses = selectedExam ? (MOCK_DATA.courses[selectedExam] || []) : [];

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                    {courses.length === 0 ? (
                        <Card className="text-center py-12">
                            <Icons.BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No courses available for your selected exam yet.</p>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <Card key={course.id} className="border-0 shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                                        <Icons.BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                                    <div className="space-y-1 text-sm text-gray-500 mb-4">
                                        <div>{course.subjects} subjects</div>
                                        <div>{course.materials} materials</div>
                                        <div>{course.questions} practice questions</div>
                                    </div>
                                    <ProgressBar value={course.progress} max={100} color="indigo" />
                                    <Button className="w-full mt-4" variant="outline">Continue Learning</Button>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            );
        };

export { StudentMaterialsPage, ReactPage, StudentLayout, StudentDashboard, ExamInfoPage, AITutorPage, PracticePage, PYQsPage, MockTestsPage, StudyPlanPage, ProgressPage, NotificationsPage, ProfilePage, CoursesPage };
