Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d """ & WshShell.CurrentDirectory & """ && npm run dev -- --host", 0, False
WScript.Sleep 1500
WshShell.Run "http://localhost:5173/"
