FROM public.docker.nexus3.auiag.corp/node:14

WORKDIR /usr/app

ARG NPM_REGISTRY="http://registry.npmjs.org"
ARG HTTP_PROXY="http://proxy.auiag.corp:8080"
ARG HTTPS_PROXY="http://proxy.auiag.corp:8080"

ARG NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false

COPY . /usr/app/
RUN HTTP_PROXY=${HTTP_PROXY} HTTPS_PROXY=${HTTPS_PROXY} npm install --strict-ssl=false --registry ${NPM_REGISTRY}
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "serve" ]
