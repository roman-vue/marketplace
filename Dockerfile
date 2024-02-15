FROM node:12 as builder

WORKDIR /source/build

COPY src ./src

COPY *.json ./

RUN ["npm","i"]

RUN ["npm","run","build"]

FROM node:12-alpine as runner

WORKDIR /source/runner

COPY --from=builder /source/build/node_modules ./node_modules

COPY --from=builder /source/build/dist ./dist

COPY --from=builder /source/build/*.json ./

EXPOSE 3000

CMD ["npm","run","start:prod"]