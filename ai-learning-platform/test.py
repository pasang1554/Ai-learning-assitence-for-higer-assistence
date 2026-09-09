import re
with open('../ai-learning-app.html', 'r') as f:
    content = f.read()
babel_match = re.search(r'<script type="text/babel">(.*?)</script>', content, re.DOTALL)
code = babel_match.group(1)
sections = re.split(r'// ==================== (.*?) ====================', code)
parsed_sections = {}
for i in range(1, len(sections), 2):
    title = sections[i].strip()
    print(title)
