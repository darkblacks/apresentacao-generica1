@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo.
echo ========================================
echo   VALORA - INSTALACAO E INICIALIZACAO
echo ========================================
echo.
call npm install --registry=https://registry.npmjs.org/ --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo A instalacao falhou. Execute LIMPAR_E_REINSTALAR.bat.
  pause
  exit /b 1
)
echo.
echo Iniciando a apresentacao...
call npm run dev
pause
