# Openai-Exp with Next.js@latest
![pepe](https://www.icegif.com/wp-content/uploads/2023/01/icegif-804.gif)

## Info
This is a side project to test the OpenAI API. The idea is to create a web app where you can create images with the help of the OpenAI API.
And also, I want to test the [Clerk](https://clerk.dev/) authentication system.


## Structure of the project
```

.
├── app
│   ├── api
│   │   ├── cloudinary
│   │   │   └── insertByUrl
│   │   │       └── route.js
│   │   ├── mongo
│   │   │   └── insert
│   │   │       └── route.js
│   │   └── result
│   │       └── route.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── lab
│   │   ├── error.js
│   │   ├── loading.js
│   │   └── page.js
│   ├── layout.js
│   ├── not-found.js
│   ├── page.js
│   ├── result
│   │   ├── error.js
│   │   ├── loading.js
│   │   └── page.js
│   ├── sign-in
│   │   └── [[...sign-in]]
│   │       └── page.js
│   └── sign-up
│       └── [[...sign-up]]
│           └── page.js
├── components
│   ├── dashboard
│   │   ├── createImage
│   │   │   └── index.js
│   │   ├── subDescription
│   │   │   └── index.js
│   │   ├── title
│   │   │   └── index.js
│   │   ├── uploader
│   │   │   └── index.js
│   │   ├── uploaderImage
│   │   │   └── index.js
│   │   └── variationUploader
│   │       └── index.js
│   ├── home
│   │   ├── descriptions
│   │   │   └── firstPage.js
│   │   └── goToLab
│   │       └── index.js
│   ├── layout
│   │   ├── footer
│   │   │   └── index.js
│   │   ├── header
│   │   │   └── index.js
│   │   ├── loader
│   │   │   └── index.js
│   │   └── title
│   │       └── index.js
│   ├── result
│   │   ├── cardList.js
│   │   └── table.js
│   └── shared
│       └── alert
│           └── index.js
└── middleware.js
```

33 directories, 32 files

## Features
- [x] Login with Clerk
- [x] Base template
- [x] OpenAI API
- [x] Create image
- [x] Edit image (conversion for *jpeg* implemented)
- [ ] Handling errors (started...)
- [ ] e2e tests
- [x] Variations of the image
- [x] MongoDb Added for handling storage
- [x] Save image on cloudinary (prepare setup for integration)


## Installation
_If you want to test it, you need to create a .env file with the following variables:_
```
#OpenAI API
OPENAI_API_KEY=

#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

#Oauth Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/sign-in

```

For now there is not a database, so you need to create a user in the Clerk dashboard.

## Collaborations
If you want to collaborate, you can create a pull request or send me an email to: [me@albz.dev](me@albz.dev)


## Installation
```
yarn install
```
## Usage
```
yarn start
```
## License
[MIT](https://choosealicense.com/licenses/mit/)

____

### Source Used 
- [OpenAI API](https://beta.openai.com/docs/introduction)
- [DaisyUI](https://daisyui.com/)
- [Clerk](https://clerk.dev/)
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

## Powered by Vercel
[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)