# Import libs
from datetime import datetime
from uuid import uuid4
from sqlalchemy import DateTime, ForeignKey, Boolean, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr
from typing import Optional

class Base(DeclarativeBase):
    """
    Base class for all ORM models. 
    Using SQLAlchemy's DeclarativeBase to define common configurations with Mapped and mapped_column.
    """
    pass

class AuditMixin:
    """
    Mixin class to add auditing fields to ORM models.
    Includes created_by, created_at, updated_at, is_deleted, and deleted_at fields.
    """
    @declared_attr
    def created_by(cls) -> Mapped[Optional[UUID]]:
        return mapped_column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=text("TIMEZONE('utc', NOW())")
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=text("TIMEZONE('utc', NOW())"),
        onupdate=datetime.utcnow
    )

    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, server_default=text("false"))
    deleted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

class MultiTenantMixin:
    """
    Mixin class to add multi-tenancy support to ORM models.
    Includes workspace_id field to associate records with specific workspaces.
    """
    @declared_attr
    def workspace_id(cls) -> Mapped[UUID]:
        return mapped_column(
            UUID(as_uuid=True), 
            ForeignKey("workspaces.id"), 
            nullable=False,
            index=True
        )