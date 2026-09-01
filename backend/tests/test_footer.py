import pytest
from pathlib import Path

def test_footer_template_exists():
    footer_path = Path(__file__).resolve().parent.parent / "templates" / "components" / "footer.html"
    assert footer_path.exists(), "footer.html template must exist"

def test_footer_critical_links():
    footer_path = Path(__file__).resolve().parent.parent / "templates" / "components" / "footer.html"
    content = footer_path.read_text(encoding="utf-8")

    # Column 2: Courses
    critical_courses = [
        "/mos",
        "/ic3",
        "/excel",
        "/word",
        "/powerpoint",
        "/python",
        "/cntt-co-ban",
        "/khoa-hoc",
    ]
    for course_link in critical_courses:
        assert f'href="{course_link}"' in content, f"Missing course link: {course_link}"

    # Column 3: Resources
    critical_resources = [
        "/thi-thu",
        "/tai-lieu",
        "/blog",
        "/tin-cong-nghe",
        "/bang-gia",
        "/portal/student",
    ]
    for res_link in critical_resources:
        assert f'href="{res_link}"' in content, f"Missing resource link: {res_link}"

    # Bottom bar policies
    critical_policies = [
        "/gioi-thieu#bao-mat",
        "/gioi-thieu#dieu-khoan",
        "/gioi-thieu#hoan-tien",
        "/lien-he",
        "/sitemap.xml",
    ]
    for policy_link in critical_policies:
        assert f'href="{policy_link}"' in content, f"Missing policy link: {policy_link}"

    # Check tel and mailto formats
    assert "tel:" in content, "Missing tel: protocol"
    assert "mailto:" in content, "Missing mailto: protocol"
