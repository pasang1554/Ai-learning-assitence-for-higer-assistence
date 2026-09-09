import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage, LoginPage, RegisterPage, OnboardingPage } from './components/shared';
import * as StudentPages from './components/student';
import * as AdminPages from './components/admin';
import { FacultyDashboard } from './components/faculty';

const AppContent = () => {
    const { user, role } = useApp();
    const [page, setPage] = useState('landing');

    useEffect(() => {
        if (!user) setPage('landing');
        else if (user.role === 'ADMIN') setPage('admin-dashboard');
        else if (user.role === 'STUDENT') setPage('student-dashboard');
        else if (user.role === 'FACULTY') setPage('faculty-dashboard');
    }, [user]);

    // Same routing logic from old App
    if (!user) {
        if (page === 'login') return <LoginPage onNavigate={setPage} />;
        if (page === 'register') return <RegisterPage onNavigate={setPage} />;
        return <LandingPage onNavigate={setPage} />;
    }

    if (page === 'onboarding') return <OnboardingPage onNavigate={setPage} />;

    if (role === 'FACULTY') {
        return <FacultyDashboard />;
    }

    if (role === 'STUDENT') {
        const StudentLayout = StudentPages.StudentLayout;
        const pageMap = {
            'student-dashboard': <StudentPages.StudentDashboard onNavigate={setPage} />,
            'my-exam': <StudentPages.ExamInfoPage onNavigate={setPage} />,
            'courses': <StudentPages.CoursesPage />,
            'materials': <StudentPages.StudentMaterialsPage />,
            'ai-tutor': <StudentPages.AITutorPage />,
            'practice': <StudentPages.PracticePage onNavigate={setPage} />,
            'pyqs': <StudentPages.PYQsPage />,
            'mock-tests': <StudentPages.MockTestsPage onNavigate={setPage} />,
            'study-plan': <StudentPages.StudyPlanPage />,
            'progress': <StudentPages.ProgressPage />,
            'notifications': <StudentPages.NotificationsPage />,
            'profile': <StudentPages.ProfilePage onNavigate={setPage} />,
        };
        const content = pageMap[page] || <StudentPages.StudentDashboard onNavigate={setPage} />;
        return <StudentLayout onNavigate={setPage} activePage={page}>{content}</StudentLayout>;
    }

    if (role === 'ADMIN') {
        const AdminLayout = AdminPages.AdminLayout;
        const pageMap = {
            'admin-dashboard': <AdminPages.AdminDashboard />,
            'admin-exams': <AdminPages.AdminExams />,
            'admin-courses': <AdminPages.AdminCourses />,
            'admin-materials': <AdminPages.AdminMaterials />,
            'admin-questions': <AdminPages.AdminQuestions />,
            'admin-mock-tests': <AdminPages.AdminMockTests />,
            'admin-students': <AdminPages.AdminStudents />,
            'admin-ai-kb': <AdminPages.AdminAIKB />,
            'admin-analytics': <AdminPages.AdminAnalytics />,
            'admin-announcements': <AdminPages.AdminAnnouncements />,
        };
        const content = pageMap[page] || <AdminPages.AdminDashboard />;
        return <AdminLayout onNavigate={setPage} activePage={page}>{content}</AdminLayout>;
    }

    return <div className="p-4 text-center">Loading...</div>;
};

const App = () => (
    <AppProvider>
        <AppContent />
    </AppProvider>
);

export default App;
