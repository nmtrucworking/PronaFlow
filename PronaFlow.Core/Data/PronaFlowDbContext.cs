using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;


using PronaFlow.Core.Models;

namespace PronaFlow.Core.Data;

public partial class PronaFlowDbContext : DbContext
{
    public PronaFlowDbContext()
    {
    }

    public PronaFlowDbContext(DbContextOptions<PronaFlowDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<Attachment> Attachments { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<NotificationRecipient> NotificationRecipients { get; set; }

    public virtual DbSet<PasswordReset> PasswordResets { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<ProjectMember> ProjectMembers { get; set; }

    public virtual DbSet<Subtask> Subtasks { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<PronaTask> Tasks { get; set; }

    public virtual DbSet<TaskList> TaskLists { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserPreference> UserPreferences { get; set; }

    public virtual DbSet<VwProjectDetail> VwProjectDetails { get; set; }

    public virtual DbSet<VwTaskDetail> VwTaskDetails { get; set; }

    public virtual DbSet<Workspace> Workspaces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Latin1_General_100_CI_AS_SC_UTF8");

        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_activities");

            entity.ToTable("activities");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActionType)
                .HasMaxLength(50)
                .HasColumnName("action_type");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.TargetId).HasColumnName("target_id");
            entity.Property(e => e.TargetType)
                .HasMaxLength(10)
                .HasColumnName("target_type");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Activities)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_activities_users");
        });

        modelBuilder.Entity<Attachment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_attachments");

            entity.ToTable("attachments");

