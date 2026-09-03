import { NextRequest, NextResponse } from "next/server";
import { CoursesStore } from "@/lib/courses-store";
import { SchedulesStore } from "@/lib/schedules-store";
import { LeadsStore } from "@/lib/leads-store";
import { MediaStore } from "@/lib/media-store";
import { AdminUsersStore } from "@/lib/admin-users-store";
import { BLOG_POSTS } from "@/data/blogData";
import { authorizeAdminRequest } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req);
    if (!auth.authorized) return auth.response;

    const courses = CoursesStore.getCourses();
    const batches = SchedulesStore.getBatches();
    const leads = LeadsStore.getLeads(false);
    const users = AdminUsersStore.getUsers();
    const storageBytes = MediaStore.getTotalStorageBytes();

    const pendingLeads = leads.filter((l) => l.status === "NEW").length;
    const openingBatches = batches.filter((b) => b.status === "OPENING").length;

    return NextResponse.json({
      success: true,
      lastUpdatedAt: new Date().toISOString(),
      data: {
        coursesActive: courses.length,
        batchesOpening: openingBatches,
        batchesTotal: batches.length,
        leadsTotal: leads.length,
        leadsPending: pendingLeads,
        postsCount: BLOG_POSTS.length,
        storageBytes,
        storageFormatted: MediaStore.formatBytes(storageBytes),
        usersActive: users.filter((u) => u.isActive).length,
        systemStatus: "OPTIMAL",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
