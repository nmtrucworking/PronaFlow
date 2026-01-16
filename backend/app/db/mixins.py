from datetime import datetime
from uuid import uuid4, UUID
from sqlalchemy import DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, declared_attr
from sqlalchemy.sql import func
from typing import Optional

class AuditMixin:
    """
    Mixin to add audit fields to a SQLAlchemy model.
    Provides created_at, updated_at, created_by, and updated_by fields.
    """
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), index=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), index=True
    )

    @declared_attr
    def created_by(cls) -> Mapped[Optional[UUID]]:
        return mapped_column(
            ForeignKey("users.id"), ondelete="SET NULL", nullable=True, index=True
        )
    
    @declared_attr
    def updated_by(cls) -> Mapped[Optional[UUID]]:
        return mapped_column(
            ForeignKey("users.id"), ondelete="SET NULL", nullable=True, index=True
        )
    
class SoftDeleteMixin:
    """
    Mixin to add soft delete functionality to a SQLAlchemy model.
    Provides is_deleted and deleted_at fields.
    """
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    deleted_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = func.now()