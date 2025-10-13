using PronaFlow.Core.DTOs.Trash;

namespace PronaFlow.Core.Interfaces;

public interface ITrashService
{
    Task<IEnumerable<TrashItemDto>> GetTrashedItemsAsync(long userId);
    Task<bool> RestoreItemAsync(string itemType, long itemId, long userId);
    Task<bool> PermanentlyDeleteItemAsync(string itemType, long itemId, long userId);
}