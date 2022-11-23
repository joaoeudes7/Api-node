FROM node:slim

ENV HOME=/home/app

EXPOSE 3000

COPY package.json yarn.lock ${HOME}/api/

WORKDIR ${HOME}/api/

RUN yarn install

COPY . ${HOME}/api/

RUN yarn build

CMD [ "yarn", "start" ]
