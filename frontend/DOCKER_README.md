# 🐳 Nutricare Frontend - Docker Setup

This document provides comprehensive instructions for running the Nutricare frontend application using Docker.

## 📋 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- At least 2GB of available RAM
- At least 1GB of available disk space

## 🚀 Quick Start

### Development Environment

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Or use the main compose file with dev profile
docker-compose --profile dev up --build
```

**Access:** http://localhost:5173

### Production Environment

```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up --build

# Or use the main compose file with prod profile
docker-compose --profile prod up --build
```

**Access:** http://localhost:80

## 🏗️ Build Options

### Multi-stage Build

The Dockerfile includes three stages:

1. **Builder Stage** (`node:18-alpine`): Installs dependencies and builds the application
2. **Production Stage** (`nginx:alpine`): Serves the built application with nginx
3. **Development Stage** (`node:18-alpine`): Runs the development server with hot reload

### Build Commands

```bash
# Build production image
docker build --target production -t nutricare-frontend:prod .

# Build development image
docker build --target development -t nutricare-frontend:dev .

# Build all stages
docker build -t nutricare-frontend:latest .
```

## 📁 File Structure

```
├── Dockerfile                 # Multi-stage Dockerfile
├── docker-compose.yml         # Main compose file with profiles
├── docker-compose.dev.yml     # Development-specific compose
├── docker-compose.prod.yml    # Production-specific compose
├── nginx.conf                 # Main nginx configuration
├── nginx-spa.conf            # SPA-specific nginx config
├── .dockerignore             # Docker build exclusions
└── DOCKER_README.md          # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Node.js environment |
| `CHOKIDAR_USEPOLLING` | `true` | Enable file watching in Docker |
| `WATCHPACK_POLLING` | `true` | Enable webpack polling |

### Ports

| Service | Internal Port | External Port | Description |
|---------|---------------|---------------|-------------|
| Development | 5173 | 5173 | Vite dev server |
| Production | 80 | 80 | Nginx server |

### Volumes

| Path | Description |
|------|-------------|
| `.:/app` | Source code mounting (dev only) |
| `/app/node_modules` | Node modules (dev only) |
| `/app/.vite` | Vite cache (dev only) |

## 🚀 Usage Examples

### Development with Hot Reload

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Production Deployment

```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production environment
docker-compose -f docker-compose.prod.yml down
```

### Using Profiles

```bash
# Start development profile
docker-compose --profile dev up --build

# Start production profile
docker-compose --profile prod up --build

# Start custom port production profile
docker-compose --profile prod-custom up --build
```

## 🔍 Health Checks

### Development Health Check
- **Endpoint:** http://localhost:5173
- **Interval:** 30 seconds
- **Timeout:** 10 seconds
- **Retries:** 3

### Production Health Check
- **Endpoint:** http://localhost/health
- **Interval:** 30 seconds
- **Timeout:** 10 seconds
- **Retries:** 3

## 📊 Performance Features

### Nginx Optimizations
- Gzip compression for static assets
- Browser caching with appropriate headers
- SPA routing support
- Security headers
- Static file serving

### Docker Optimizations
- Multi-stage builds
- Alpine Linux base images
- Layer caching
- Volume mounting for development

## 🛡️ Security Features

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade
- Content-Security-Policy: default-src 'self'

### Access Control
- Hidden nginx version
- Denied access to hidden files
- Denied access to backup files
- Restricted API access

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
netstat -tulpn | grep :80
netstat -tulpn | grep :5173

# Kill the process or use different ports
docker-compose -f docker-compose.prod.yml up -p 8080:80
```

#### Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

#### Hot Reload Not Working
```bash
# Check volume mounts
docker-compose -f docker-compose.dev.yml exec nutricare-frontend ls -la /app

# Restart with fresh volumes
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

### Logs and Debugging

```bash
# View container logs
docker-compose -f docker-compose.dev.yml logs -f nutricare-frontend

# Execute commands in container
docker-compose -f docker-compose.dev.yml exec nutricare-frontend sh

# Check container status
docker-compose -f docker-compose.dev.yml ps
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t nutricare-frontend:${{ github.sha }} .
      - name: Push to registry
        run: |
          docker tag nutricare-frontend:${{ github.sha }} your-registry/nutricare-frontend:${{ github.sha }}
          docker push your-registry/nutricare-frontend:${{ github.sha }}
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Support

For issues related to Docker setup:
1. Check the troubleshooting section above
2. Review Docker and container logs
3. Ensure all prerequisites are met
4. Check port availability on your system

---

**Happy Containerizing! 🐳✨**
