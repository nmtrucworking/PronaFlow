"""
Import all models here to ensure they are registered with SQLAlchemy.
This file is imported by Alembic to discover all models for migrations.
"""

from app.db.base_class import Base

# Import all models - ensure they are registered with Base.metadata
# Module 1: Identity & Access Management (IAM)
from app.db.models.module_1 import User, Role, Permission, MFAConfig, MFABackupCode, AuthProvider, AuditLog

# Module 2: Multi-tenancy Workspace Governance
from app.db.models.workspaces import (
    Workspace,
    WorkspaceMember,
    WorkspaceInvitation,
    WorkspaceAccessLog,
    WorkspaceSetting,
)

# Module 3: Project Lifecycle Management
from app.db.models.projects import Project

# Module 4 & 15: Tag & Categorization System
from app.db.models.tags import Tag

__all__ = [
    "Base",
    # Module 1
    "User",
    "Role", 
    "Permission",
    "MFAConfig",
    "MFABackupCode",
    "AuthProvider",
    "AuditLog",
    # Workspace
    "Workspace",
    "WorkspaceMember",
    "WorkspaceInvitation",
    "WorkspaceAccessLog",
    "WorkspaceSetting",
    # Module 3
    "Project",
    # Module 4 & 15
    "Tag",
]
