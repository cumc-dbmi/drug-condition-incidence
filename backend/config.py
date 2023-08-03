import os

from dotenv import load_dotenv
from pydantic import BaseConfig

load_dotenv()


class GlobalConfig(BaseConfig):
    title: str = os.environ.get("TITLE")
    version: str = "1.0.0"
    description: str = os.environ.get("DESCRIPTION")
    openapi_prefix: str = "/"
    docs_url: str = "/ops/incidence/v2/docs"
    redoc_url: str = "/ops/incidence/v2/redoc"
    openapi_url: str = "/ops/incidence/v2/openapi.json"
    api_prefix: str = "/api/incidence/v2"
    debug: bool = os.environ.get("DEBUG")
    postgres_user: str = os.environ.get("DATASOURCE_USERNAME")
    postgres_password: str = os.environ.get("DATASOURCE_PASSWORD")
    postgres_server: str = os.environ.get("DATASOURCE_HOSTNAME")
    postgres_port: int = int(os.environ.get("DATASOURCE_PORT"))
    postgres_db: str = os.environ.get("DATASOURCE_DATABASE")
    db_echo_log: bool = True if os.environ.get("DEBUG") == "True" else False

    @property
    def async_database_url(self) -> str:
        return f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}@{self.postgres_server}:{self.postgres_port}/{self.postgres_db}"


settings = GlobalConfig()
