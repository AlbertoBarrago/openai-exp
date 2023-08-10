<div align="center">
<h1> Openai-Exp with Next.js@latest </h1>
<img src="https://gifdb.com/images/high/pepe-frog-meme-fancy-gentleman-winking-kqev0mndunc9yms2.gif" width="250" height="250"/>
</div>


## Version
#### 0.9.0
![GitHub](https://img.shields.io/github/license/AlbertoBarrago/openai-exp?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/AlbertoBarrago/openai-exp?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/AlbertoBarrago/openai-exp?style=for-the-badge)



## Info
This is a side project to test the OpenAI API. The idea is to create a web app where you can create images with the help of the OpenAI API.
And also, I want to test the [Clerk](https://clerk.dev/) authentication system.


## Structure of the project
```

.├── app
│   ├── [...not-found]
│   │   └── page.js
│   ├── api
│   │   ├── cloudinary
│   │   │   └── insertByUrl
│   │   │       └── route.js
│   │   ├── mongo
│   │   │   ├── getFilter
│   │   │   │   └── route.js
│   │   │   ├── getList
│   │   │   │   └── route.js
│   │   │   └── insert
│   │   │       ├── images
│   │   │       │   └── route.js
│   │   │       └── texts
│   │   │           └── route.js
│   │   └── openai
│   │       ├── images
│   │       │   └── create
│   │       │       └── route.js
│   │       └── text
│   │           └── route.js
│   ├── context
│   │   └── AppContext.js
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
│   ├── sign-up
│   │   └── [[...sign-up]]
│   │       └── page.js
│   └── text
│       ├── error.js
│       ├── loading.js
│       └── page.js
├── components
│   ├── commons
│   │   ├── modal
│   │   │   └── ask.js
│   │   └── scrollToTop
│   │       └── index.js
│   ├── home
│   │   ├── descriptions
│   │   │   └── firstPage.js
│   │   └── goToLab
│   │       └── index.js
│   ├── lab
│   │   ├── createImage
│   │   │   └── index.js
│   │   ├── subDescription
│   │   │   └── index.js
│   │   ├── title
│   │   │   └── index.js
│   │   ├── uploaderImage
│   │   │   └── index.js
│   │   ├── uploaderMask
│   │   │   └── index.js
│   │   └── variationUploader
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
│   │   ├── filter.js
│   │   ├── loadMore.js
│   │   └── table.js
│   ├── shared
│   │   └── alert
│   │       └── index.js
│   └── soundplayer
│       └── soundplayer.js
├── lib
│   └── openai-api.js
└── middleware.js

48 directories, 47 files
```

33 directories, 32 files

## Features
- [x] Login with Clerk
- [x] Base template
- [x] OpenAI API
- [x] Create image
- [x] Edit image (conversion for *jpeg* implemented)
- [x] Handling errors (started...)
- [x] Variations of the image
- [x] MongoDb Added for handling storage
- [x] Save image on cloudinary (prepare setup for integration)
- [x] Text integration with OpenAI API
- [x] Store image onMongo
- [ ] Retrive test from Mongo and show it
- [ ] Add section for chatBot 
- [ ] Improve my loader, now suck! 
- [ ] Please periodicaly check the code and refactor it ☺️
- [ ] e2e tests 

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