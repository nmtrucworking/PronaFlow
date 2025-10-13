using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class UserPreference
{
    public long UserId { get; set; }

    public string SettingKey { get; set; } = null!;

    public string SettingValue { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
