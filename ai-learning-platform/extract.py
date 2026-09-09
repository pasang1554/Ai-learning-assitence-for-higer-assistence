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

# Write mock data
with open('src/data/mockData.js', 'w') as f:
    f.write("export const generateId = () => Math.random().toString(36).substr(2, 9);\n\n")
    f.write(parsed_sections['MOCK DATA'])
    f.write("\nexport default MOCK_DATA;\n")

# Write AppContext
with open('src/context/AppContext.jsx', 'w') as f:
    f.write('''import React, { createContext, useContext, useState, useEffect } from 'react';
import MOCK_DATA, { generateId } from '../data/mockData';

const getExamName = (slug) => MOCK_DATA.exams.find(e => e.slug === slug)?.name || slug;

''')
    f.write(parsed_sections['STATE MANAGEMENT'])
    f.write("\nexport { AppProvider, useApp, AppContext, getExamName };\n")

# Write UI Components
with open('src/components/ui/index.jsx', 'w') as f:
    f.write('''import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icons = LucideIcons;
''')
    f.write(parsed_sections['UI COMPONENTS'])
    f.write("\nexport { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal };\n")

print("Done generating!")
