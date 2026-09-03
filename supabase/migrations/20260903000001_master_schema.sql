-- ====================================================================
-- MIGRATION: 20260903000001_master_schema.sql
-- DESCRIPTION: Master Database Architecture for Tin Hoc Gen Z
-- DOMAINS: Auth, Courses, Classes, CRM, Media, CMS, AI Engine, Certificates, Audit
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DOMAIN 1: TÀI KHOẢN VÀ PHÂN QUYỀN (AUTH & RBAC)

-- 2.1. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(45),
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    lock_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 2.2. roles
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3. permissions
CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4. role_permissions
CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (role_id, permission_id)
);

-- 2.5. user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    assigned_by UUID REFERENCES public.profiles(id),
    PRIMARY KEY (user_id, role_id)
);

-- 2.6. user_sessions
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_token_hash VARCHAR(128) UNIQUE NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    revoked_reason VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.7. login_attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    is_successful BOOLEAN NOT NULL DEFAULT false,
    failure_reason VARCHAR(150),
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. DOMAIN 2: KHÓA HỌC VÀ LỚP HỌC (COURSES & CLASSES)

-- 3.1. course_categories
CREATE TABLE IF NOT EXISTS public.course_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3.2. courses
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.course_categories(id) ON DELETE RESTRICT,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    detailed_content TEXT,
    objectives TEXT[],
    learning_outcomes TEXT[],
    original_price BIGINT NOT NULL DEFAULT 0 CHECK (original_price >= 0),
    sale_price BIGINT NOT NULL DEFAULT 0 CHECK (sale_price >= 0),
    currency VARCHAR(10) NOT NULL DEFAULT 'VND',
    total_sessions INT NOT NULL DEFAULT 1 CHECK (total_sessions > 0),
    duration_hours NUMERIC(5,2) NOT NULL DEFAULT 0,
    thumbnail_url TEXT,
    exam_standard VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_by UUID REFERENCES public.profiles(id),
    updated_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3.3. course_versions
CREATE TABLE IF NOT EXISTS public.course_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    version_number VARCHAR(20) NOT NULL,
    changelog TEXT,
    content_snapshot JSONB NOT NULL,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.4. course_modules
CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3.5. course_lessons
CREATE TABLE IF NOT EXISTS public.course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3.6. class_batches
CREATE TABLE IF NOT EXISTS public.class_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    batch_code VARCHAR(60) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    mode VARCHAR(20) NOT NULL DEFAULT 'ONLINE' CHECK (mode IN ('ONLINE', 'OFFLINE', 'HYBRID')),
    max_slots INT NOT NULL DEFAULT 20 CHECK (max_slots > 0),
    reserved_slots INT NOT NULL DEFAULT 0 CHECK (reserved_slots >= 0),
    enrolled_slots INT NOT NULL DEFAULT 0 CHECK (enrolled_slots >= 0),
    start_date DATE NOT NULL,
    end_date DATE,
    room_or_meeting_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'OPENING' CHECK (status IN ('OPENING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3.7. class_schedules
CREATE TABLE IF NOT EXISTS public.class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.class_batches(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.8. teacher_assignments
CREATE TABLE IF NOT EXISTS public.teacher_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.class_batches(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT true,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.9. enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.class_batches(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    enrollment_status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED' CHECK (enrollment_status IN ('PENDING', 'ENROLLED', 'COMPLETED', 'DROPPED')),
    paid_amount BIGINT NOT NULL DEFAULT 0,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    UNIQUE (batch_id, student_id)
);

-- 3.10. attendance_records
CREATE TABLE IF NOT EXISTS public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.class_batches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_number INT NOT NULL,
    attendance_status VARCHAR(20) NOT NULL DEFAULT 'PRESENT' CHECK (attendance_status IN ('PRESENT', 'ABSENT', 'EXCUSED')),
    recorded_by UUID REFERENCES public.profiles(id),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.11. grade_records
CREATE TABLE IF NOT EXISTS public.grade_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.class_batches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_title VARCHAR(150) NOT NULL,
    score NUMERIC(6,2) NOT NULL CHECK (score >= 0),
    max_score NUMERIC(6,2) NOT NULL DEFAULT 1000 CHECK (max_score > 0),
    notes TEXT,
    graded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. DOMAIN 3: CRM TIẾP NHẬN HỌC VIÊN (LEADS PIPELINE)

-- 4.1. lead_sources
CREATE TABLE IF NOT EXISTS public.lead_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.2. leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    course_interest VARCHAR(150),
    university_or_workplace VARCHAR(200),
    status VARCHAR(30) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTING', 'CONSULTED', 'RESERVED', 'PAID', 'ENROLLED', 'LOST')),
    source_id UUID REFERENCES public.lead_sources(id),
    assigned_to UUID REFERENCES public.profiles(id),
    potential_score INT NOT NULL DEFAULT 3 CHECK (potential_score BETWEEN 1 AND 5),
    notes TEXT,
    lost_reason TEXT,
    next_contact_at TIMESTAMPTZ,
    converted_student_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 4.3. lead_activities
CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.profiles(id),
    activity_type VARCHAR(30) NOT NULL CHECK (activity_type IN ('CALL', 'ZALO', 'EMAIL', 'NOTE', 'STATUS_CHANGE')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.4. lead_assignments
CREATE TABLE IF NOT EXISTS public.lead_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES public.profiles(id),
    assigned_by UUID REFERENCES public.profiles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.5. lead_tasks
CREATE TABLE IF NOT EXISTS public.lead_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES public.profiles(id),
    task_title VARCHAR(255) NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4.6. lead_status_history
CREATE TABLE IF NOT EXISTS public.lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    old_status VARCHAR(30) NOT NULL,
    new_status VARCHAR(30) NOT NULL,
    changed_by UUID REFERENCES public.profiles(id),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. DOMAIN 4: NỘI DUNG VÀ TÀI LIỆU (MEDIA & CMS)

-- 5.1. media_files
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storage_path TEXT NOT NULL UNIQUE,
    original_filename VARCHAR(255) NOT NULL,
    sanitized_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes > 0),
    file_hash_sha256 VARCHAR(64) NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT true,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    tags TEXT[],
    uploaded_by UUID REFERENCES public.profiles(id),
    moderation_status VARCHAR(30) NOT NULL DEFAULT 'APPROVED' CHECK (moderation_status IN ('PENDING', 'APPROVED', 'REJECTED', 'QUARANTINED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 5.2. media_permissions
CREATE TABLE IF NOT EXISTS public.media_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_id UUID NOT NULL REFERENCES public.media_files(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES public.class_batches(id) ON DELETE CASCADE,
    role VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5.3. post_categories
CREATE TABLE IF NOT EXISTS public.post_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 5.4. post_tags
CREATE TABLE IF NOT EXISTS public.post_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5.5. posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.post_categories(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'IN_REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED')),
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,
    author_id UUID REFERENCES public.profiles(id),
    reviewed_by UUID REFERENCES public.profiles(id),
    seo_title VARCHAR(255),
    seo_description TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 5.6. post_tag_relations
CREATE TABLE IF NOT EXISTS public.post_tag_relations (
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.post_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 5.7. post_versions
CREATE TABLE IF NOT EXISTS public.post_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    version_num INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    saved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5.8. post_reviews
CREATE TABLE IF NOT EXISTS public.post_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
    review_status VARCHAR(30) NOT NULL CHECK (review_status IN ('APPROVED', 'REQUEST_CHANGES', 'REJECTED')),
    comments TEXT,
    reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. DOMAIN 5: AI CONTENT ENGINE

-- 6.1. ai_sources
CREATE TABLE IF NOT EXISTS public.ai_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    url TEXT NOT NULL,
    feed_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    fetch_frequency_minutes INT NOT NULL DEFAULT 60,
    last_crawled_at TIMESTAMPTZ,
    last_http_status INT,
    consecutive_error_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 6.2. ai_crawl_jobs
CREATE TABLE IF NOT EXISTS public.ai_crawl_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.ai_sources(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')),
    items_found INT NOT NULL DEFAULT 0,
    items_processed INT NOT NULL DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6.3. ai_source_items
CREATE TABLE IF NOT EXISTS public.ai_source_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES public.ai_sources(id) ON DELETE CASCADE,
    original_url TEXT UNIQUE NOT NULL,
    original_title VARCHAR(300) NOT NULL,
    original_content TEXT,
    author VARCHAR(100),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6.4. ai_drafts
CREATE TABLE IF NOT EXISTS public.ai_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_item_id UUID REFERENCES public.ai_source_items(id),
    generated_title VARCHAR(300) NOT NULL,
    generated_content TEXT NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    reliability_score INT NOT NULL DEFAULT 85 CHECK (reliability_score BETWEEN 0 AND 100),
    duplicate_score INT NOT NULL DEFAULT 0 CHECK (duplicate_score BETWEEN 0 AND 100),
    status VARCHAR(30) NOT NULL DEFAULT 'AI_DRAFT' CHECK (status IN ('AI_DRAFT', 'FACT_CHECK', 'HUMAN_REVIEW', 'APPROVED', 'REJECTED')),
    reviewer_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6.5. ai_generation_logs
CREATE TABLE IF NOT EXISTS public.ai_generation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID REFERENCES public.ai_drafts(id) ON DELETE CASCADE,
    prompt_tokens INT NOT NULL DEFAULT 0,
    completion_tokens INT NOT NULL DEFAULT 0,
    total_cost_usd NUMERIC(8,6) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6.6. ai_duplicate_checks
CREATE TABLE IF NOT EXISTS public.ai_duplicate_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID NOT NULL REFERENCES public.ai_drafts(id) ON DELETE CASCADE,
    compared_post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    similarity_percentage NUMERIC(5,2) NOT NULL,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. DOMAIN 6: CHỨNG CHỈ, NHẬT KÝ & AN NINH (CERTIFICATES & AUDIT)

-- 7.1. certificates
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_code VARCHAR(100) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    exam_title VARCHAR(150) NOT NULL,
    score INT NOT NULL CHECK (score >= 0),
    max_score INT NOT NULL DEFAULT 1000,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    verification_hash VARCHAR(64) NOT NULL UNIQUE,
    issuer_name VARCHAR(150) NOT NULL DEFAULT 'Ban Khảo Thí Tin Học Gen Z',
    status VARCHAR(30) NOT NULL DEFAULT 'VALID' CHECK (status IN ('VALID', 'REVOKED', 'EXPIRED')),
    issued_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 7.2. certificate_verifications
CREATE TABLE IF NOT EXISTS public.certificate_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
    verifier_ip VARCHAR(45) NOT NULL,
    user_agent TEXT,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7.3. certificate_revocations
CREATE TABLE IF NOT EXISTS public.certificate_revocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
    revoked_by UUID NOT NULL REFERENCES public.profiles(id),
    reason TEXT NOT NULL,
    revoked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7.4. audit_events (APPEND-ONLY)
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(64) UNIQUE NOT NULL,
    actor_id UUID REFERENCES public.profiles(id),
    actor_username VARCHAR(64) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(60) NOT NULL,
    resource_type VARCHAR(60) NOT NULL,
    resource_id VARCHAR(150),
    before_state JSONB,
    after_state JSONB,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    severity VARCHAR(20) NOT NULL DEFAULT 'INFO' CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
    timestamp_utc TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7.5. security_alerts
CREATE TABLE IF NOT EXISTS public.security_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_type VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    source_ip VARCHAR(45),
    target_user_id UUID REFERENCES public.profiles(id),
    severity VARCHAR(20) NOT NULL DEFAULT 'WARNING' CHECK (severity IN ('LOW', 'WARNING', 'CRITICAL')),
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    resolved_by UUID REFERENCES public.profiles(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_class_batches_code ON public.class_batches(batch_code);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_hash ON public.certificates(verification_hash);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON public.audit_events(timestamp_utc DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON public.audit_events(actor_username);
CREATE INDEX IF NOT EXISTS idx_audit_action ON public.audit_events(action);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- Bật RLS trên toàn bộ các bảng nhạy cảm

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grade_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- 9.1. Policy: Profiles
CREATE POLICY "Profiles are viewable by self and admins"
ON public.profiles FOR SELECT
USING (auth.uid() = auth_user_id OR auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- 9.2. Policy: Courses (Public can view published, admins can manage all)
CREATE POLICY "Public can view published courses"
ON public.courses FOR SELECT
USING (status = 'PUBLISHED' AND deleted_at IS NULL);

CREATE POLICY "Admins full management on courses"
ON public.courses FOR ALL
USING (auth.jwt() ->> 'role' IN ('academic', 'admin', 'super_admin'));

-- 9.3. Policy: Leads (Only staff can view and manage leads)
CREATE POLICY "Staff only access to leads"
ON public.leads FOR ALL
USING (auth.jwt() ->> 'role' IN ('academic', 'admin', 'super_admin'));

-- 9.4. Policy: Certificates (Public can verify with code, only academic/admin can issue)
CREATE POLICY "Public can read valid certificates"
ON public.certificates FOR SELECT
USING (status = 'VALID' AND deleted_at IS NULL);

CREATE POLICY "Admins can manage certificates"
ON public.certificates FOR ALL
USING (auth.jwt() ->> 'role' IN ('academic', 'admin', 'super_admin'));

-- 9.5. Policy: Audit Events (Read-only for Admins, NO UPDATE, NO DELETE)
CREATE POLICY "Admins can view audit events"
ON public.audit_events FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));
