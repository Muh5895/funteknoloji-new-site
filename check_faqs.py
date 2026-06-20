import re

def check():
    with open('src/lib/i18n.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    langs = ["tr", "en", "de", "fr", "es", "az", "ru", "ar", "it", "pt", "ja", "zh"]
    faq_keys = [f"faq.q{i}.q" for i in range(1, 12)] + [f"faq.q{i}.a" for i in range(1, 12)]
    home_faq_keys = [f"home.faq.q{i}" for i in range(1, 8)] + [f"home.faq.a{i}" for i in range(1, 8)]
    all_keys = faq_keys + home_faq_keys

    for lang in langs:
        # Extract the dictionary for each language using a more robust regex
        start_marker = f"const {lang}: Dict = {{"
        start_idx = content.find(start_marker)
        if start_idx == -1:
            print(f"MISSING DICT: {lang}")
            continue

        # Find closing brace of the dictionary
        brace_count = 0
        end_idx = -1
        for i in range(start_idx + len(start_marker) - 1, len(content)):
            if content[i] == '{': brace_count += 1
            if content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i
                    break

        dict_text = content[start_idx:end_idx+1]
        missing = [k for k in all_keys if f'"{k}":' not in dict_text]
        if missing:
            print(f"LANG {lang} MISSING KEYS ({len(missing)}): {missing[:5]}...")
        else:
            print(f"LANG {lang}: ALL {len(all_keys)} KEYS PRESENT")

check()
