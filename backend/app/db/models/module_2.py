import uuid
from enum import Enum
from typing import Optional, List
from datetime import datetime
import uuid
 

from sqlalchemy import String, Integer, DateTime, ForeignKey, Index, Table, Column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base
from app.db.mixins import TimestampMixin, AuditMixin, SoftDeleteMixin
from app.db.enums import UserStatus, AuthProvider

# ======= Association Tables =======

# ======= Entity Tables =======
