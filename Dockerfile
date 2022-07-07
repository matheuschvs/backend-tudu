FROM node:16.15.1

RUN apt update

WORKDIR /usr/app

COPY ["package.json", "yarn.lock"] ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]