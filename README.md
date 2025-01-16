<div align="center">

[![fs_logo](https://github.com/FriendshipHouse/catholic-friendship-app/blob/develop/public/general/img-bigFS.png)](https://friendship.catholic.org.tw)

# Catholic Friendship App

<div align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14.2.13-blue" alt="next Badge"></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-^18-blue" alt="react Badge"></a>
    <a href="https://next-auth.js.org"><img src="https://img.shields.io/badge/NextAuth.js-^4.24.10-blue" alt="next-auth Badge"></a>
    <a href="https://next-intl-docs.vercel.app"><img src="https://img.shields.io/badge/i18next-^3.25.3-blue" alt="i18n Badge"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-^5-blue" alt="typescript Badge"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwindcss-^3.4.1-blue" alt="tailwind Badge"></a>
    <a href="https://ant.design"><img src="https://img.shields.io/badge/AntDesign-^5.22.3-blue" alt="antd Badge"></a>
    <a href="https://jotai.org"><img src="https://img.shields.io/badge/Jotai-^2.10.3-blue" alt="jotai Badge"></a>
</div>

</div>

[Catholic Friendship App](https://friendship.catholic.org.tw) is a Catholic event website for users, with the front end built using Next.js, React, TypeScript, Tailwind CSS, and Ant Design. Authentication is handled by NextAuth.js and Google OAuth, with i18n support for multiple languages. The backend uses MongoDB, with files stored via Vercel Blob and deployed on Vercel. SonarLint is used for code quality checks, Sentry monitors errors, and Google Analytics is used for website analysis.

## Tech Stack

- **Design Tools**: [Figma](https://www.figma.com/)
- **Frontend Frameworks**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Ant Design](https://ant.design/)
- **Authentication and Authorization**: [NextAuth.js](https://next-auth.js.org/), [Google OAuth](https://console.developers.google.com/)
- **Backend and Storage**: [MongoDB](https://www.mongodb.com/)
- **Image Storage and Deployment**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), [Vercel Hosting](https://vercel.com/)
- **Internationalization**: [i18n](https://next-intl-docs.vercel.app/)
- **Code Quality Check**: [SonarLint](https://www.sonarsource.com/products/sonarlint/)
- **Monitoring Tools**: [Sentry](https://sentry.io/)
- **Website analytics tool**: [GoogleAnalytics](https://developers.google.com/analytics/)

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/FriendshipHouse/catholic-friendship-app.git

# Navigate to the project folder
cd catholic-friendship-app

# Install dependencies
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The main structure of the project is as follows:

```plaintext
.
├── public/                       # Static assets such as images
├── messages/
│   ├── en-US.json                # Translation messages in en-US
│   └── zh-TW.json                # Translation messages in zh-TW
│
├── src/
│   └── app/
│   │   └── [locale]
│   │   │   ├── layout.tsx        # Application layout component
│   │   │   └── page.tsx          # Main entry point for the application
│   │   │
│   │   └── api/                  # Backend routes and handlers for application
│   │
│   ├── i18n/                     # Localization files for i18n
│   ├── components/               # Reusable React components
│   ├── hooks/                    # Reusable customized hooks for API
│   ├── jotai/                    # Reusable customized status
│   ├── lib/                      # Files of nextAuth, MongoDB, Axios config
│   ├── models/                   # Mongoose schema definitions for MongoDB
│   └── middleware.ts             # Middleware for i18n routing
│
├── next.config.mjs               # Configuration of i18n, Sentry and Next image
└── tailwind.config.ts            # Configuration of tailwind
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
