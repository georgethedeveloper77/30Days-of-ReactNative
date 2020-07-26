~~_keytool -keystore path-to-debug-or-production-keystore -list -v_~~   

Cannot connect to the Metro server.

Try the following to fix the issue:
- Ensure that the Metro server is running and available on the same network
- Ensure that your device/emulator is connected to your machine and has USB debugging enabled - run 'adb devices' to see a list of connected devices
- If you're on a physical device connected to the same machine, run 'adb reverse tcp:8081 tcp:8081' to forward requests from your device
- If your device is on the same Wi-Fi network, set 'Debug server host & port for device' in 'Dev settings' to your machine's IP address and the port of the local dev server - e.g. 10.0.1.1:8081

URL: 192.168.43.187:19001











