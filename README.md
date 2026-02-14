# Task Manager App

-> A simple task management app built with React Native and Expo. User can add tasks, mark them as complete or delete them. It will show a friendly message when there are no tasks.
-> Simple Animation is provided for the app
-> Dark / Light mode toggle is available
-> Sutiable for multiplatforms: Android, IOS and Web.
-> Developed by Mohamed Ibrahim 🧑‍💻 @2026
-> Portfolio: https://mohamed-mostafa-portfolio.netlify.app/
-> GitHub: https://github.com/Mohamed-Hema

## How to Run

1. Clone the repository:
git clone https://github.com/Mohamed-Hema/Task-Management-App.git
cd Task-Management-App
2. Install dependencies
npm install

3. Start the development server
npx expo start

4. Open the app using one of:
   - Scan the QR code with Expo Go app (Android / iOS)
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Press `w` to open in the browser

## Build for Production

### Android (APK)
npx expo install expo-dev-client
eas build -p android --profile preview
This will generate an APK file you can install on any Android device.

### iOS
eas build -p ios --profile preview

Note: iOS builds require an Apple Developer account.

### Web
npx expo export:web

The output will be in the `web-build` folder, ready to deploy.

## Libraries Used

- **Expo** - Framework and tooling for React Native
- **Expo Router** - File-based routing
- **@expo/vector-icons** - Icon set (Ionicons) for UI elements
- **react-native-safe-area-context** - Handles safe area insets on different devices
