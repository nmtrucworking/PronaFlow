import React, { useState, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog'; // Using generic dialog logic but customized
import { 
  Bell, 
  Check, 
  Clock, 
  Filter, 
  Inbox, 
  MessageSquare, 
  MoreVertical, 
  Search, 
  Archive, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  AtSign,
  Briefcase,
  Trash2,
  Calendar,
  Eye,
  FileText,
  Image as ImageIcon,
  Download,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES (Based on Module 7 Entities) ---

type NotificationPriority = 'HIGH' | 'MEDIUM' | 'LOW';
type NotificationType = 'TASK_ASSIGNED' | 'MENTION' | 'DUE_SOON' | 'SYSTEM_ALERT' | 'COMMENT_REPLY';

interface UserEntity {
  user_id: string;
  username: string;
  avatar_url: string;
}

interface Attachment {
  id: string;
  name: string;
  type: 'IMAGE' | 'FILE';
  url: string;
  size: string;
}

interface NotificationEntity {
  notification_id: string;
  user_id: string; // Receiver
  event_id: string;
  title: string;
  content: string; // Rendered HTML/Text
  priority: NotificationPriority;
  is_read: boolean;
  expires_at?: string;
  created_at: string;
  actor?: UserEntity;
  type: NotificationType;
  metadata?: {
    project_name?: string;
    task_key?: string;
    task_id?: string;
  };
  attachments?: Attachment[]; // New field for Preview feature
}

// --- MOCK DATA ---
const CURRENT_USER_ID = "u1";

const MOCK_NOTIFICATIONS: NotificationEntity[] = [
  {
    notification_id: "n1",
    user_id: CURRENT_USER_ID,
    event_id: "e1",
    title: "Cập nhật thiết kế: Dashboard V2",
    content: "Nguyễn Văn A đã tải lên phiên bản mới cho màn hình Dashboard. Vui lòng review layout.",
    priority: "HIGH",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    type: "TASK_ASSIGNED",
    actor: { user_id: "u2", username: "Nguyễn Văn A", avatar_url: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff" },
    metadata: { project_name: "PronaFlow Core", task_key: "PRO-102" },
    attachments: [
      { id: "a1", name: "Dashboard_v2_Final.png", type: "IMAGE", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", size: "2.4 MB" },
      { id: "a2", name: "Design_Specs.pdf", type: "FILE", url: "#", size: "1.2 MB" }
    ]
  },
  {
    notification_id: "n2",
    user_id: CURRENT_USER_ID,
    event_id: "e2",
    title: "Nhắc đến bạn trong bình luận",
    content: "Hi @Truc, phần này chúng ta nên dùng Radix UI hay Headless UI?",
    priority: "MEDIUM",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: "MENTION",
    actor: { user_id: "u3", username: "Trần Thị B", avatar_url: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=E11D48&color=fff" },
    metadata: { project_name: "Design System", task_key: "DS-45" }
  },
  {
    notification_id: "n3",
    user_id: CURRENT_USER_ID,
    event_id: "e3",
    title: "Sắp đến hạn: Báo cáo tuần",
    content: "Task này sẽ hết hạn trong 4 giờ nữa.",
    priority: "HIGH",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    type: "DUE_SOON",
    metadata: { project_name: "Internal Ops", task_key: "OPS-01" }
  },
  {
    notification_id: "n4",
    user_id: CURRENT_USER_ID,
    event_id: "e4",
    title: "Hệ thống bảo trì",
    content: "Hệ thống sẽ bảo trì định kỳ vào 22:00 tối nay.",
    priority: "LOW",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "SYSTEM_ALERT"
  }
];

// --- HELPER COMPONENTS ---

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case 'MENTION': return <div className="p-2 bg-purple-100 text-purple-600 rounded-full"><AtSign className="w-4 h-4" /></div>;
    case 'TASK_ASSIGNED': return <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Briefcase className="w-4 h-4" /></div>;
    case 'DUE_SOON': return <div className="p-2 bg-red-100 text-red-600 rounded-full"><Clock className="w-4 h-4" /></div>;
    case 'COMMENT_REPLY': return <div className="p-2 bg-green-100 text-green-600 rounded-full"><MessageSquare className="w-4 h-4" /></div>;
    default: return <div className="p-2 bg-slate-100 text-slate-600 rounded-full"><Bell className="w-4 h-4" /></div>;
  }
};

const RelativeTime = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let timeText = '';
  if (diffInSeconds < 60) timeText = 'Vừa xong';
  else if (diffInSeconds < 3600) timeText = `${Math.floor(diffInSeconds / 60)} phút trước`;
  else if (diffInSeconds < 86400) timeText = `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  else timeText = `${Math.floor(diffInSeconds / 86400)} ngày trước`;

  return <span className="text-xs text-slate-400 whitespace-nowrap">{timeText}</span>;
};

// --- PREVIEW MODAL COMPONENT ---

const PreviewModal = ({ attachment, onClose }: { attachment: Attachment | null, onClose: () => void }) => {
  if (!attachment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-transparent flex flex-col animate-in zoom-in-95 duration-200 pointer-events-none">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-md rounded-t-xl border border-white/20 pointer-events-auto">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg">
              {attachment.type === 'IMAGE' ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{attachment.name}</h3>
              <p className="text-xs text-white/70">{attachment.size} • {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Tải xuống">
              <Download className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 text-white/70 hover:text-white hover:bg-red-500/80 rounded-full transition-colors" title="Đóng">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-900/50 flex items-center justify-center overflow-hidden rounded-b-xl border-x border-b border-white/20 pointer-events-auto relative">
          {attachment.type === 'IMAGE' ? (
            <img src={attachment.url} alt={attachment.name} className="max-w-full max-h-full object-contain shadow-2xl" />
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <FileText className="w-24 h-24 text-slate-400 mb-4" />
              <p className="text-lg font-medium">Không thể xem trước định dạng này</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                Tải xuống để xem
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENTS ---

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center animate-in fade-in duration-500">
    <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
      <Inbox className="w-16 h-16 text-indigo-200" />
    </div>
    <h3 className="text-lg font-semibold text-slate-700">Tuyệt vời! Inbox Zero</h3>
    <p className="text-sm mt-2 max-w-xs">Bạn đã đọc hết tất cả thông báo. Hãy tận hưởng khoảng thời gian tập trung này.</p>
  </div>
);

const NotificationDetail = ({ 
  notification, 
  onPreview 
}: { 
  notification: NotificationEntity | null, 
  onPreview: (att: Attachment) => void 
}) => {
  if (!notification) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50 border-l border-slate-200">
        <div className="text-center text-slate-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Chọn một thông báo để xem chi tiết</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden animate-in slide-in-from-right-4 duration-300">
      {/* Detail Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {notification.metadata?.project_name && (
              <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                {notification.metadata.project_name}
              </span>
            )}
            {notification.metadata?.task_key && (
              <span className="text-xs font-mono text-slate-400">
                #{notification.metadata.task_key}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{notification.title}</h2>
        </div>
        <div className="flex gap-2">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <Archive className="w-5 h-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className="px-2 py-1 bg-slate-800 text-white text-xs rounded">Lưu trữ</Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>

      {/* Detail Content */}
      <ScrollArea.Root className="flex-1 w-full overflow-hidden bg-slate-50/30">
        <ScrollArea.Viewport className="w-full h-full p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Sender Info */}
            <div className="flex items-center gap-4">
              {notification.actor ? (
                <img src={notification.actor.avatar_url} alt="avatar" className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" />
              ) : (
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">P</div>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">{notification.actor?.username || 'PronaFlow System'}</p>
                <p className="text-xs text-slate-500">{new Date(notification.created_at).toLocaleString('vi-VN')}</p>
              </div>
            </div>

            {/* Main Body */}
            <div className="prose prose-sm prose-slate max-w-none bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-700 leading-relaxed">{notification.content}</p>
              
              {/* Attachments Section */}
              {notification.attachments && notification.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Tệp đính kèm ({notification.attachments.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {notification.attachments.map((att) => (
                      <div key={att.id} className="group flex items-center p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow-sm transition-all bg-slate-50">
                        <div className="w-10 h-10 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                          {att.type === 'IMAGE' ? <ImageIcon className="w-5 h-5 text-purple-500" /> : <FileText className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{att.name}</p>
                          <p className="text-xs text-slate-500">{att.size}</p>
                        </div>
                        <button 
                          onClick={() => onPreview(att)}
                          className="p-2 bg-white rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-slate-100"
                          title="Xem trước"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contextual Action */}
              {notification.type === 'TASK_ASSIGNED' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Task mới cần thực hiện</p>
                      <p className="text-xs text-blue-600">Được gán bởi {notification.actor?.username}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
                    Xem công việc
                  </button>
                </div>
              )}

              {notification.type === 'MENTION' && (
                <div className="mt-4">
                  <textarea 
                    className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Viết phản hồi nhanh..."
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                      Gửi phản hồi
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="flex select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5">
          <ScrollArea.Thumb className="flex-1 bg-slate-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default function InboxPage() {
  const [notifications, setNotifications] = useState<NotificationEntity[]>(MOCK_NOTIFICATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'MENTION'>('ALL');
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (filter === 'UNREAD') return !n.is_read;
      if (filter === 'MENTION') return n.type === 'MENTION';
      return true;
    });
  }, [notifications, filter]);

  const selectedNotification = useMemo(() => 
    notifications.find(n => n.notification_id === selectedId) || null
  , [notifications, selectedId]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.notification_id === id ? { ...n, is_read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    markAsRead(id);
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.notification_id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* LEFT PANE: Notification List (35%) */}
      <div className={`${selectedId ? 'hidden md:flex' : 'flex'} w-full md:w-[400px] flex-col border-r border-slate-200 bg-white z-10 shadow-sm`}>
        
        {/* Header & Filter */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              Hộp thư đến
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {notifications.filter(n => !n.is_read).length}
              </span>
            </h1>
            <div className="flex gap-1">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button onClick={markAllAsRead} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="px-2 py-1 bg-slate-800 text-white text-xs rounded mb-1">Đánh dấu tất cả là đã đọc</Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm thông báo..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <Tabs.Root value={filter} onValueChange={(val) => setFilter(val as any)}>
            <Tabs.List className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {['ALL', 'UNREAD', 'MENTION'].map(tab => (
                <Tabs.Trigger 
                  key={tab} 
                  value={tab}
                  className="flex-1 py-1.5 text-xs font-medium rounded-md text-slate-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
                >
                  {tab === 'ALL' ? 'Tất cả' : tab === 'UNREAD' ? 'Chưa đọc' : 'Đề cập'}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        {/* List Content */}
        <ScrollArea.Root className="flex-1 overflow-hidden bg-slate-50/50">
          <ScrollArea.Viewport className="w-full h-full">
            {filteredNotifications.length === 0 ? <EmptyState /> : (
              <div className="divide-y divide-slate-100">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.notification_id}
                    onClick={() => handleSelect(notification.notification_id)}
                    className={cn(
                      "group relative p-4 cursor-pointer transition-all duration-200 border-l-4 hover:bg-slate-50",
                      selectedId === notification.notification_id ? "bg-indigo-50/50 border-indigo-500" : "bg-white border-transparent",
                      !notification.is_read && selectedId !== notification.notification_id ? "border-l-blue-500 bg-blue-50/10" : ""
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1 relative">
                        <NotificationIcon type={notification.type} />
                        {!notification.is_read && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className={cn("text-sm font-medium truncate pr-2", !notification.is_read ? "text-slate-900 font-bold" : "text-slate-700")}>
                            {notification.title}
                          </p>
                          <RelativeTime dateString={notification.created_at} />
                        </div>
                        
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {notification.content}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          {notification.priority === 'HIGH' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">
                              Urgent
                            </span>
                          )}
                          {notification.attachments && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                              <FileText className="w-3 h-3 mr-1" /> {notification.attachments.length} files
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200 p-1 flex gap-1">
                      <button 
                        onClick={(e) => deleteNotification(notification.notification_id, e)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-colors" 
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded transition-colors" title="Tùy chọn">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className="flex select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5">
            <ScrollArea.Thumb className="flex-1 bg-slate-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      {/* RIGHT PANE: Detail View (65%) */}
      <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 flex-col h-full bg-slate-50 relative`}>
        {/* Mobile Back Button */}
        {selectedId && (
          <div className="md:hidden absolute top-4 left-4 z-20">
            <button 
              onClick={() => setSelectedId(null)}
              className="p-2 bg-white border border-slate-200 rounded-full shadow-lg text-slate-600"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        )}
        
        <NotificationDetail 
          notification={selectedNotification} 
          onPreview={setPreviewAttachment}
        />
      </div>

      {/* GLOBAL MODALS */}
      <PreviewModal 
        attachment={previewAttachment} 
        onClose={() => setPreviewAttachment(null)} 
      />

    </div>
  );
}