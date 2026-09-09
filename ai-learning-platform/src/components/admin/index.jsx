import React, { useState, useEffect, useRef } from 'react';
import { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal } from '../ui';
import { useApp, getExamName } from '../../context/AppContext';
import MOCK_DATA, { generateId } from '../../data/mockData';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ADMIN LAYOUT
const AdminLayout = ({ children, onNavigate, activePage }) => {
            const { logout, switchRole } = useApp();
            const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

            const navItems = [
                { id: 'admin-dashboard', label: 'Dashboard', icon: Icons.Home },
                { id: 'admin-exams', label: 'Exams', icon: Icons.Target },
                { id: 'admin-courses', label: 'Courses', icon: Icons.BookOpen },
                { id: 'admin-materials', label: 'Materials', icon: Icons.FileText },
                { id: 'admin-questions', label: 'Questions', icon: Icons.HelpCircle },
                { id: 'admin-mock-tests', label: 'Mock Tests', icon: Icons.Trophy },
                { id: 'admin-students', label: 'Students', icon: Icons.Users },
                { id: 'admin-ai-kb', label: 'AI Knowledge Base', icon: Icons.Brain },
                { id: 'admin-analytics', label: 'Analytics', icon: Icons.BarChart },
                { id: 'admin-announcements', label: 'Announcements', icon: Icons.Bell },
            ];

            return (
                <div className="min-h-screen bg-gray-50 flex">
                    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
                        <div className="p-4 flex items-center justify-between">
                            {!sidebarCollapsed && (
                                <div className="flex items-center gap-2 font-bold text-xl text-indigo-900">
                                    <Icons.Shield className="w-7 h-7 text-indigo-600" />
                                    Admin
                                </div>
                            )}
                            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 hover:bg-gray-100 rounded-lg">
                                {sidebarCollapsed ? <Icons.ChevronRight className="w-5 h-5" /> : <Icons.ChevronLeft className="w-5 h-5" />}
                            </button>
                        </div>
                        <nav className="flex-1 px-3 space-y-1">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    {!sidebarCollapsed && <span>{item.label}</span>}
                                </button>
                            ))}
                        </nav>
                        <div className="p-3 border-t border-gray-200">
                            <button
                                onClick={() => { logout(); onNavigate('landing'); }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                            >
                                <Icons.LogOut className="w-5 h-5 flex-shrink-0" />
                                {!sidebarCollapsed && <span>Logout</span>}
                            </button>
                        </div>
                    </aside>
                    <main className="flex-1 overflow-y-auto">
                        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            );
        };

