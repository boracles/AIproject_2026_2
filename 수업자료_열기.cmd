@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set "NODE_EXE=C:\Users\BORA\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "VITE_ENTRY=%CD%\node_modules\vite\bin\vite.js"
set "WRANGLER_LOG_PATH=%CD%\.wrangler\wrangler.log"

if not exist "%NODE_EXE%" (
  echo 실행에 필요한 프로그램을 찾지 못했습니다.
  echo Codex에서 이 프로젝트를 열고 "수업자료 실행해줘"라고 요청해 주세요.
  pause
  exit /b 1
)

if not exist "%VITE_ENTRY%" (
  echo 프로젝트 실행 파일을 찾지 못했습니다.
  echo Codex에서 이 프로젝트를 열고 "수업자료 실행 준비해줘"라고 요청해 주세요.
  pause
  exit /b 1
)

echo 수업자료를 여는 중입니다...
echo 이 창을 닫으면 로컬 수업자료도 종료됩니다.
echo.
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"
"%NODE_EXE%" "%VITE_ENTRY%" --host 127.0.0.1 --port 3000

endlocal
