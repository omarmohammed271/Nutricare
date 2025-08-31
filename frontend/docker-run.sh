#!/bin/bash

# Nutricare Frontend Docker Runner Script
# Usage: ./docker-run.sh [command] [profile]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
PROFILE="dev"
COMPOSE_FILE="docker-compose.yml"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Nutricare Frontend Docker${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [command] [profile]"
    echo ""
    echo "Commands:"
    echo "  start     Start the application"
    echo "  stop      Stop the application"
    echo "  restart   Restart the application"
    echo "  build     Build the Docker images"
    echo "  logs      Show application logs"
    echo "  shell     Open shell in container"
    echo "  clean     Clean up containers and images"
    echo "  status    Show container status"
    echo "  help      Show this help message"
    echo ""
    echo "Profiles:"
    echo "  dev       Development environment (default)"
    echo "  prod      Production environment"
    echo "  prod-custom Production with custom port (3000)"
    echo ""
    echo "Examples:"
    echo "  $0 start dev"
    echo "  $0 start prod"
    echo "  $0 logs dev"
    echo "  $0 clean"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to start application
start_app() {
    local profile=$1
    print_status "Starting Nutricare Frontend with profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml up -d --build
            print_status "Development server started at http://localhost:5173"
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml up -d --build
            print_status "Production server started at http://localhost:80"
            ;;
        "prod-custom")
            docker-compose --profile prod-custom up -d --build
            print_status "Production server started at http://localhost:3000"
            ;;
        *)
            print_error "Invalid profile: $profile"
            show_usage
            exit 1
            ;;
    esac
}

# Function to stop application
stop_app() {
    local profile=$1
    print_status "Stopping Nutricare Frontend with profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml down
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml down
            ;;
        "prod-custom")
            docker-compose --profile prod-custom down
            ;;
        *)
            print_error "Invalid profile: $profile"
            exit 1
            ;;
    esac
    
    print_status "Application stopped"
}

# Function to restart application
restart_app() {
    local profile=$1
    print_status "Restarting Nutricare Frontend with profile: $profile"
    stop_app $profile
    start_app $profile
}

# Function to build images
build_images() {
    local profile=$1
    print_status "Building Docker images for profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml build --no-cache
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml build --no-cache
            ;;
        "prod-custom")
            docker-compose --profile prod-custom build --no-cache
            ;;
        *)
            print_error "Invalid profile: $profile"
            exit 1
            ;;
    esac
    
    print_status "Images built successfully"
}

# Function to show logs
show_logs() {
    local profile=$1
    print_status "Showing logs for profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml logs -f
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml logs -f
            ;;
        "prod-custom")
            docker-compose --profile prod-custom logs -f
            ;;
        *)
            print_error "Invalid profile: $profile"
            exit 1
            ;;
    esac
}

# Function to open shell in container
open_shell() {
    local profile=$1
    print_status "Opening shell in container for profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml exec nutricare-frontend-dev sh
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml exec nutricare-frontend sh
            ;;
        "prod-custom")
            docker-compose --profile prod-custom exec nutricare-frontend-prod-custom sh
            ;;
        *)
            print_error "Invalid profile: $profile"
            exit 1
            ;;
    esac
}

# Function to show status
show_status() {
    local profile=$1
    print_status "Container status for profile: $profile"
    
    case $profile in
        "dev")
            docker-compose -f docker-compose.dev.yml ps
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml ps
            ;;
        "prod-custom")
            docker-compose --profile prod-custom ps
            ;;
        *)
            print_error "Invalid profile: $profile"
            exit 1
            ;;
    esac
}

# Function to clean up
clean_up() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up Docker resources..."
        
        # Stop all containers
        docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
        docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
        docker-compose --profile prod-custom down -v 2>/dev/null || true
        
        # Remove containers
        docker container prune -f
        
        # Remove images
        docker image prune -a -f
        
        # Remove volumes
        docker volume prune -f
        
        # Remove networks
        docker network prune -f
        
        print_status "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Main script logic
main() {
    local command=$1
    local profile=${2:-$PROFILE}
    
    print_header
    
    # Check if Docker is running
    check_docker
    
    # Handle commands
    case $command in
        "start")
            start_app $profile
            ;;
        "stop")
            stop_app $profile
            ;;
        "restart")
            restart_app $profile
            ;;
        "build")
            build_images $profile
            ;;
        "logs")
            show_logs $profile
            ;;
        "shell")
            open_shell $profile
            ;;
        "status")
            show_status $profile
            ;;
        "clean")
            clean_up
            ;;
        "help"|"--help"|"-h")
            show_usage
            ;;
        "")
            show_usage
            ;;
        *)
            print_error "Unknown command: $command"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
