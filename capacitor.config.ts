import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.kita.app',
    appName: 'キタ',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    android: {
        allowMixedContent: true,
        captureInput: true,
        webContentsDebuggingEnabled: true
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#FFFFFF',
            showSpinner: false
        }
    }
};

export default config;