// ADMIN DASHBOARD
const AdminDashboard = () => {
            const stats = [
                { label: 'Total Students', value: '1,234', icon: Icons.Users, color: 'blue' },
                { label: 'Active Students', value: '892', icon: Icons.Activity, color: 'green' },
                { label: 'Total Exams', value: '10', icon: Icons.Target, color: 'indigo' },
                { label: 'Total Materials', value: '156', icon: Icons.FileText, color: 'amber' },
                { label: 'Total Questions', value: '45,678', icon: Icons.HelpCircle, color: 'purple' },
                { label: 'AI Queries Today', value: '3,421', icon: Icons.MessageSquare, color: 'pink' },
            ];

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {stats.map((stat, idx) => (
                            <Card key={idx} className="border-0 shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Student Registrations (Last 7 Days)</h3>
                            <div className="h-64 flex items-end justify-around gap-2">
                                {[45, 62, 38, 75, 56, 89, 67].map((v, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full bg-indigo-100 rounded-t-lg relative group" style={{ height: `${(v / 100) * 200}px` }}>
                                            <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all group-hover:bg-indigo-600" style={{ height: '100%' }} />
                                        </div>
                                        <span className="text-xs text-gray-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Exam Popularity</h3>
                            <div className="space-y-4">
                                {MOCK_DATA.exams.slice(0, 5).map((exam, idx) => (
                                    <div key={exam.id}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-700">{exam.name}</span>
                                            <span className="text-sm font-medium text-gray-900">{[35, 28, 22, 18, 12][idx]}%</span>
                                        </div>
                                        <ProgressBar value={[35, 28, 22, 18, 12][idx]} max={100} color={['indigo', 'purple', 'blue', 'green', 'amber'][idx]} size="sm" showLabel={false} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">User</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Entity</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { user: 'Rahul Kumar', action: 'Completed Mock Test', entity: 'GATE CSE Full Mock 1', time: '2 min ago' },
                                        { user: 'Priya Singh', action: 'Asked AI Tutor', entity: 'DBMS Normalization', time: '5 min ago' },
                                        { user: 'Amit Patel', action: 'Uploaded Material', entity: 'OS Notes.pdf', time: '12 min ago' },
                                        { user: 'Sneha Gupta', action: 'Started Quiz', entity: 'Data Structures', time: '18 min ago' },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium text-gray-900">{row.user}</td>
                                            <td className="py-3 px-4 text-gray-600">{row.action}</td>
                                            <td className="py-3 px-4 text-gray-600">{row.entity}</td>
                                            <td className="py-3 px-4 text-gray-400">{row.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            );
        };

// ADMIN EXAMS
const AdminExams = () => {
            const [exams, setExams] = useState(MOCK_DATA.exams);
            const [showAddModal, setShowAddModal] = useState(false);
            const [newExam, setNewExam] = useState({ name: '', description: '', category: '' });

            const handleAdd = () => {
                if (!newExam.name) return;
                setExams([...exams, {
                    id: generateId(),
                    slug: newExam.name.toLowerCase().replace(/\s+/g, '-'),
                    ...newExam,
                    isActive: true,
                    isPublished: false
                }]);
                setShowAddModal(false);
                setNewExam({ name: '', description: '', category: '' });
            };

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
                        <Button onClick={() => setShowAddModal(true)}>
                            <Icons.Plus className="w-4 h-4" /> Add Exam
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map(exam => (
                            <Card key={exam.id} className="border-0 shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center`}>
                                        {React.createElement(Icons[exam.icon] || Icons.BookOpen, { className: 'w-6 h-6 text-white' })}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg"><Icons.Edit className="w-4 h-4 text-gray-500" /></button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg"><Icons.Eye className="w-4 h-4 text-gray-500" /></button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{exam.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{exam.description}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant={exam.isPublished ? 'success' : 'warning'}>{exam.isPublished ? 'Published' : 'Draft'}</Badge>
                                    <Badge variant="default">{exam.category}</Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                                    <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Exam">
                        <div className="space-y-4">
                            <Input label="Exam Name" value={newExam.name} onChange={e => setNewExam({ ...newExam, name: e.target.value })} />
                            <Input label="Description" value={newExam.description} onChange={e => setNewExam({ ...newExam, description: e.target.value })} />
                            <Input label="Category" value={newExam.category} onChange={e => setNewExam({ ...newExam, category: e.target.value })} />
                            <div className="flex gap-3 justify-end pt-4">
                                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                <Button onClick={handleAdd}>Add Exam</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        };

// ADMIN MATERIALS
const AdminMaterials = () => {
            const [materials, setMaterials] = useState(MOCK_DATA.materials);
            const [showUpload, setShowUpload] = useState(false);
            const [uploadForm, setUploadForm] = useState({
                title: '', exam: MOCK_DATA.exams[0].name, subject: '', topic: '', file: null
            });
            const fileInputRef = useRef(null);

            const handleUpload = () => {
                const newMaterial = {
                    id: generateId(),
                    ...uploadForm,
                    type: uploadForm.file ? (uploadForm.file.name.split('.').pop().toUpperCase() || 'PDF') : 'PDF',
                    size: uploadForm.file ? (Math.round(uploadForm.file.size / 1024 / 1024 * 10) / 10 + ' MB') : '2.5 MB',
                    status: 'Published',
                    chunks: 0
                };
                MOCK_DATA.materials.unshift(newMaterial);
                setMaterials([...MOCK_DATA.materials]);
                setShowUpload(false);
                setUploadForm({ title: '', exam: MOCK_DATA.exams[0].name, subject: '', topic: '', file: null });
            };

            const getStatusBadge = (status) => {
                const map = {
                    'Published': 'success',
                    'Processing': 'warning',
                    'Draft': 'default',
                    'Indexed': 'info'
                };
                return map[status] || 'default';
            };

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Learning Materials</h1>
                        <Button onClick={() => setShowUpload(true)}>
                            <Icons.Upload className="w-4 h-4" /> Upload Material
                        </Button>
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Material</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Exam</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Subject</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Chunks</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.map(m => (
                                        <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">{m.title}</div>
                                                <div className="text-xs text-gray-400">{m.type} • {m.size}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{m.exam}</td>
                                            <td className="py-3 px-4 text-gray-600">{m.subject}</td>
                                            <td className="py-3 px-4"><Badge variant={getStatusBadge(m.status)}>{m.status}</Badge></td>
                                            <td className="py-3 px-4 text-gray-600">{m.chunks || '—'}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded"><Icons.Eye className="w-4 h-4 text-gray-500" /></button>
                                                    <button className="p-1 hover:bg-gray-100 rounded"><Icons.RefreshCw className="w-4 h-4 text-gray-500" /></button>
                                                    <button className="p-1 hover:bg-gray-100 rounded text-red-500 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload Material">
                        <div className="space-y-4">
                            <Input label="Material Title" value={uploadForm.title} onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })} />
                            <Select
                                label="Exam"
                                value={uploadForm.exam}
                                onChange={e => setUploadForm({ ...uploadForm, exam: e.target.value })}
                                options={MOCK_DATA.exams.map(e => ({ value: e.name, label: e.name }))}
                            />
                            <Input label="Subject" value={uploadForm.subject} onChange={e => setUploadForm({ ...uploadForm, subject: e.target.value })} />
                            <Input label="Topic" value={uploadForm.topic} onChange={e => setUploadForm({ ...uploadForm, topic: e.target.value })} />
                            
                            <div 
                                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={fileInputRef}
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setUploadForm({ ...uploadForm, file: e.target.files[0] });
                                        }
                                    }}
                                />
                                {uploadForm.file ? (
                                    <div className="text-indigo-600 font-medium">
                                        <Icons.CheckCircle className="w-10 h-10 mx-auto mb-2" />
                                        {uploadForm.file.name} selected
                                    </div>
                                ) : (
                                    <>
                                        <Icons.Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Drag and drop files here, or click to browse</p>
                                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, PPT, TXT up to 50MB</p>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex gap-3 justify-end pt-4">
                                <Button variant="ghost" onClick={() => setShowUpload(false)}>Cancel</Button>
                                <Button onClick={handleUpload} disabled={!uploadForm.title || !uploadForm.file}>Upload & Process</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        };

// ADMIN AI KB
const AdminAIKB = () => {
            const { apiKeys, setApiKeys } = useApp();
            const [localKeys, setLocalKeys] = useState(apiKeys);
            const [saved, setSaved] = useState(false);

            const handleSaveKeys = () => {
                setApiKeys(localKeys);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            };

            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">AI Knowledge Base & Settings</h1>
                    <p className="text-gray-600">Configure your AI providers and manage documents that power the AI tutor.</p>
                    
                    {/* API Settings Section */}
                    <Card className="border-l-4 border-l-indigo-500 bg-indigo-50/30">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Icons.Settings className="w-5 h-5 text-indigo-600" />
                            AI Provider Settings
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">Enter your API keys to enable real-time AI responses. These keys are stored locally in your browser.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Groq API Key</label>
                                <input 
                                    type="password" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="gsk_..." 
                                    value={localKeys.groq} 
                                    onChange={e => setLocalKeys({...localKeys, groq: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Google Gemini API Key</label>
                                <input 
                                    type="password" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="AIza..." 
                                    value={localKeys.gemini} 
                                    onChange={e => setLocalKeys({...localKeys, gemini: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <Button onClick={handleSaveKeys}>Save API Keys</Button>
                            {saved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><Icons.CheckCircle className="w-4 h-4" /> Saved successfully</span>}
                        </div>
                    </Card>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">Document Index</h2>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Document</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Exam</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Subject</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Chunks</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_DATA.materials.map(m => (
                                        <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">{m.title}</div>
                                                <div className="text-xs text-gray-400">ID: {m.id}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{m.exam}</td>
                                            <td className="py-3 px-4 text-gray-600">{m.subject}</td>
                                            <td className="py-3 px-4">
                                                <Badge variant={m.status === 'Published' ? 'success' : m.status === 'Processing' ? 'warning' : 'default'}>
                                                    {m.status === 'Published' ? 'Indexed' : m.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{m.chunks || '—'}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded text-xs font-medium text-indigo-600">Manage</button>
                                                    <button className="p-1 hover:bg-gray-100 rounded"><Icons.RefreshCw className="w-4 h-4 text-gray-500" /></button>
                                                    <button className="p-1 hover:bg-gray-100 rounded"><Icons.Eye className="w-4 h-4 text-gray-500" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-2">Total Documents</h3>
                            <p className="text-3xl font-bold text-indigo-600">{MOCK_DATA.materials.length}</p>
                        </Card>
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-2">Total Chunks</h3>
                            <p className="text-3xl font-bold text-purple-600">703</p>
                        </Card>
                        <Card>
                            <h3 className="font-semibold text-gray-900 mb-2">AI Queries Today</h3>
                            <p className="text-3xl font-bold text-green-600">3,421</p>
                        </Card>
                    </div>
                </div>
            );
        };

// ADMIN COURSES
const AdminCourses = () => {
            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
                        <Button><Icons.Plus className="w-4 h-4" /> Create Course</Button>
                    </div>
                    <Card>
                        <div className="text-center py-12">
                            <Icons.BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No Courses Yet</h3>
                            <p className="text-gray-500 mt-2">Start by creating a new course bundle for your students.</p>
                        </div>
                    </Card>
                </div>
            );
        };

// ADMIN MOCK TESTS
const AdminMockTests = () => {
            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Mock Tests</h1>
                        <Button><Icons.Plus className="w-4 h-4" /> Create Test</Button>
                    </div>
                    <Card>
                        <div className="text-center py-12">
                            <Icons.Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No Mock Tests Available</h3>
                            <p className="text-gray-500 mt-2">Create full-length simulation tests for the students.</p>
                        </div>
                    </Card>
                </div>
            );
        };

// ADMIN STUDENTS
const AdminStudents = () => {
            const { users } = useApp();
            const students = users.filter(u => u.role === 'STUDENT');

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
                        <Button variant="outline"><Icons.Upload className="w-4 h-4" /> Export CSV</Button>
                    </div>
                    <Card>
                        {students.length === 0 ? (
                            <div className="text-center py-12">
                                <Icons.Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No Students Found</h3>
                                <p className="text-gray-500 mt-2">When students register, they will appear here.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 text-gray-500 font-medium">Email</th>
                                            <th className="text-left py-3 px-4 text-gray-500 font-medium">Target Exam</th>
                                            <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => (
                                            <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                                                <td className="py-3 px-4 text-gray-600">{student.email}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    {student.profile?.targetExam ? <Badge variant="primary">{student.profile.targetExam.toUpperCase()}</Badge> : 'Not selected'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Badge variant="success">Active</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
            );
        };

// ADMIN ANALYTICS
const AdminAnalytics = () => {
            return (
                <div className="space-y-6 fade-in">
                    <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
                    <Card>
                        <div className="text-center py-12">
                            <Icons.BarChart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">Detailed Analytics</h3>
                            <p className="text-gray-500 mt-2">Advanced charts and performance metrics will appear here.</p>
                        </div>
                    </Card>
                </div>
            );
        };

// ADMIN ANNOUNCEMENTS
const AdminAnnouncements = () => {
            return (
                <div className="space-y-6 fade-in">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                        <Button><Icons.Plus className="w-4 h-4" /> New Announcement</Button>
                    </div>
                    <Card>
                        <div className="text-center py-12">
                            <Icons.Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                            <p className="text-gray-500 mt-2">Send global announcements or notifications to specific batches.</p>
                        </div>
                    </Card>
                </div>
            );
        };

// ADMIN QUESTIONS
const AdminQuestions = () => {
            const { questions, setQuestions } = useApp();
            const [showAdd, setShowAdd] = useState(false);
            const [selectedSubject, setSelectedSubject] = useState('All');
            const [newQ, setNewQ] = useState({ question: '', exam: 'SSC CGL', subject: 'Quant', type: 'MCQ', difficulty: 'Medium' });

            const allSubjects = ['All', ...new Set(questions.map(q => q.subject))];
            
            const filteredQuestions = selectedSubject === 'All' 
                ? questions 
                : questions.filter(q => q.subject === selectedSubject);

            const handleAddQuestion = () => {
                const added = {
                    id: generateId(),
                    ...newQ,
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correct: 0,
                    marks: 2,
                    topic: 'General'
                };
                setQuestions([added, ...questions]);
                setShowAdd(false);
                setNewQ({ question: '', exam: 'SSC CGL', subject: selectedSubject !== 'All' ? selectedSubject : 'Quant', type: 'MCQ', difficulty: 'Medium' });
            };

            const handleBulkUpload = () => {
                // Simulate bulk upload of 10 questions
                const bulkQs = Array.from({ length: 10 }).map((_, i) => ({
                    id: generateId(),
                    exam: 'GATE',
                    subject: 'DBMS',
                    topic: 'Bulk Uploaded Topic',
                    difficulty: 'MEDIUM',
                    question: `[Bulk] Generated MCQ Question ${i + 1}?`,
                    options: ['Opt A', 'Opt B', 'Opt C', 'Opt D'],
                    correct: Math.floor(Math.random() * 4),
                    marks: 2,
                    negative: 0.5
                }));
                setQuestions([...bulkQs, ...questions]);
                alert("Successfully bulk uploaded 10 questions!");
            };

            return (
                <div className="space-y-6 fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage and organize your questions by subject</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={handleBulkUpload}>
                                <Icons.Upload className="w-4 h-4" /> Bulk Upload
                            </Button>
                            <Button onClick={() => setShowAdd(true)}>
                                <Icons.Plus className="w-4 h-4" /> Add Question
                            </Button>
                        </div>
                    </div>

                    {/* Subject Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {allSubjects.map(sub => (
                            <button
                                key={sub}
                                onClick={() => {
                                    setSelectedSubject(sub);
                                    if (sub !== 'All') setNewQ({ ...newQ, subject: sub });
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedSubject === sub ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Question</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Exam</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Subject</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Type</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Difficulty</th>
                                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuestions.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-gray-500">No questions found for this subject.</td>
                                        </tr>
                                    ) : filteredQuestions.map(q => (
                                        <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900 max-w-xs truncate">{q.question}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{q.exam}</td>
                                            <td className="py-3 px-4 text-gray-600">{q.subject}</td>
                                            <td className="py-3 px-4"><Badge>{q.type || 'MCQ'}</Badge></td>
                                            <td className="py-3 px-4">
                                                <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'}>
                                                    {q.difficulty || 'Medium'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded"><Icons.Edit className="w-4 h-4 text-gray-500" /></button>
                                                    <button className="p-1 hover:bg-gray-100 rounded text-red-500 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Question">
                        <div className="space-y-4">
                            <Input label="Question Text" value={newQ.question} onChange={e => setNewQ({ ...newQ, question: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Exam" value={newQ.exam} onChange={e => setNewQ({ ...newQ, exam: e.target.value })} />
                                <Input label="Subject" value={newQ.subject} onChange={e => setNewQ({ ...newQ, subject: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Select label="Difficulty" value={newQ.difficulty} onChange={e => setNewQ({ ...newQ, difficulty: e.target.value })} options={[{value:'Easy',label:'Easy'},{value:'Medium',label:'Medium'},{value:'Hard',label:'Hard'}]} />
                                <Select label="Type" value={newQ.type} onChange={e => setNewQ({ ...newQ, type: e.target.value })} options={[{value:'MCQ',label:'MCQ'},{value:'Subjective',label:'Subjective'}]} />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                                <Button onClick={handleAddQuestion}>Save Question</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        };

export { AdminLayout, AdminDashboard, AdminExams, AdminMaterials, AdminAIKB, AdminCourses, AdminMockTests, AdminStudents, AdminAnalytics, AdminAnnouncements, AdminQuestions };
