import re

file_path = "c:/Users/hemar/Downloads/ai-health-companion/src/frontend/src/pages/Chatbot.tsx"

with open(file_path, 'rb') as f:
    content = f.read()

# Decode ignoring errors to remove broken UTF-8 bytes
text = content.decode('utf-8', errors='ignore')

# Remove completely mangled strings (we'll just let typescript complain or we can fix manually next)
# Actually, let's just strip non-ascii
text = text.encode('ascii', errors='ignore').decode('ascii')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("File cleaned and saved.")
