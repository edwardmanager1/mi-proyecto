@echo off
echo Iniciando servidores...
echo.
cd backend
start cmd /k "node server.js"
cd ..
timeout /t 3
cd frontend  
start cmd /k "npm run dev"
cd ..
echo Servidores iniciados. Revisar ventanas nuevas.
pause