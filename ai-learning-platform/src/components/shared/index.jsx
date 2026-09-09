import React, { useState, useEffect, useRef } from 'react';
import { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal } from '../ui';
import { useApp, getExamName } from '../../context/AppContext';
import MOCK_DATA, { generateId } from '../../data/mockData';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// LANDING PAGE
const LandingPage = ({ onNavigate }) => {
            const [activeFeature, setActiveFeature] = useState(0);
            const features = [
                { icon: Icons.Brain, title: 'AI-Powered Tutor', desc: 'Get personalized explanations, solve doubts 24/7, and learn at your own pace with our advanced AI tutor.' },
                { icon: Icons.Target, title: 'Exam-Specific Prep', desc: 'Tailored content for GATE, UPSC, SSC, CAT, NEET and more. Every exam has dedicated study paths.' },
                { icon: Icons.BarChart, title: 'Smart Analytics', desc: 'Track your progress, identify weak areas, and get AI-driven recommendations to improve faster.' },
                { icon: Icons.FileText, title: 'Previous Year Papers', desc: 'Access and practice thousands of previous year questions with detailed solutions and explanations.' },
                { icon: Icons.Trophy, title: 'Mock Tests', desc: 'Take full-length mock tests with real exam simulation, timer, and detailed performance analysis.' },
                { icon: Icons.Zap, title: 'Study Planner', desc: 'AI generates personalized daily, weekly, and monthly study plans based on your goals and performance.' },
            ];

            return (
                <div className="min-h-screen bg-white">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="fade-in">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                                        <Icons.Zap />
                                        <span>AI-Powered Learning Platform</span>
                                    </div>
                                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                        Master Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Competitive Exam</span> with AI
                                    </h1>
                                    <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                                        Personalized study plans, AI tutor, mock tests, and verified study materials for GATE, UPSC, SSC, CAT, NEET, and more.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button size="lg" onClick={() => onNavigate('register')} className="bg-white text-indigo-900 hover:bg-indigo-50">
                                            Get Started Free
                                        </Button>
                                        <Button size="lg" variant="outline" onClick={() => onNavigate('login')} className="border-white/30 text-white hover:bg-white/10">
                                            Sign In
                                        </Button>
                                    </div>
                                    <div className="mt-10 flex items-center gap-8 text-sm text-indigo-200">
                                        <div className="flex items-center gap-2">
                                            <Icons.CheckCircle className="w-5 h-5" />
                                            <span>10+ Exams</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icons.CheckCircle className="w-5 h-5" />
                                            <span>50K+ Questions</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icons.CheckCircle className="w-5 h-5" />
                                            <span>AI Tutor 24/7</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:block relative">
                                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                                <Icons.Brain className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">AI Tutor</div>
                                                <div className="text-xs text-indigo-200">Online</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white/10 rounded-xl p-4 text-sm">
                                                <p className="text-indigo-100">Explain 3NF in DBMS with an example</p>
                                            </div>
                                            <div className="bg-indigo-500/30 rounded-xl p-4 text-sm border border-indigo-400/30">
                                                <p className="text-white"><strong>3NF (Third Normal Form):</strong> A relation is in 3NF if it is in 2NF and has no transitive dependencies.</p>
                                                <p className="text-indigo-200 mt-2 text-xs">Sources: DBMS Notes - Normalization (Page 45)</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-sm text-indigo-200">Give me a quiz on this</div>
                                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                                    <Icons.Send className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exams Grid */}
                    <div className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Target Exam</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">We support all major competitive and higher education exams in India with dedicated study paths and AI assistance.</p>
                            </div>
                            {Object.entries(
                                MOCK_DATA.exams.reduce((acc, exam) => {
                                    if (!acc[exam.category]) acc[exam.category] = [];
                                    acc[exam.category].push(exam);
                                    return acc;
                                }, {})
                            ).map(([category, exams]) => (
                                <div key={category} className="mb-12 last:mb-0">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-100 inline-block">{category}</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {exams.map((exam) => (
                                            <div key={exam.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover cursor-pointer" onClick={() => onNavigate('register')}>
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                    {React.createElement(Icons[exam.icon] || Icons.BookOpen, { className: 'w-7 h-7 text-white' })}
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{exam.name}</h3>
                                                <p className="text-sm text-gray-500 mb-3">{exam.description}</p>
                                                <Badge variant="primary">{exam.category}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
                                <p className="text-lg text-gray-600">A complete learning ecosystem powered by artificial intelligence.</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, idx) => (
                                    <Card key={idx} className="border-0 shadow-md">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                                            <feature.icon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                <div>
                                    <div className="text-4xl font-bold mb-2">50,000+</div>
                                    <div className="text-indigo-200">Practice Questions</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">10+</div>
                                    <div className="text-indigo-200">Exams Covered</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">500+</div>
                                    <div className="text-indigo-200">Mock Tests</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">24/7</div>
                                    <div className="text-indigo-200">AI Tutor Available</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="py-20 bg-gray-50">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Preparation?</h2>
                            <p className="text-lg text-gray-600 mb-8">Join thousands of students preparing smarter with AI assistance.</p>
                            <Button size="lg" onClick={() => onNavigate('register')} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                                Create Free Account
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gray-900 text-gray-400 py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid md:grid-cols-4 gap-8">
                                <div>
                                    <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                                        <Icons.GraduationCap className="w-6 h-6" />
                                        AI Learning Assistant
                                    </div>
                                    <p className="text-sm">AI-powered learning platform for competitive exam preparation.</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-4">Exams</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>GATE</li>
                                        <li>UPSC</li>
                                        <li>SSC CGL</li>
                                        <li>CAT</li>
                                        <li>NEET</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-4">Features</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>AI Tutor</li>
                                        <li>Mock Tests</li>
                                        <li>Study Planner</li>
                                        <li>PYQs</li>
                                        <li>Analytics</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-4">Support</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>Help Center</li>
                                        <li>Contact Us</li>
                                        <li>Privacy Policy</li>
                                        <li>Terms of Service</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            );
        };

// AUTH PAGES
const LoginPage = ({ onNavigate }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [role, setRoleState] = useState('STUDENT');
            const [error, setError] = useState('');
            const [loading, setLoading] = useState(false);
            const { login } = useApp();

            const handleSubmit = async (e) => {
                e.preventDefault();
                setError('');
                setLoading(true);
                await delay(1000);
                if (email.length < 3 || password.length < 4) {
                    setError('Please enter valid credentials');
                    setLoading(false);
                    return;
                }
                login(email, password, role);
                onNavigate(role === 'ADMIN' ? 'admin-dashboard' : 'student-dashboard');
                setLoading(false);
            };

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-4">
                                <Icons.GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-600 mt-1">Sign in to your AI Learning Assistant</p>
                        </div>
                        <Card className="shadow-xl">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                                    <Icons.AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    icon={Icons.Mail}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    icon={Icons.Lock}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                                    <div className="flex gap-2">
                                        {['STUDENT', 'FACULTY', 'ADMIN'].map(r => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setRoleState(r)}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === r ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Icons.Loader className="w-5 h-5" /> : 'Sign In'}
                                </Button>
                            </form>
                            <div className="mt-6 text-center text-sm">
                                <span className="text-gray-500">Don't have an account? </span>
                                <button onClick={() => onNavigate('register')} className="text-indigo-600 font-medium hover:underline">
                                    Sign up
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            );
        };

        const RegisterPage = ({ onNavigate }) => {
            const [name, setName] = useState('');
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');
            const [error, setError] = useState('');
            const [loading, setLoading] = useState(false);
            const { register } = useApp();

            const handleSubmit = async (e) => {
                e.preventDefault();
                setError('');
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
                setLoading(true);
                await delay(1000);
                const success = register(name, email, password, 'STUDENT');
                if (!success) {
                    setError('Email already exists');
                    setLoading(false);
                    return;
                }
                onNavigate('onboarding');
                setLoading(false);
            };

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-4">
                                <Icons.GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                            <p className="text-gray-600 mt-1">Start your AI-powered exam preparation</p>
                        </div>
                        <Card className="shadow-xl">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                                    <Icons.AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    icon={Icons.User}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    icon={Icons.Mail}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    icon={Icons.Lock}
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    icon={Icons.Lock}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Icons.Loader className="w-5 h-5" /> : 'Create Account'}
                                </Button>
                            </form>
                            <div className="mt-6 text-center text-sm">
                                <span className="text-gray-500">Already have an account? </span>
                                <button onClick={() => onNavigate('login')} className="text-indigo-600 font-medium hover:underline">
                                    Sign in
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            );
        };

