using PronaFlow.Core.DTOs.Tag;

namespace PronaFlow.Core.Interfaces;

public interface ITagService
{
    Task<IEnumerable<TagDto>> GetTagsForWorkspaceAsync(long workspaceId, long userId);
    Task<TagDto> CreateTagAsync(long workspaceId, TagCreateDto dto, long userId);
    Task<bool> DeleteTagAsync(long tagId, long userId);
    Task<bool> AssignTagsToProjectAsync(long projectId, List<long> tagIds, long userId);
}