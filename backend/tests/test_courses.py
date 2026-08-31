import pytest
from rest_framework.test import APIClient
from apps.courses.models import CourseCategory, Course, Module, Lesson

@pytest.mark.django_db
class TestCourses:
    def test_course_list_and_detail(self):
        cat = CourseCategory.objects.create(name="MOS & IC3", slug="mos-ic3")
        course = Course.objects.create(
            category=cat,
            title="Luyện thi MOS Excel Cấp Tốc",
            slug="luyen-thi-mos-excel-cap-toc",
            price=1200000,
            duration="3 buổi"
        )
        module = Module.objects.create(course=course, order=1, title="Buổi 1: Hàm Cốt Lõi")
        Lesson.objects.create(module=module, order=1, title="Bài 1: XLOOKUP và IF")

        client = APIClient()
        # Test List
        res_list = client.get('/api/v1/courses/')
        assert res_list.status_code == 200
        assert res_list.data['count'] == 1

        # Test Detail
        res_detail = client.get(f'/api/v1/courses/{course.slug}/')
        assert res_detail.status_code == 200
        assert res_detail.data['title'] == "Luyện thi MOS Excel Cấp Tốc"
        assert len(res_detail.data['modules']) == 1
        assert len(res_detail.data['modules'][0]['lessons']) == 1
