FROM node:8.11.3 AS build
ADD . /app
WORKDIR /app
RUN npm install --only=production

FROM gcr.io/distroless/nodejs
COPY --from=build /app /app
WORKDIR /app
EXPOSE 8000
CMD ["index.js"]