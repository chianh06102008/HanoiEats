# 🥢 HanoiEats – Hanoi Food Discovery App

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

## 📱 Product Overview

HanoiEats is a comprehensive mobile application designed to revolutionize how users discover, explore, and experience the vibrant culinary scene of Hanoi. The app serves as a digital gateway to authentic Vietnamese cuisine, providing personalized restaurant recommendations, detailed food insights, and convenient tools to enhance the local dining experience.

Whether you're a local food enthusiast or a tourist eager to explore Hanoi's rich gastronomic heritage, HanoiEats connects you with the best local eateries, trending dishes, and hidden culinary gems throughout the city.
## [LINK-DEMO](https://drive.google.com/file/d/1AiDupSxhEPS8zq-QAggT__2tQtsSWBGx/view?usp=drive_link)

## 🎯 Objectives & Core Purpose

### Primary Mission
To bridge the gap between food lovers and Hanoi's diverse culinary landscape through an intuitive, personalized digital platform that celebrates local flavors and traditions.

### Key Goals
- **Discovery**: Help users uncover authentic Hanoi restaurants and dishes
- **Personalization**: Provide tailored recommendations based on preferences and location
- **Convenience**: Streamline the process of finding, saving, and planning food experiences
- **Community**: Foster a platform for sharing food experiences and reviews
- **Accessibility**: Make local cuisine accessible to both residents and visitors

## ✨ Key Features

### 🔐 User Authentication & Security
- ![Secure registration and login system](https://res.cloudinary.com/dynr4mqym/image/upload/v1761944018/Screenshot_1761474879_ieeycu.png)

### 👤 Profile Management
- Comprehensive user profile setup
- Avatar customization with Cloudinary image uploads
- Personal information management

### 🍜 Advanced Discovery & Filtering
- **Multi-dimensional Filtering**:
  - Location-based filtering by district
  - Cuisine type categorization
  - Search food by name.

### 💾 Collections & Bookmarking
- Save favorite restaurants for quick access
- Create custom food collections

### 📍 Location-Based Services
- **Interactive Maps**: Visual restaurant location display
- **Distance Calculation**: Precise distance measurement using Haversine formula
- **Location Services**: Expo Location API integration

### ⭐ Reviews & Rating System
- Comprehensive dish and restaurant rating system
- Photo uploads for reviews
- Detailed review management

## 🛠️ Technologies Used

### Frontend Framework
- **React Native** with Expo framework
- **TypeScript** for type safety and better development experience
- **React Navigation** for seamless navigation flow

### Backend & Database
- **Firebase Firestore** for real-time database operations
- **Firebase Authentication** for secure user management

### Cloud Services
- **Cloudinary** for advanced image upload and management
  - Automatic image optimization
  - Multiple format support
  - CDN delivery for fast loading

## 🚀 Installation Guide

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git** for version control

### Required Accounts
- **Firebase** account with project setup
- **Cloudinary** account for image management
- **Expo** account (for development builds)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/hanoieats.git
   cd hanoieats
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configuration**
   
   # Cloudinary Configuration
   CLOUD_NAME=your_cloudinary_cloud_name
   UPLOAD_PRESET=your_cloudinary_upload_preset
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   
   # Firebase Configuration
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   
   # App Configuration
   EXPO_PUBLIC_API_URL=your_api_url

4. **Firebase Setup**
   - Create a new Firebase project
   - Set up Firestore database
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)

5. **Cloudinary Setup**
   - Create a Cloudinary account
   - Generate API credentials
   - Set up upload presets for different image types

6. **Run the Application**
   ```bash
   npx expo start
   ```

## 📁 Project Structure

```
hanoieats/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── main/          # Main app screens
│   │   └── dev/           # Development screens
│   ├── navigations/       # Navigation configuration
│   ├── store/             # Redux store and reducers
│   ├── firebase/          # Firebase configuration
│   ├── utils/             # Utility functions
│   ├── data/              # Mock data and constants
│   ├── type/              # TypeScript type definitions
│   └── theme/             # App theming
├── assets/                # Images and static assets
├── ios/                   # iOS-specific files
└── android/               # Android-specific files
```
