# zbibaboop - Social Media Website 🌐📱

Welcome to **zbibaboop**, a feature-rich social media platform that allows users to connect, share, and interact with others. Below, you'll find all the information you need to get started.

## Features ✨

- User authentication system 🔐
- Profile creation and customization with images and information 🖼️
- Posting functionality with files and tags 📝🔖
- Friends system for connecting and chatting 💬👥
- Commenting and reacting to posts 💬👍❤️
- Infinite scrolling for an enjoyable user experience 🔄
- Real-time notifications using socket.io 📬🔌
- Real-time chat app with text, videos, images, and file sharing 💬🎥📷📂

## Installation 🛠️

Before running the application, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

1. Clone this repository:
   ```
   git clone https://github.com/Zbiba42/Zbibaboop.git
   cd zbibaboop
   ```

2. Update the `.env` file with your configuration details:
   ```
   ACCES_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   Serverl_url=your_server_url
   ```

3. Update server URLs in `config.ts` located in the `src` folder.

4. Install client dependencies and server dependencies:
   ```
   npm install
   cd back-end
   npm install
   ```

## Client Dependencies 📦

- **@emoji-mart/data:** Emoji data for the Emoji Mart library.
- **@emoji-mart/react:** React components for the Emoji Mart library.
- **@mui/icons-material:** Material icons for MUI components.
- **@mui/material:** Material-UI framework for components and styles.
- **@reduxjs/toolkit:** Redux toolkit for state management.
- ... (and other dependencies listed in package.json)

## Server Dependencies 📦

- **bcrypt:** Password hashing library.
- **cors:** Cross-origin resource sharing middleware.
- **dotenv:** Environment variable management.
- **express:** Web application framework.
- **jsonwebtoken:** JWT authentication.
- **mongoose:** MongoDB object modeling.
- **multer:** File upload middleware.
- ... (and other dependencies listed in package.json)

## License 📄

This project is licensed under [CC BY-NC](https://creativecommons.org/licenses/by-nc/). Feel free to use and modify the code for non-commercial purposes.

---

Enjoy using **zbibaboop** and connecting with others in a dynamic and interactive online community! 🎉
