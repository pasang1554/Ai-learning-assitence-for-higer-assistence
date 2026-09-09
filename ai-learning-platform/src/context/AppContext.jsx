import React, { createContext, useContext, useState, useEffect } from 'react';
import MOCK_DATA, { generateId } from '../data/mockData';

const getExamName = (slug) => MOCK_DATA.exams.find(e => e.slug === slug)?.name || slug;

const AppContext = createContext();

        const AppProvider = ({ children }) => {
            const [user, setUser] = useState({
                id: generateId(),
                email: 'admin@example.com',
                name: 'Admin',
                role: 'ADMIN'
            });
            const [role, setRole] = useState('ADMIN');
            const [selectedExam, setSelectedExam] = useState(null);
            const [studentProfile, setStudentProfile] = useState(null);
            const [chatSessions, setChatSessions] = useState(MOCK_DATA.chatHistory);
            const [currentChat, setCurrentChat] = useState(null);
            const [notifications, setNotifications] = useState(MOCK_DATA.notifications);
            const [studyPlan, setStudyPlan] = useState(null);
            const [quizHistory, setQuizHistory] = useState([]);
            const [mockTestHistory, setMockTestHistory] = useState([]);
            const [darkMode, setDarkMode] = useState(false);
            const [sidebarOpen, setSidebarOpen] = useState(true);
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

            // No localStorage - sandbox compatible, use in-memory only

            const login = (email, password, userRole = 'STUDENT') => {
                const existingUser = users.find(u => u.email === email && u.password === password);
                if (existingUser) {
                    setUser(existingUser);
                    setRole(existingUser.role);
                    if (existingUser.role === 'STUDENT') {
                        setStudentProfile(existingUser.profile || null);
                        setSelectedExam(existingUser.selectedExam || null);
                    }
                    return true;
                }
                // Fallback for hardcoded mock logins
                if (email === 'admin@admin.com' || email === 'student@student.com' || email === 'faculty@faculty.com') {
                    const mockUser = { id: generateId(), email, name: email.split('@')[0], role: userRole };
                    setUser(mockUser);
                    setRole(userRole);
                    return true;
                }
                return false;
            };

            const register = (name, email, password, userRole = 'STUDENT') => {
                if (users.find(u => u.email === email)) return false; // Email exists

                const defaultProfile = {
                    targetExam: null,
                    preparationLevel: 'BEGINNER',
                    dailyStudyTime: 120,
                    learningStyle: 'VISUAL',
                    currentStreak: 5,
                    longestStreak: 12,
                    totalStudyHours: 48,
                    questionsSolved: 234,
                    mockTestsCompleted: 4,
                    averageScore: 72,
                    weakSubjects: ['DBMS', 'Computer Networks'],
                    strongSubjects: ['Data Structures', 'Operating Systems']
                };

                const newUser = {
                    id: generateId(),
                    name,
                    email,
                    password, // plaintext for mock
                    role: userRole,
                    profile: userRole === 'STUDENT' ? defaultProfile : null,
                    selectedExam: null
                };

                setUsers([...users, newUser]);
                setUser(newUser);
                setRole(userRole);
                if (userRole === 'STUDENT') {
                    setStudentProfile(defaultProfile);
                }
                return true;
            };

            const logout = () => {
                setUser(null);
                setRole(null);
                setSelectedExam(null);
                setStudentProfile(null);
            };

            const switchRole = (newRole) => {
                login(user?.email || 'user@example.com', 'password', newRole);
            };

            const selectExam = (examSlug) => {
                setSelectedExam(examSlug);
                if (studentProfile) {
                    setStudentProfile({ ...studentProfile, targetExam: examSlug });
                }
            };

            const completeOnboarding = (data) => {
                setStudentProfile({
                    ...studentProfile,
                    ...data,
                    overallProgress: 0,
                    currentStreak: 1,
                    questionsSolved: 0,
                    mockTestsCompleted: 0,
                    averageScore: 0
                });
            };

            const addChatSession = (session) => {
                setChatSessions([session, ...chatSessions]);
            };

            const markNotificationRead = (id) => {
                setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
            };

            const generateStudyPlan = () => {
                const examSubjects = selectedExam && MOCK_DATA.subjects[selectedExam] ? MOCK_DATA.subjects[selectedExam].map(s => s.name) : ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];
                const plan = {
                    id: generateId(),
                    title: `${getExamName(selectedExam)} Study Plan`,
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                    items: Array.from({ length: 7 }, (_, i) => ({
                        id: generateId(),
                        day: i + 1,
                        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
                        items: [
                            { subject: examSubjects[0] || 'Subject 1', topic: 'Chapter 1 Concepts', activity: 'Study concepts', duration: 45, completed: false },
                            { subject: examSubjects[1] || 'Subject 2', topic: 'Chapter 2 Practice', activity: 'Practice questions', duration: 30, completed: false },
                            { subject: examSubjects[2] || 'Subject 3', topic: 'Chapter 3 Video', activity: 'Watch video lecture', duration: 30, completed: false },
                            { subject: examSubjects[3] || 'Subject 4', topic: 'Chapter 4 Problems', activity: 'Solve problems', duration: 45, completed: false },
                        ]
                    }))
                };
                setStudyPlan(plan);
                return plan;
            };

            const submitQuizAttempt = (quizId, attempt) => {
                setQuizHistory([...quizHistory, { ...attempt, id: generateId(), quizId, date: new Date().toISOString() }]);
                // Update profile
                if (studentProfile) {
                    setStudentProfile({
                        ...studentProfile,
                        questionsSolved: studentProfile.questionsSolved + attempt.answers.length,
                        averageScore: Math.round((studentProfile.averageScore * studentProfile.questionsSolved + attempt.score * attempt.answers.length) / (studentProfile.questionsSolved + attempt.answers.length))
                    });
                }
            };

            const submitMockTest = (testId, attempt) => {
                setMockTestHistory([...mockTestHistory, { ...attempt, id: generateId(), testId, date: new Date().toISOString() }]);
                if (studentProfile) {
                    setStudentProfile({
                        ...studentProfile,
                        mockTestsCompleted: studentProfile.mockTestsCompleted + 1,
                        averageScore: Math.round((studentProfile.averageScore * (studentProfile.mockTestsCompleted * 65) + attempt.score) / ((studentProfile.mockTestsCompleted + 1) * 65))
                    });
                }
            };

            const [users, setUsersState] = useState(() => {
                const saved = localStorage.getItem('ai_users');
                return saved ? JSON.parse(saved) : MOCK_DATA.users || [];
            });

            const setUsers = (newUsers) => {
                setUsersState(newUsers);
                localStorage.setItem('ai_users', JSON.stringify(newUsers));
            };

            const [questions, setQuestionsState] = useState(() => {
                const saved = localStorage.getItem('ai_questions');
                return saved ? JSON.parse(saved) : MOCK_DATA.questions || [];
            });

            const setQuestions = (newQuestions) => {
                setQuestionsState(newQuestions);
                localStorage.setItem('ai_questions', JSON.stringify(newQuestions));
            };

            const [apiKeys, setApiKeysState] = useState(() => {
                const saved = localStorage.getItem('ai_api_keys');
                return saved ? JSON.parse(saved) : { 
                    gemini: '', 
                    groq: '' 
                };
            });

            const setApiKeys = (keys) => {
                setApiKeysState(keys);
                localStorage.setItem('ai_api_keys', JSON.stringify(keys));
            };

            const value = {
                user, role, selectedExam, studentProfile, chatSessions, currentChat, notifications,
                studyPlan, quizHistory, mockTestHistory, darkMode, sidebarOpen, mobileMenuOpen, apiKeys,
                users, setUsers, questions, setQuestions,
                setUser, setRole, setSelectedExam, setStudentProfile, setChatSessions, setCurrentChat,
                setNotifications, setStudyPlan, setQuizHistory, setMockTestHistory, setDarkMode,
                setSidebarOpen, setMobileMenuOpen, setApiKeys,
                login, register, logout, switchRole, selectExam, completeOnboarding, addChatSession,
                markNotificationRead, generateStudyPlan, submitQuizAttempt, submitMockTest
            };

            return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
        };

        const useApp = () => useContext(AppContext);
export { AppProvider, useApp, AppContext, getExamName };
