from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase

from config import settings

engine = create_async_engine(
    url=settings.async_database_url,
    echo=settings.db_echo_log
)


class Base(DeclarativeBase):
    pass
