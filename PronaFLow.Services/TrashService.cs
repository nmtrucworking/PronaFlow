using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Trash;
using PronaFlow.Core.Interfaces;
using System.Security;

namespace PronaFlow.Services;

public class TrashService : ITrashService
{
    private readonly PronaFlowDbContext _context;

    public TrashService(PronaFlowDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TrashItemDto>> GetTrashedItemsAsync(long userId)
    {
        // Lấy các project đã bị xóa mà người dùng là thành viên
        var trashedProjects = await _context.Projects
            .Where(p => p.IsDeleted == true && p.ProjectMembers.Any(pm => pm.UserId == userId))
            .Select(p => new TrashItemDto
            {
                Id = p.Id,
                Name = p.Name,
                ItemType = "Project",
                DeletedAt = p.DeletedAt
            })
            .ToListAsync();

        // Lấy các task đã bị xóa thuộc các project mà người dùng là thành viên
        var trashedTasks = await _context.Tasks
            .Where(t => t.IsDeleted == true && t.Project.ProjectMembers.Any(pm => pm.UserId == userId))
            .Select(t => new TrashItemDto
            {
                Id = t.Id,
                Name = t.Name,
                ItemType = "Task",
                DeletedAt = t.DeletedAt
            })
            .ToListAsync();

        // Gộp và sắp xếp theo ngày xóa gần nhất
        return trashedProjects.Concat(trashedTasks).OrderByDescending(item => item.DeletedAt);
    }

    public async Task<bool> RestoreItemAsync(string itemType, long itemId, long userId)
    {
        if (itemType.Equals("Project", StringComparison.OrdinalIgnoreCase))
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == itemId && p.ProjectMembers.Any(pm => pm.UserId == userId));
            if (project == null) throw new KeyNotFoundException("Project not found or permission denied.");

            project.IsDeleted = false;
            project.DeletedAt = null;
        }
        else if (itemType.Equals("Task", StringComparison.OrdinalIgnoreCase))
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == itemId && t.Project.ProjectMembers.Any(pm => pm.UserId == userId));
            if (task == null) throw new KeyNotFoundException("Task not found or permission denied.");

            task.IsDeleted = false;
            task.DeletedAt = null;
        }
        else
        {
            throw new ArgumentException("Invalid item type.");
        }

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> PermanentlyDeleteItemAsync(string itemType, long itemId, long userId)
    {
        if (itemType.Equals("Project", StringComparison.OrdinalIgnoreCase))
        {
            var project = await _context.Projects
                .Include(p => p.ProjectMembers)
                .FirstOrDefaultAsync(p => p.Id == itemId);
            if (project == null) return false;

            // Chỉ admin của dự án mới có quyền xóa vĩnh viễn
            if (!project.ProjectMembers.Any(pm => pm.UserId == userId && pm.Role == "admin"))
            {
                throw new SecurityException("Permission denied to permanently delete this project.");
            }
            _context.Projects.Remove(project); // Xóa cứng
        }
        // Logic tương tự cho Task...
        else
        {
            throw new ArgumentException("Invalid item type.");
        }

        return await _context.SaveChangesAsync() > 0;
    }
}