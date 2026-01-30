"""
Definition Enums for database fields.
fetch Enums from "E:\workspace\project\pronaflow\docs\docs - PronaFlow React&FastAPI\07-References\*.json"
"""

from enum import Enum


class UserStatus(str, Enum):
    """User lifecycle status"""
    PENDING = 'pending'
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    SUSPENDED = 'suspended'
    DELETED = 'deleted'


class AuthProvider(str, Enum):
    """Authentication providers"""
    LOCAL = 'local'
    GOOGLE = 'google'
    GITHUB = 'github'
    MICROSOFT = 'microsoft'

class WorkspaceRole(str, Enum):
    """
    Roles within a workspace
    Includes: owner, admin, member, viewer, guest
    """
    OWNER = 'owner'
    ADMIN = 'admin'
    MEMBER = 'member'
    VIEWER = 'viewer'
    GUEST = 'guest'

class ProjectStatus(str, Enum):
    """
    Project lifecycle status
    Ref: Entities/Project.md
    """
    NOT_STARTED = 'not_started'
    IN_PROGRESS = 'in_progress'
    IN_REVIEW = 'in_review'
    DONE = 'done'
    CANCELLED = 'cancelled'

class ProjectGovernanceMode(str, Enum):
    """
    Project governance mode
    SIMPLE: Flexible, minimal constraints
    STRICT: Rigid, enforced workflows
    """
    SIMPLE = 'simple'
    STRICT = 'strict'

class ProjectVisibility(str, Enum):
    """
    Project visibility
    PUBLIC: Visible to all workspace members
    PRIVATE: Visible only to selected members
    """
    PUBLIC = 'public'
    PRIVATE = 'private'

class TagEntityType(str, Enum):
    """
    Entity type limit for tags
    Ref: Entities/Tag.md
    """
    TASK = 'task'
    PROJECT = 'project'
    ALL = 'all'

class TaskPriority(str, Enum):
    """
    Task priority levels
    provided as string values for clarity in the database. 
    includes: low, medium, high, urgent
    """
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TaskStatus(str, Enum):
    """
    Task status/lifecycle
    Ref: Entities/Task.md
    """
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    DONE = "done"
