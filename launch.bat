@echo off
@title DevilTeaMS-Based on Solaxia
set CLASSPATH=.;dist\*
java -Xmx1024m -Dwzpath=wz\ net.server.Server
pause