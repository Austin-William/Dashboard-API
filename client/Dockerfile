FROM node:14.15.1

LABEL version="1.0.0"
LABEL description="Client side which user can interact with the server"
LABEL maintainer="austin-william.lo@epitech.eu | vincent.pichot@epitech.eu"
LABEL author="Austin-William Lo | Vincent Pichot"

WORKDIR /client
COPY ["package.json", "/client/"]
RUN npm install
COPY . /client
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]