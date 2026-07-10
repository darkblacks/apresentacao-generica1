@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Limpando instalacao anterior...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
call npm cache verify
echo.
echo Reinstalando dependencias...
call npm install --registry=https://registry.npmjs.org/ --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo Tente mover esta pasta para C:\Projetos\valora-apresentacao e execute novamente.
  pause
  exit /b 1
)
call npm run dev
pause
