import re
import os

with open('../ai-learning-app.html', 'r') as f:
    content = f.read()

babel_match = re.search(r'<script type="text/babel">(.*?)</script>', content, re.DOTALL)
code = babel_match.group(1)
sections = re.split(r'// ==================== (.*?) ====================', code)

parsed_sections = {}
for i in range(1, len(sections), 2):
    title = sections[i].strip()
    body = sections[i+1].strip()
    parsed_sections[title] = body

student_keys = ['STUDENT MATERIALS', 'REACT SECTION', 'STUDENT LAYOUT', 'STUDENT DASHBOARD', 'EXAM INFO PAGE', 'AI TUTOR', 'PRACTICE / QUIZ', 'PYQs', 'MOCK TESTS', 'STUDY PLAN', 'PROGRESS', 'NOTIFICATIONS', 'PROFILE', 'COURSES']
admin_keys = ['ADMIN LAYOUT', 'ADMIN DASHBOARD', 'ADMIN EXAMS', 'ADMIN MATERIALS', 'ADMIN AI KB', 'ADMIN COURSES', 'ADMIN MOCK TESTS', 'ADMIN STUDENTS', 'ADMIN ANALYTICS', 'ADMIN ANNOUNCEMENTS', 'ADMIN QUESTIONS']
shared_keys = ['LANDING PAGE', 'AUTH PAGES', 'ONBOARDING']

header = """import React, { useState, useEffect, useRef } from 'react';
import { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal } from '../ui';
import { useApp, getExamName } from '../../context/AppContext';
import MOCK_DATA, { generateId } from '../../data/mockData';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
"""

# Student
with open('src/components/student/index.jsx', 'w') as f:
    f.write(header)
    for k in student_keys:
        f.write(f"\n// {k}\n{parsed_sections[k]}\n")
    # Custom handling for exports
    exports = [k.title().replace(' ','').replace('/','') for k in student_keys if k != 'PRACTICE / QUIZ']
    exports.append('PracticePage')
    # Special cases from the HTML file code names
    exports = ['StudentMaterialsPage', 'ReactPage', 'StudentLayout', 'StudentDashboard', 'ExamInfoPage', 'AITutorPage', 'PracticePage', 'PYQsPage', 'MockTestsPage', 'StudyPlanPage', 'ProgressPage', 'NotificationsPage', 'ProfilePage', 'CoursesPage']
    f.write(f"\nexport {{ {', '.join(exports)} }};\n")

# Admin
with open('src/components/admin/index.jsx', 'w') as f:
    f.write(header)
    for k in admin_keys:
        f.write(f"\n// {k}\n{parsed_sections[k]}\n")
    
    exports = ['AdminLayout', 'AdminDashboard', 'AdminExams', 'AdminMaterials', 'AdminAIKB', 'AdminCourses', 'AdminMockTests', 'AdminStudents', 'AdminAnalytics', 'AdminAnnouncements', 'AdminQuestions']
    f.write(f"\nexport {{ {', '.join(exports)} }};\n")

# Shared
os.makedirs('src/components/shared', exist_ok=True)
with open('src/components/shared/index.jsx', 'w') as f:
    f.write(header)
    for k in shared_keys:
        f.write(f"\n// {k}\n{parsed_sections[k]}\n")
    f.write("\nexport { LandingPage, LoginPage, RegisterPage, OnboardingPage };\n")

# Faculty
os.makedirs('src/components/faculty', exist_ok=True)
with open('src/components/faculty/index.jsx', 'w') as f:
    f.write('''import React from 'react';
export const FacultyDashboard = () => (
  <div className="p-8 text-center text-gray-500">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Faculty Dashboard</h1>
    <p>This is the new faculty section placeholder.</p>
  </div>
);
''')

print("Done extracting student, admin, and faculty!")
