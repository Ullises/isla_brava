# Isla Brava Backend API

API REST para la reserva de motos acuaticas y yates desarrollada con FastAPI y MySQL.

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker y Docker Compose
- Red Docker `islabrava-net` (creada automáticamente por Compose)

### Configuración
1. Clona el repositorio
2. Crea un archivo `.env` con las variables de base de datos:
```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

### Ejecutar el proyecto
```bash
docker-compose up --build
```

## 🔍 Verificación

### Pruebas básicas
- **Estado general**: http://localhost:5010/health
- **Ejemplo API**: http://localhost:5010/items/get-items

### Resultado esperado
```json
{
  "status": "success",
  "data": [...],
  "count": 5
}
```

## 🛠️ Comandos Docker

### Acceder al contenedor
```bash
docker exec -it islabrava-backend /bin/bash
```

### Descargar backups
```bash
docker cp islabrava-backend:/app/backupsDB ./backups_local
```

## 📁 Estructura del Proyecto
```
src/
├── API/api.py          # Endpoints FastAPI
├── Utils/islabrava_exec.py  # Lógica de negocio
├── Queries/islabrava_queries.py  # Consultas SQL
└── config/config.py    # Configuración DB
```

## 🔧 Stack Tecnológico
- **FastAPI** - Framework web
- **MySQL** - Base de datos
- **Docker** - Containerización
- **SQLAlchemy** - ORM
