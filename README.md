# T3 GROCERY LIST APP WITH tRPC v10

This README is completely based on the new tRPC v10.

This a changelog kinda docs for the project I found at [Francisco Mendes's own implementation](https://github.com/FranciscoMendes10866/next-tailwind-trpc-prisma)

I'm a bit late in geting in tRPC so when I was ready to learn it, I met the v10. I couldn't understand anything.

So it happened that as I was looking for a [tRPC](https://trpc.io/docs) based project, I stumbled upon a [DEV](https://dev.to/) blog by [Francisco Mendes](https://dev.to/franciscomendes10866/build-a-full-stack-app-with-nextjs-tailwind-trpc-and-prisma-orm-4ail) about a full-stack project that included the T3 stack. I rushed at it. But what I was seeing in the docs was very different from what was in Francisco Mendes's blog TUT(Tutorial) and this was obviously because the blog was posted before the version 10 was released. And I didn't seem to find a way to specifically install v9 of tRPC.

I ignored the differences and tried to replicate the code but, there were errors popping out everywhere. I was getting impatient. It was then I decided to take the time to study the tRPC v10 docs and differences between the previous version i.e v9. I used one of the [starter apps](https://github.com/trpc/examples-next-prisma-starter) they provided on the website and started matching and I was finally able to make a break through.

It is the exact same project at **Francisco Mendes's** repo but with tRPC v10 implemented and some code comments too. Feel free to fork the repo or use it at a starting point if you're like me 😁.

## Table of Contents

- [T3 GROCERY LIST APP WITH tRPC v10](#t3-grocery-list-app-with-trpc-v10)
  - [Table of Contents](#table-of-contents)
    - [Screenshot](#screenshot)
    - [Built With](#built-with)
  - [Commands](#commands)
  - [Changelog](#changelog)
    - [Backend Changes](#backend-changes)
      - [Installation](#installation)
      - [Folder and FIle Structure](#folder-and-file-structure)
      - [Initialization](#initialization)
      - [Connecting tRPC to NextJs Api Routes](#connecting-trpc-to-nextjs-api-routes)
      - [Creating typesafe trpc hooks in Next the new tRPC way](#creating-typesafe-trpc-hooks-in-next-the-new-trpc-way)
    - [Frontend Changes](#frontend-changes)
      - [Consuming the APIs](#consuming-the-apis)
  - [Author](#author)
  - [Acknowledgements](#acknowledgements)

### Screenshot

The screenshot of the project:

![](./screenshot_1.png)

### Built With

The project was built with the T3 stack that consists of the following:

- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/docs)
- [tRPC](https://trpc.io/docs)
- [tailwindcss](https://tailwindcss.com/docs/)

**Note: you could also quickly bootstrap a new T3 stack project with the popular _create-t3-app_ CLI tool**

## Commands

---

```
git clone https://github.com/Multimarix/simple-next-trpc-grocery-list.git

cd simple-next-trpc-grocery-list

npm install

npx prisma migrate dev --name init

npm run dev
```

## Changelog

---

- [Backend Changes](#backend-changes)
  - [Installation](#installation)
  - [Folder and FIle Structure](#folder-and-file-structure)
  - [Initialization](#initialization)
  - [Connecting tRPC to NextJs Api Routes](#connecting-trpc-to-nextjs-api-routes)
  - [Creating typesafe trpc hooks in Next the new tRPC way](#creating-typesafe-trpc-hooks-in-next-the-new-trpc-way)
- [Frontend Changes](#frontend-changes)
  - [Consuming the APIs](#consuming-the-apis)

### Backend Changes

#### Installation

The first change I noticed from the tRPC v10 docs in contrast to Francisco Mendes's blog TUT was the installation step. It is now:

`npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query`

#### Folder and FIle Structure

The new version of tRPC(v10) has a new recommended file and folder structure which was used in this project which I would advise you to refer to the [docs](https://trpc.io/docs/nextjs#recommended-file-structure) for, to get adequate info about it.

#### Initialization

With the new tRPC version, we would now need to always create an initialization of trpc exactly **once** per application.

You can find the initialization of trpc in this project [here](/src/server/trpc.ts).

Of course you can check out the [docs](https://trpc.io/docs/router#initialize-trpc) if you want more info.

#### Connecting tRPC to NextJs Api Routes

We define routers inside a `routers` folder now. The code for that as far as this project is concerned didn't change at all however it's the location of the code that changed. I tried to adhere to the new recommended file and folder structure as much as possible so you would find the router definition in [here](/src/server/trpc.ts).

For more info, knock yourself out in the official docs [here](https://trpc.io/docs/nextjs#3-create-a-trpc-router)

#### Creating typesafe trpc hooks in Next the new tRPC way

This was one of the major changes for me. It is quite completely different from Francisco Mendes's blog TUT so this one was quite a hassle to change. (**_I never used trpc before 😅_**). The new way is using a new function called `createTRPCNext` which is imported from `@trpc/next`.

Again adhering to the new file and folder structure, you can find the code [here](/src/utils/trpc.ts). Basically, all this logic was removed from the `pages/_app.tsx` file and brought into the [utils/trpc.ts](/src/utils/trpc.ts) file leaving the [pages/\_app.tsx](/src/pages/_app.tsx) file a lot leaner as it should be.

[Official docs](https://trpc.io/docs/nextjs#4-create-trpc-hooks)

### Frontend Changes

#### Consuming the APIs

There wasn't a lot of changes on the frontend side. Making an API request just changed a tad bit. At the moment, procedures are now properties on the trpc object we import from the `utils` folder in the `src` folder of the project and the trpc hooks for consumption of the API's i.e **useQuery and the rest** are properties of these procedures. You can find these in the [pages/index.tsx](/src/pages/index.tsx) file.

So that's about it folks 😄😄.

Thank you very much for your time... 🤞🏾🤞🏾

## Author

- Github - [Multimarix](https://github.com/Multimarix)
- Frontend Mentor - [@Multimarix](https://www.frontendmentor.io/profile/Multimarix)
- LinkedIN - [Don Akhirebhulu](https://www.linkedin.com/in/don-akhirebhulu-675082242/)

## Acknowledgements

Prop to @FranciscoMendes10866 as, in any case, I still got to learn tRPC through his [blog TUT](https://dev.to/franciscomendes10866/build-a-full-stack-app-with-nextjs-tailwind-trpc-and-prisma-orm-4ail).
