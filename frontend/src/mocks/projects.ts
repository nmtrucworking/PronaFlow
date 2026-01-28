import type { ProjectEntity } from "../types/project";



// MOCK DATA (Giả lập phản hồi từ API /projects)
export const MOCK_PROJECTS: ProjectEntity[] = [
  {
    id: "1",
    name: "Website Redesign 2024",
    key: "WEB-24",
    description: "Nâng cấp giao diện người dùng và cải thiện trải nghiệm UX cho trang chủ.",
    priority: "CRITICAL",
    status: "PLANNING",
    progress: 65,
    start_date: "2024-01-10",
    end_date: "2024-03-15",
    manager: { id: "u1", name: "An Nguyen", avatar_url: "/defaults/avatars/creater-1.jpg" },
    members: [
        { id: "u2", name: "Binh Tran", avatar_url: "/defaults/avatars/avatar-2.png" },
        { id: "u3", name: "Chi Le", avatar_url: "/defaults/avatars/avatar-3.png" }
    ],
    tags: ["Design", "Frontend"],
    thumbnail_url: "/previews/dashboard-page.png",
    type: "WATERFALL"
  },
  {
    id: "2",
    name: "Mobile App Development",
    key: "MOB-01",
    description: "Phát triển ứng dụng iOS và Android sử dụng React Native.",
    priority: "HIGH",
    status: "PLANNING",
    progress: 10,
    start_date: "2024-02-01",
    end_date: "2024-06-30",
    manager: { id: "u2", name: "Binh Tran", avatar_url: "/defaults/avatars/avatar-2.png" },
    members: [
        { id: "u1", name: "An Nguyen", avatar_url: "/defaults/avatars/creater-1.jpg" }
    ],
    tags: ["Mobile", "React Native"],
    type: "AGILE"
  },
  {
    id: "3",
    name: "Backend API Migration",
    key: "API-03",
    description: "Chuyển đổi hệ thống Legacy sang Microservices.",
    priority: "MEDIUM",
    status: "ON_HOLD",
    progress: 45,
    start_date: "2023-11-01",
    end_date: "2024-04-01",
    manager: { id: "u3", name: "Chi Le", avatar_url: "/defaults/avatars/avatar-3.png" },
    members: [],
    tags: ["Backend", "DevOps"],
    type: "WATERFALL"
  },
  {
    id: "4",
    name: "Internal Audit Q1",
    key: "AUD-Q1",
    description: "Kiểm toán quy trình nội bộ quý 1.",
    priority: "LOW",
    status: "COMPLETED",
    progress: 100,
    start_date: "2024-01-01",
    end_date: "2024-01-31",
    manager: { id: "u1", name: "An Nguyen", avatar_url: "/defaults/avatars/creater-1.jpg" },
    members: [],
    tags: ["Compliance"],
    type: "AGILE"
  }
];