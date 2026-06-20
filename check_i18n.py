import re
import sys

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    languages = ["tr", "en", "de", "fr", "es", "az", "ru", "ar", "it", "pt", "ja", "zh"]
    faq_keys = [f"home.faq.q{i}" for i in range(1, 8)] + [f"home.faq.a{i}" for i in range(1, 8)] + [f"faq.q{i}.q" for i in range(1, 12)] + [f"faq.q{i}.a" for i in range(1, 12)]
    other_keys = ["nexy.help_button", "help.popup", "404.title"]

    all_keys = faq_keys + other_keys

    for lang in languages:
        # Find the dictionary for the language
        match = re.search(f"const {lang}: Dict = \\{{(.*?)\\}};", content, re.DOTALL)
        if not match:
            print(f"Language {lang} dictionary not found!")
            continue

        dict_content = match.group(1)
        print(f"--- Checking {lang} ---")
        for key in all_keys:
            if f'"{key}":' not in dict_content:
                print(f"  Missing key: {key}")
            else:
                # Check if it looks untranslated (value same as key or placeholder)
                val_match = re.search(f'"{key}":\\s*"(.*?)"', dict_content)
                if val_match:
                    val = val_match.group(1)
                    if val == key or "home.faq" in val or "faq.q" in val:
                         print(f"  Potentially untranslated: {key} -> {val}")

check_file('src/lib/i18n.tsx')
