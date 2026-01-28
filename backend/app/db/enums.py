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
    ON_HOLD = 'on_hold'

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