// ONBOARDING
const OnboardingPage = ({ onNavigate }) => {
            const [step, setStep] = useState(1);
            const [selectedExam, setSelectedExamState] = useState(null);
            const [prepDetails, setPrepDetails] = useState({
                targetYear: new Date().getFullYear() + 1,
                preparationLevel: 'BEGINNER',
                dailyStudyTime: 120,
                learningStyle: 'VISUAL',
                targetScore: '',
                strongSubjects: [],
                weakSubjects: []
            });
            const { selectExam, completeOnboarding } = useApp();

            const handleExamSelect = (exam) => {
                setSelectedExamState(exam);
                selectExam(exam.slug);
            };

            const handleNext = () => {
                if (step === 1 && !selectedExam) return;
                if (step === 3) {
                    completeOnboarding({
                        targetExam: selectedExam?.slug,
                        ...prepDetails
                    });
                    onNavigate('student-dashboard');
                    return;
                }
                setStep(step + 1);
            };

            const handleBack = () => {
                if (step > 1) setStep(step - 1);
            };

            const examSubjects = selectedExam ? (MOCK_DATA.subjects[selectedExam.slug] || []) : [];

            return (
                <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                    <div className="max-w-4xl mx-auto pt-8">
                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
                                <span className="text-sm font-medium text-gray-600">{Math.round((step / 3) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
                            </div>
                        </div>

                        <Card className="shadow-xl">
                            {step === 1 && (
                                <div className="fade-in">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Goal</h2>
                                    <p className="text-gray-600 mb-8">Select the exam you're preparing for. You can change this later.</p>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {MOCK_DATA.exams.map(exam => (
                                            <div
                                                key={exam.id}
                                                onClick={() => handleExamSelect(exam)}
                                                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all card-hover ${selectedExam?.id === exam.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-3`}>
                                                    {React.createElement(Icons[exam.icon] || Icons.BookOpen, { className: 'w-6 h-6 text-white' })}
                                                </div>
                                                <h3 className="font-bold text-gray-900">{exam.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                                                <Badge variant={selectedExam?.id === exam.id ? 'primary' : 'default'} className="mt-3">
                                                    {exam.category}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="fade-in">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparation Details</h2>
                                    <p className="text-gray-600 mb-8">Help us personalize your learning experience.</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Select
                                            label="Target Year"
                                            value={prepDetails.targetYear}
                                            onChange={e => setPrepDetails({ ...prepDetails, targetYear: parseInt(e.target.value) })}
                                            options={[2025, 2026, 2027].map(y => ({ value: y, label: String(y) }))}
                                        />
                                        <Select
                                            label="Preparation Level"
                                            value={prepDetails.preparationLevel}
                                            onChange={e => setPrepDetails({ ...prepDetails, preparationLevel: e.target.value })}
                                            options={[
                                                { value: 'BEGINNER', label: 'Beginner - Just starting' },
                                                { value: 'INTERMEDIATE', label: 'Intermediate - Some preparation done' },
                                                { value: 'ADVANCED', label: 'Advanced - Well prepared' }
                                            ]}
                                        />
                                        <Select
                                            label="Daily Study Time"
                                            value={prepDetails.dailyStudyTime}
                                            onChange={e => setPrepDetails({ ...prepDetails, dailyStudyTime: parseInt(e.target.value) })}
                                            options={[
                                                { value: 60, label: '1 hour' },
                                                { value: 120, label: '2 hours' },
                                                { value: 180, label: '3 hours' },
                                                { value: 240, label: '4+ hours' }
                                            ]}
                                        />
                                        <Select
                                            label="Learning Style"
                                            value={prepDetails.learningStyle}
                                            onChange={e => setPrepDetails({ ...prepDetails, learningStyle: e.target.value })}
                                            options={[
                                                { value: 'VISUAL', label: 'Visual - Videos, diagrams' },
                                                { value: 'READING', label: 'Reading - Books, notes' },
                                                { value: 'PRACTICE', label: 'Practice - Problems, tests' },
                                                { value: 'MIXED', label: 'Mixed - All of the above' }
                                            ]}
                                        />
                                        <Input
                                            label="Target Score/Rank (optional)"
                                            placeholder="e.g., AIR 100"
                                            value={prepDetails.targetScore}
                                            onChange={e => setPrepDetails({ ...prepDetails, targetScore: e.target.value })}
                                        />
                                    </div>

                                    {examSubjects.length > 0 && (
                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Strong Subjects</label>
                                            <div className="flex flex-wrap gap-2">
                                                {examSubjects.map(sub => (
                                                    <button
                                                        key={sub.id}
                                                        onClick={() => {
                                                            const current = prepDetails.strongSubjects;
                                                            const updated = current.includes(sub.name)
                                                                ? current.filter(s => s !== sub.name)
                                                                : [...current, sub.name];
                                                            setPrepDetails({ ...prepDetails, strongSubjects: updated });
                                                        }}
                                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${prepDetails.strongSubjects.includes(sub.name) ? 'bg-green-100 text-green-700 border-green-300 border' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                    >
                                                        {sub.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="fade-in text-center py-8">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                                        <Icons.CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
                                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                        Your AI tutor is ready to help you prepare for {selectedExam?.name}. We've generated a personalized study plan based on your inputs.
                                    </p>
                                    <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500">Target Exam</span>
                                            <span className="font-semibold text-gray-900">{selectedExam?.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500">Preparation Level</span>
                                            <span className="font-semibold text-gray-900">{prepDetails.preparationLevel}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500">Daily Study</span>
                                            <span className="font-semibold text-gray-900">{prepDetails.dailyStudyTime / 60} hours</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Learning Style</span>
                                            <span className="font-semibold text-gray-900">{prepDetails.learningStyle}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                                {step > 1 ? (
                                    <Button variant="ghost" onClick={handleBack}>
                                        <Icons.ArrowLeft className="w-4 h-4" /> Back
                                    </Button>
                                ) : (
                                    <div />
                                )}
                                <Button onClick={handleNext} disabled={step === 1 && !selectedExam}>
                                    {step === 3 ? 'Go to Dashboard' : 'Next'} <Icons.ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            );
        };

export { LandingPage, LoginPage, RegisterPage, OnboardingPage };
