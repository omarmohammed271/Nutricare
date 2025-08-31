@echo off
REM Nutricare Frontend Docker Runner Script for Windows
REM Usage: docker-run.bat [command] [profile]

setlocal enabledelayedexpansion

REM Default values
set PROFILE=dev

REM Colors (Windows 10+ supports ANSI colors)
set RED=[91m
set GREEN=[92m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

REM Function to print colored output
:print_status
echo %GREEN%[INFO]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %BLUE%================================%NC%
echo %BLUE%  Nutricare Frontend Docker%NC%
echo %BLUE%================================%NC%
goto :eof

REM Function to show usage
:show_usage
echo Usage: %~nx0 [command] [profile]
echo.
echo Commands:
echo   start     Start the application
echo   stop      Stop the application
echo   restart   Restart the application
echo   build     Build the Docker images
echo   logs      Show application logs
echo   shell     Open shell in container
echo   status    Show container status
echo   clean     Clean up containers and images
echo   help      Show this help message
echo.
echo Profiles:
echo   dev       Development environment ^(default^)
echo   prod      Production environment
echo   prod-custom Production with custom port ^(3000^)
echo.
echo Examples:
echo   %~nx0 start dev
echo   %~nx0 start prod
echo   %~nx0 logs dev
echo   %~nx0 clean
goto :eof

REM Function to check if Docker is running
:check_docker
docker info >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker is not running. Please start Docker and try again."
    exit /b 1
)
goto :eof

REM Function to start application
:start_app
set profile=%~1
call :print_status "Starting Nutricare Frontend with profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml up -d --build
    call :print_status "Development server started at http://localhost:5173"
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml up -d --build
    call :print_status "Production server started at http://localhost:80"
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom up -d --build
    call :print_status "Production server started at http://localhost:3000"
) else (
    call :print_error "Invalid profile: %profile%"
    call :show_usage
    exit /b 1
)
goto :eof

REM Function to stop application
:stop_app
set profile=%~1
call :print_status "Stopping Nutricare Frontend with profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml down
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml down
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom down
) else (
    call :print_error "Invalid profile: %profile%"
    exit /b 1
)

call :print_status "Application stopped"
goto :eof

REM Function to restart application
:restart_app
set profile=%~1
call :print_status "Restarting Nutricare Frontend with profile: %profile%"
call :stop_app %profile%
call :start_app %profile%
goto :eof

REM Function to build images
:build_images
set profile=%~1
call :print_status "Building Docker images for profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml build --no-cache
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml build --no-cache
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom build --no-cache
) else (
    call :print_error "Invalid profile: %profile%"
    exit /b 1
)

call :print_status "Images built successfully"
goto :eof

REM Function to show logs
:show_logs
set profile=%~1
call :print_status "Showing logs for profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml logs -f
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml logs -f
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom logs -f
) else (
    call :print_error "Invalid profile: %profile%"
    exit /b 1
)
goto :eof

REM Function to open shell in container
:open_shell
set profile=%~1
call :print_status "Opening shell in container for profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml exec nutricare-frontend-dev sh
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml exec nutricare-frontend sh
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom exec nutricare-frontend-prod-custom sh
) else (
    call :print_error "Invalid profile: %profile%"
    exit /b 1
)
goto :eof

REM Function to show status
:show_status
set profile=%~1
call :print_status "Container status for profile: %profile%"

if "%profile%"=="dev" (
    docker-compose -f docker-compose.dev.yml ps
) else if "%profile%"=="prod" (
    docker-compose -f docker-compose.prod.yml ps
) else if "%profile%"=="prod-custom" (
    docker-compose --profile prod-custom ps
) else (
    call :print_error "Invalid profile: %profile%"
    exit /b 1
)
goto :eof

REM Function to clean up
:clean_up
call :print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
set /p response=
if /i "%response%"=="y" (
    call :print_status "Cleaning up Docker resources..."
    
    REM Stop all containers
    docker-compose -f docker-compose.dev.yml down -v >nul 2>&1
    docker-compose -f docker-compose.prod.yml down -v >nul 2>&1
    docker-compose --profile prod-custom down -v >nul 2>&1
    
    REM Remove containers
    docker container prune -f
    
    REM Remove images
    docker image prune -a -f
    
    REM Remove volumes
    docker volume prune -f
    
    REM Remove networks
    docker network prune -f
    
    call :print_status "Cleanup completed"
) else (
    call :print_status "Cleanup cancelled"
)
goto :eof

REM Main script logic
:main
set command=%~1
if "%command%"=="" set command=%PROFILE%

call :print_header

REM Check if Docker is running
call :check_docker
if errorlevel 1 exit /b 1

REM Handle commands
if "%command%"=="start" (
    call :start_app %~2
) else if "%command%"=="stop" (
    call :stop_app %~2
) else if "%command%"=="restart" (
    call :restart_app %~2
) else if "%command%"=="build" (
    call :build_images %~2
) else if "%command%"=="logs" (
    call :show_logs %~2
) else if "%command%"=="shell" (
    call :open_shell %~2
) else if "%command%"=="status" (
    call :show_status %~2
) else if "%command%"=="clean" (
    call :clean_up
) else if "%command%"=="help" (
    call :show_usage
) else if "%command%"=="--help" (
    call :show_usage
) else if "%command%"=="-h" (
    call :show_usage
) else if "%command%"=="dev" (
    call :start_app dev
) else if "%command%"=="prod" (
    call :start_app prod
) else if "%command%"=="prod-custom" (
    call :start_app prod-custom
) else (
    call :print_error "Unknown command: %command%"
    call :show_usage
    exit /b 1
)

exit /b 0
