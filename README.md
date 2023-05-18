# Openai-Exp

![pepe](https://www.icegif.com/wp-content/uploads/2023/01/icegif-804.gif)

## Info
This is a side project to test the OpenAI API. The idea is to create a web app where you can create images with the help of the OpenAI API.
And also, I want to test the [Clerk](https://clerk.dev/) authentication system.


## Powered by Vercel 
[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)

## Features
- [x] Login with Clerk
- [x] Base template
- [x] OpenAI API
- [x] Create image
- [x] Edit image (conversion for *jpeg* implemented)
- [ ] Variations of the image
- [ ] Save image on cloudinary (prepare setup for integration)


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

### Utils 
- [OpenAI API](https://beta.openai.com/docs/introduction)
- [OpenAI API - Playground](https://beta.openai.com/playground)
- [OpenAI API - Playground - Examples](https://beta.openai.com/examples)
- [OpenAI API - Playground - Examples - Image Completation](https://beta.openai.com/examples/default-image-completion)