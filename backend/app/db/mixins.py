"""
Summary-func: Các Mixin tái sử dụng cho Audit log và Soft Delete.
"""
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, declared_attr
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

class TimestampMixin:
    """Mixin for created_at and updated_at only"""
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False,
        comment="Timestamp when the record was created"
    )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now(), 
        nullable=False,
        comment="Timestamp when the record was last updated"
    )

class AuditMixin(TimestampMixin):
    """
    Mixin automatically adds columns for tracking creation and update timestamps, provides:
    - created_at: Timestamp when the record was created.
    - updated_at: Timestamp when the record was last updated.
    - created_by: UUID of the user who created the record (nullable).
    """
    # using `@declared_attr` to ensure this works correctly in inheritance
    @declared_attr
    def created_by(cls) -> Mapped[Optional[uuid.UUID]]:
        return mapped_column(
            UUID(as_uuid=True),
            ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
            comment="UUID of the user who created the record"
        )

class SoftDeleteMixin:
    """
    Mixin hỗ trợ xóa mềm (Soft Delete).
    """
    is_deleted: Mapped[bool] = mapped_column(
        Boolean, 
        default=False, 
        nullable=False,
        index=True,
        comment="Flag indicating soft deletion"
    )
    
    deleted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True,
        comment="Timestamp when the record was soft deleted"
    )

    def soft_delete(self):
        """Helper method to perform a soft delete on the object"""
        self.is_deleted = True
        self.deleted_at = datetime.now()

    def restore(self):
        """Helper method to restore a soft-deleted object"""
        self.is_deleted = False
        self.deleted_at = None