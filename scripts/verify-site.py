#!/usr/bin/env python3
"""REALLY ROOMATES — Automated Static Integrity & Standards Test Suite
Validates file presence, JSON schemas, Netlify headers, and HTML/JS integrity.
"""
import os
import sys
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")

def run_checks():
    errors = []
    print("[1/6] Checking required files...")
    required_files = [
        "netlify.toml",
        ".gitignore",
        ".gitattributes",
        "AGENTS.md",
        "CLAUDE.md",
        "GEMINI.md",
        "site/index.html",
        "site/styles.css",
        "site/app.js",
        "site/audio.js",
        "site/favicon.svg",
        "site/manifest.webmanifest",
        "site/_headers",
        "site/data/housing-resources.json",
        "site/data/checklist-items.json",
        "site/data/devotions.json"
    ]
    for rel in required_files:
        full = os.path.join(ROOT, rel)
        if not os.path.exists(full):
            errors.append(f"Missing required file: {rel}")
        else:
            size = os.path.getsize(full)
            if size == 0:
                errors.append(f"Empty required file: {rel}")

    print("[2/6] Validating JSON datasets...")
    json_files = [
        ("site/data/housing-resources.json", 10),
        ("site/data/checklist-items.json", 5),
        ("site/data/devotions.json", 5)
    ]
    for rel, min_count in json_files:
        full = os.path.join(ROOT, rel)
        if os.path.exists(full):
            try:
                with open(full, "r", encoding="utf-8") as f:
                    data = json.load(f)
                if not isinstance(data, list) or len(data) < min_count:
                    errors.append(f"{rel}: expected at least {min_count} items, found {len(data) if isinstance(data, list) else 'non-list'}")
            except Exception as e:
                errors.append(f"{rel}: JSON decode error: {e}")

    print("[3/6] Inspecting netlify.toml configuration...")
    toml_path = os.path.join(ROOT, "netlify.toml")
    if os.path.exists(toml_path):
        with open(toml_path, "r", encoding="utf-8") as f:
            content = f.read()
        if 'publish = "site"' not in content:
            errors.append("netlify.toml: missing publish = 'site'")
        if "X-Content-Type-Options" not in content:
            errors.append("netlify.toml: missing X-Content-Type-Options header")
        if "X-Frame-Options" not in content:
            errors.append("netlify.toml: missing X-Frame-Options header")
        if "Content-Security-Policy" not in content:
            errors.append("netlify.toml: missing Content-Security-Policy")
        if "/*" not in content or "/index.html" not in content:
            errors.append("netlify.toml: missing SPA redirect")

    print("[4/6] Checking HTML integrity and accessibility...")
    html_path = os.path.join(SITE, "index.html")
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        # Verify branding
        if "REALLY ROOMATES" not in html:
            errors.append("index.html: missing brand name 'REALLY ROOMATES'")
        
        # Verify required tags
        critical_elements = [
            'viewport-fit=cover',
            'class="skip-link"',
            'id="housing-hub"',
            'id="cash-calculator"',
            'id="move-checklist"',
            'id="guitar-sanctuary"',
            'id="tour-modal"',
            'id="resources-grid-container"',
            'id="tasks-list-container"',
            'data-netlify="true"',
            'apple-mobile-web-app-capable',
            'mobile-bottom-bar',
            'mobile-app-drawer'
        ]
        for elem in critical_elements:
            if elem not in html:
                errors.append(f"index.html: missing critical element or attribute: {elem}")

    print("[5/6] Checking CSS standards and reduced motion...")
    css_path = os.path.join(SITE, "styles.css")
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()
        if "@media (prefers-reduced-motion: reduce)" not in css:
            errors.append("styles.css: missing mandatory prefers-reduced-motion media query")
        if "@media print" not in css:
            errors.append("styles.css: missing print media query")

    print("[6/6] Verifying Web Audio engine & App code...")
    audio_path = os.path.join(SITE, "audio.js")
    if os.path.exists(audio_path):
        with open(audio_path, "r", encoding="utf-8") as f:
            js = f.read()
        if "AcousticGuitarEngine" not in js or "AudioContext" not in js:
            errors.append("audio.js: AcousticGuitarEngine or AudioContext missing")

    if errors:
        print("\n❌ Verification FAILED with errors:")
        for err in errors:
            print(f"  • {err}")
        return False
    else:
        print("\n✅ Verification PASSED: All standards, assets, headers, and schemas verified!")
        return True

if __name__ == "__main__":
    success = run_checks()
    sys.exit(0 if success else 1)