            entity.HasIndex(e => new { e.AttachableId, e.AttachableType }, "idx_attachable");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AttachableId).HasColumnName("attachable_id");
            entity.Property(e => e.AttachableType)
                .HasMaxLength(10)
                .HasColumnName("attachable_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.FileSize).HasColumnName("file_size");
            entity.Property(e => e.FileType)
                .HasMaxLength(100)
                .HasColumnName("file_type");
            entity.Property(e => e.OriginalFilename)
                .HasMaxLength(255)
                .HasColumnName("original_filename");
            entity.Property(e => e.StoragePath)
                .HasMaxLength(512)
                .HasColumnName("storage_path");
            entity.Property(e => e.UploadedByUserId).HasColumnName("uploaded_by_user_id");

            entity.HasOne(d => d.UploadedByUser).WithMany(p => p.Attachments)
                .HasForeignKey(d => d.UploadedByUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_attachments_users");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_comments");

            entity.ToTable("comments");

            entity.HasIndex(e => new { e.CommentableId, e.CommentableType }, "idx_commentable");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommentableId).HasColumnName("commentable_id");
            entity.Property(e => e.CommentableType)
                .HasMaxLength(10)
                .HasColumnName("commentable_type");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_comments_users");
        });

        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_invitations");

            entity.ToTable("invitations");

            entity.HasIndex(e => e.Token, "uq_invitations_token").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.InviteeEmail)
                .HasMaxLength(255)
                .HasColumnName("invitee_email");
            entity.Property(e => e.InviterId).HasColumnName("inviter_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValue("pending")
                .HasColumnName("status");
            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasColumnName("token");

            entity.HasOne(d => d.Inviter).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.InviterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_invitations_users_inviter");

            entity.HasOne(d => d.Project).WithMany(p => p.Invitations)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("fk_invitations_projects");
        });

        modelBuilder.Entity<NotificationRecipient>(entity =>
        {
            entity.HasKey(e => new { e.ActivityId, e.UserId }).HasName("pk_notification_recipients");

            entity.ToTable("notification_recipients");

            entity.Property(e => e.ActivityId).HasColumnName("activity_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.IsRead).HasColumnName("is_read");

            entity.HasOne(d => d.Activity).WithMany(p => p.NotificationRecipients)
                .HasForeignKey(d => d.ActivityId)
                .HasConstraintName("fk_notification_recipients_activities");

            entity.HasOne(d => d.User).WithMany(p => p.NotificationRecipients)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_notification_recipients_users");
        });

        modelBuilder.Entity<PasswordReset>(entity =>
        {
            entity.HasKey(e => e.Token).HasName("pk_password_resets");

            entity.ToTable("password_resets");

            entity.HasIndex(e => e.Email, "idx_password_resets_email");

            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasColumnName("token");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_projects");

            entity.ToTable("projects", tb => tb.HasTrigger("trg_projects_UpdateTimestamp"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CoverImageUrl)
                .HasMaxLength(255)
                .HasColumnName("cover_image_url");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.IsArchived).HasColumnName("is_archived");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.ProjectType)
                .HasMaxLength(10)
                .HasDefaultValue("personal")
                .HasColumnName("project_type");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("temp")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_at");
            entity.Property(e => e.WorkspaceId).HasColumnName("workspace_id");

            entity.HasOne(d => d.Workspace).WithMany(p => p.Projects)
                .HasForeignKey(d => d.WorkspaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_projects_workspaces");

            entity.HasMany(d => d.Tags).WithMany(p => p.Projects)
                .UsingEntity<Dictionary<string, object>>(
                    "ProjectTag",
                    r => r.HasOne<Tag>().WithMany()
                        .HasForeignKey("TagId")
                        .HasConstraintName("fk_project_tags_tags"),
                    l => l.HasOne<Project>().WithMany()
                        .HasForeignKey("ProjectId")
                        .HasConstraintName("fk_project_tags_projects"),
                    j =>
                    {
                        j.HasKey("ProjectId", "TagId").HasName("pk_project_tags");
                        j.ToTable("project_tags");
                        j.IndexerProperty<long>("ProjectId").HasColumnName("project_id");
                        j.IndexerProperty<long>("TagId").HasColumnName("tag_id");
                    });
        });

        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(e => new { e.ProjectId, e.UserId }).HasName("pk_project_members");

            entity.ToTable("project_members", tb => tb.HasTrigger("trg_after_project_member_insert"));

            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Role)
                .HasMaxLength(10)
                .HasDefaultValue("member")
                .HasColumnName("role");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("fk_project_members_projects");

            entity.HasOne(d => d.User).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_project_members_users");
        });

        modelBuilder.Entity<Subtask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_subtasks");

            entity.ToTable("subtasks");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Position).HasColumnName("position");
            entity.Property(e => e.TaskId).HasColumnName("task_id");

            entity.HasOne(d => d.Task).WithMany(p => p.Subtasks)
                .HasForeignKey(d => d.TaskId)
                .HasConstraintName("fk_subtasks_tasks");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_tags");

            entity.ToTable("tags");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ColorHex)
                .HasMaxLength(7)
                .HasColumnName("color_hex");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.WorkspaceId).HasColumnName("workspace_id");

            entity.HasOne(d => d.Workspace).WithMany(p => p.Tags)
                .HasForeignKey(d => d.WorkspaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tags_workspaces");
        });

        modelBuilder.Entity<PronaTask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_tasks");

            entity.ToTable("tasks", tb =>
                {
                    tb.HasTrigger("trg_before_task_update_check_deps");
                    tb.HasTrigger("trg_tasks_UpdateTimestamp");
                });

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatorId).HasColumnName("creator_id");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.IsRecurring).HasColumnName("is_recurring");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NextRecurrenceDate).HasColumnName("next_recurrence_date");
            entity.Property(e => e.Priority)
                .HasMaxLength(10)
                .HasDefaultValue("normal")
                .HasColumnName("priority");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.RecurrenceRule)
                .HasMaxLength(255)
                .HasColumnName("recurrence_rule");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("not-started")
                .HasColumnName("status");
            entity.Property(e => e.TaskListId).HasColumnName("task_list_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Creator).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.CreatorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tasks_users_creator");

            entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tasks_projects");

            entity.HasOne(d => d.TaskList).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.TaskListId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tasks_task_lists");

            entity.HasMany(d => d.BlockingTasks).WithMany(p => p.Tasks)
                .UsingEntity<Dictionary<string, object>>(
                    "TaskDependency",
                    r => r.HasOne<PronaTask>().WithMany()
                        .HasForeignKey("BlockingTaskId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_task_dependencies_tasks_blocking"),
                    l => l.HasOne<PronaTask>().WithMany()
                        .HasForeignKey("TaskId")
                        .HasConstraintName("fk_task_dependencies_tasks"),
                    j =>
                    {
                        j.HasKey("TaskId", "BlockingTaskId").HasName("pk_task_dependencies");
                        j.ToTable("task_dependencies");
                        j.IndexerProperty<long>("TaskId").HasColumnName("task_id");
                        j.IndexerProperty<long>("BlockingTaskId").HasColumnName("blocking_task_id");
                    });

            entity.HasMany(d => d.Tasks).WithMany(p => p.BlockingTasks)
                .UsingEntity<Dictionary<string, object>>(
                    "TaskDependency",
                    r => r.HasOne<PronaTask>().WithMany()
                        .HasForeignKey("TaskId")
                        .HasConstraintName("fk_task_dependencies_tasks"),
                    l => l.HasOne<PronaTask>().WithMany()
                        .HasForeignKey("BlockingTaskId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_task_dependencies_tasks_blocking"),
                    j =>
                    {
                        j.HasKey("TaskId", "BlockingTaskId").HasName("pk_task_dependencies");
                        j.ToTable("task_dependencies");
                        j.IndexerProperty<long>("TaskId").HasColumnName("task_id");
                        j.IndexerProperty<long>("BlockingTaskId").HasColumnName("blocking_task_id");
                    });

            entity.HasMany(d => d.Users).WithMany(p => p.TasksNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "TaskAssignee",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_task_assignees_users"),
                    l => l.HasOne<PronaTask>().WithMany()
                        .HasForeignKey("TaskId")
                        .HasConstraintName("fk_task_assignees_tasks"),
                    j =>
                    {
                        j.HasKey("TaskId", "UserId").HasName("pk_task_assignees");
                        j.ToTable("task_assignees");
                        j.IndexerProperty<long>("TaskId").HasColumnName("task_id");
                        j.IndexerProperty<long>("UserId").HasColumnName("user_id");
                    });
        });

        modelBuilder.Entity<TaskList>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_task_lists");

            entity.ToTable("task_lists", tb => tb.HasTrigger("trg_insteadof_tasklist_insert"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Position).HasColumnName("position");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");

            entity.HasOne(d => d.Project).WithMany(p => p.TaskLists)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_lists_projects");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_users");

            entity.ToTable("users", tb =>
                {
                    tb.HasTrigger("trg_after_user_insert");
                    tb.HasTrigger("trg_users_UpdateTimestamp");
                });

            entity.HasIndex(e => e.Email, "uq_users_email").IsUnique();

            entity.HasIndex(e => e.Username, "uq_users_username").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .HasColumnName("avatar_url");
            entity.Property(e => e.Bio).HasColumnName("bio");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .HasColumnName("full_name");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Role)
                .HasMaxLength(10)
                .HasDefaultValue("user")
                .HasColumnName("role");
            entity.Property(e => e.ThemePreference)
                .HasMaxLength(10)
                .HasDefaultValue("light")
                .HasColumnName("theme_preference");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UserPreference>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.SettingKey }).HasName("pk_user_preferences");

            entity.ToTable("user_preferences");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.SettingKey)
                .HasMaxLength(100)
                .HasColumnName("setting_key");
            entity.Property(e => e.SettingValue)
                .HasMaxLength(255)
                .HasColumnName("setting_value");

            entity.HasOne(d => d.User).WithMany(p => p.UserPreferences)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_user_preferences_users");
        });

        modelBuilder.Entity<VwProjectDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_ProjectDetails");

            entity.Property(e => e.CompletedTasks).HasColumnName("completed_tasks");
            entity.Property(e => e.MemberCount).HasColumnName("member_count");
            entity.Property(e => e.ProjectId)
                .ValueGeneratedOnAdd()
                .HasColumnName("project_id");
            entity.Property(e => e.ProjectName)
                .HasMaxLength(255)
                .HasColumnName("project_name");
            entity.Property(e => e.ProjectStatus)
                .HasMaxLength(20)
                .HasColumnName("project_status");
            entity.Property(e => e.TotalTasks).HasColumnName("total_tasks");
            entity.Property(e => e.WorkspaceId).HasColumnName("workspace_id");
        });

        modelBuilder.Entity<VwTaskDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_TaskDetails");

            entity.Property(e => e.CreatorFullName)
                .HasMaxLength(100)
                .HasColumnName("creator_full_name");
            entity.Property(e => e.CreatorId).HasColumnName("creator_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.ProjectName)
                .HasMaxLength(255)
                .HasColumnName("project_name");
            entity.Property(e => e.TaskCreatedAt).HasColumnName("task_created_at");
            entity.Property(e => e.TaskDescription).HasColumnName("task_description");
            entity.Property(e => e.TaskEndDate).HasColumnName("task_end_date");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.TaskListId).HasColumnName("task_list_id");
            entity.Property(e => e.TaskListName)
                .HasMaxLength(100)
                .HasColumnName("task_list_name");
            entity.Property(e => e.TaskName)
                .HasMaxLength(255)
                .HasColumnName("task_name");
            entity.Property(e => e.TaskPriority)
                .HasMaxLength(10)
                .HasColumnName("task_priority");
            entity.Property(e => e.TaskStartDate).HasColumnName("task_start_date");
            entity.Property(e => e.TaskStatus)
                .HasMaxLength(20)
                .HasColumnName("task_status");
            entity.Property(e => e.WorkspaceId).HasColumnName("workspace_id");
        });

        modelBuilder.Entity<Workspace>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pk_workspaces");

            entity.ToTable("workspaces", tb => tb.HasTrigger("trg_workspaces_UpdateTimestamp"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Owner).WithMany(p => p.Workspaces)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_workspaces_users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
