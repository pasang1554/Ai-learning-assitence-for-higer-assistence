import re

# Remove 'react' from StudentLayout navItems
with open('src/components/student/index.jsx', 'r') as f:
    content = f.read()

content = re.sub(r"\{ id: 'react', label: 'React', icon: Icons.Cpu \},\n\s*", "", content)

with open('src/components/student/index.jsx', 'w') as f:
    f.write(content)

# Remove 'react' from App.jsx
with open('src/App.jsx', 'r') as f:
    content = f.read()

content = re.sub(r"'react': <StudentPages.ReactPage \/>,\n\s*", "", content)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Removed React page")
