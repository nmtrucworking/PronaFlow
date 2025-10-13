using PronaFlow.Core.DTOs.Comment;

namespace PronaFlow.Core.Interfaces;

public interface ICommentService
{
    Task<IEnumerable<CommentDto>> GetCommentsForTargetAsync(string commentableType, long commentableId, long userId);
    Task<CommentDto> CreateCommentAsync(string commentableType, long commentableId, CommentCreateDto dto, long userId);
    Task<bool> DeleteCommentAsync(long commentId, long userId);
}