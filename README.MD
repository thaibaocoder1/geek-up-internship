# GEEK Summer Internship 2025

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## 📖 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Technical Stack](#-technical-stack)
- [📱 Project Setup](#-project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Usage](#-usage)
- [👏 Acknowledgements](#-acknowledgements)

## 🚀 Overview

- Implement a web app similar to the template found here: *https://gi-pf.vercel.app/*

## ✨ Technical Stack

- **Core Framework**: Refine
- **UI Library**: Ant Design
- **Routing**: React Router
- **Data Fetching**: React Query
- **API**: JSONPlaceholder

## 📱 Project Setup

### Prerequisites

- Node.js >= 18.0.0
- npm/yarn

### Installation

```bash
npm install && npm run dev
# or
yarn && yarn dev
```

## 💻 Usage

```markdown
`src/` - Root source directory
├── components/
│ ├── header/ - Header of layout
│ ├── image-preview/ - Preview image in details page
│ └── index.ts - Barrel file
│
├── configs/
│ └── constants.ts - Store constants in project
│
├── pages/
│ ├── albums/ - Album Management Page
│ └── users/ - User Management Page
│
├── types/
│ ├── album.type.ts
│ ├── user.type.ts
│ └── photo.type.ts
│
└── utils/
├── error.ts - Ignore warning from UI kit
└── image.ts - Generate avatar for user
```

- **Navigate to _Albums page_**

![The result of Album Management Page](/src/assets/album-management-page.png "Album Management Page")

![The result of Album Details Page](/src/assets/album-details-page.png "Album Details Page")

- **Navigate to _Users page_**

![The result of User Management Page](/src/assets/user-management-page.png "User Management Page")

![The result of User Details Page](/src/assets/user-details-page.png "User Details Page")

## 👏 Acknowledgements

Big thanks to GEEK UP for the opportunity to take on this technical challenge.
Proudly crafted by [Hoang Nguyen Thai Bao] with ❤️ using Refine, React Query & Ant Design.
Appreciation to the open-source community — your incredible tools make building great software possible.
