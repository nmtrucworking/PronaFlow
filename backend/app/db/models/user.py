from enum import Enum
from typing import Optional, List
from sqlalchemy import String, Integer, DateTime, ForeignKey, Index, Table, Column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import uuid

from app.db.base_class import Base, AuditMixin

# Association Table cho User - Role (N-N)
user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", UUID(as_uuid=True), ForeignKey("roles.role_id", ondelete="CASCADE"), primary_key=True),
)

# Association Table cho Role - Permission (N-N)
role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", UUID(as_uuid=True), ForeignKey("roles.role_id", ondelete="CASCADE"), primary_key=True),
    Column("permission_id", UUID(as_uuid=True), ForeignKey("permissions.permission_id", ondelete="CASCADE"), primary_key=True),
)

class UserStatus(str, Enum):
    PENDING = "PENDING"
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    DELETED = "DELETED"

class User(Base, AuditMixin):
    """
    Summary-func: Model quản lý định danh người dùng cốt lõi.
    Tuân thủ Module 1 IAM và tài liệu Entities/Users.md.
    """
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(String(30), unique=True, index=True, nullable=False)
    password_hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=True) # Nullable cho OAuth
    
    status: Mapped[UserStatus] = mapped_column(default=UserStatus.PENDING)
    email_verified_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
    # MFA & Security
    mfa_enabled: Mapped[bool] = mapped_column(default=False)
    mfa_secret: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    failed_login_attempts: Mapped[int] = mapped_column(default=0)
    locked_until: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    roles: Mapped[List["Role"]] = relationship(secondary=user_roles, back_populates="users")
    owned_workspaces: Mapped[List["Workspace"]] = relationship(back_populates="owner")

class Role(Base):
    """
    Summary-func: Định nghĩa vai trò hệ thống (RBAC).
    Dựa trên Entities/Roles.md.
    """
    __tablename__ = "roles"

    role_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    hierarchy_level: Mapped[int] = mapped_column(Integer, default=0)

    users: Mapped[List["User"]] = relationship(secondary=user_roles, back_populates="roles")
    permissions: Mapped[List["Permission"]] = relationship(secondary=role_permissions, back_populates="roles")

class Permission(Base):
    """
    Summary-func: Quyền hạn chi tiết (Fine-grained permissions).
    Dựa trên Entities/Permissions.md.
    """
    __tablename__ = "permissions"

    permission_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)

    roles: Mapped[List["Role"]] = relationship(secondary=role_permissions, back_populates="permissions")