-- ====================================================================
-- ROLLBACK MIGRATION: 20260903000001_rollback_master_schema.sql
-- DESCRIPTION: Safely reverts all 35 tables created in 20260903000001_master_schema.sql
-- ====================================================================

DROP POLICY IF EXISTS "Admins can view audit events" ON public.audit_events;
DROP POLICY IF EXISTS "Admins can manage certificates" ON public.certificates;
DROP POLICY IF EXISTS "Public can read valid certificates" ON public.certificates;
DROP POLICY IF EXISTS "Staff only access to leads" ON public.leads;
DROP POLICY IF EXISTS "Admins full management on courses" ON public.courses;
DROP POLICY IF EXISTS "Public can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Profiles are viewable by self and admins" ON public.profiles;

-- Domain 7: Audit & Security
DROP TABLE IF EXISTS public.security_alerts CASCADE;
DROP TABLE IF EXISTS public.audit_events CASCADE;
DROP TABLE IF EXISTS public.certificate_revocations CASCADE;
DROP TABLE IF EXISTS public.certificate_verifications CASCADE;
DROP TABLE IF EXISTS public.certificates CASCADE;

-- Domain 6: AI Content Engine
DROP TABLE IF EXISTS public.ai_duplicate_checks CASCADE;
DROP TABLE IF EXISTS public.ai_generation_logs CASCADE;
DROP TABLE IF EXISTS public.ai_drafts CASCADE;
DROP TABLE IF EXISTS public.ai_source_items CASCADE;
DROP TABLE IF EXISTS public.ai_crawl_jobs CASCADE;
DROP TABLE IF EXISTS public.ai_sources CASCADE;

-- Domain 5: Media & CMS
DROP TABLE IF EXISTS public.post_reviews CASCADE;
DROP TABLE IF EXISTS public.post_versions CASCADE;
DROP TABLE IF EXISTS public.post_tag_relations CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.post_tags CASCADE;
DROP TABLE IF EXISTS public.post_categories CASCADE;
DROP TABLE IF EXISTS public.media_permissions CASCADE;
DROP TABLE IF EXISTS public.media_files CASCADE;

-- Domain 4: CRM Leads
DROP TABLE IF EXISTS public.lead_status_history CASCADE;
DROP TABLE IF EXISTS public.lead_tasks CASCADE;
DROP TABLE IF EXISTS public.lead_assignments CASCADE;
DROP TABLE IF EXISTS public.lead_activities CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.lead_sources CASCADE;

-- Domain 3: Classes & Courses
DROP TABLE IF EXISTS public.grade_records CASCADE;
DROP TABLE IF EXISTS public.attendance_records CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.teacher_assignments CASCADE;
DROP TABLE IF EXISTS public.class_schedules CASCADE;
DROP TABLE IF EXISTS public.class_batches CASCADE;
DROP TABLE IF EXISTS public.course_lessons CASCADE;
DROP TABLE IF EXISTS public.course_modules CASCADE;
DROP TABLE IF EXISTS public.course_versions CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.course_categories CASCADE;

-- Domain 2: Auth & RBAC
DROP TABLE IF EXISTS public.login_attempts CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.role_permissions CASCADE;
DROP TABLE IF EXISTS public.permissions CASCADE;
DROP TABLE IF EXISTS public.roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
