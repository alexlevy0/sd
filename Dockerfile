FROM oven/bun:1.1.6 
WORKDIR /usr/src/app
COPY . .
RUN bun install --production
RUN bun run build
USER bun
EXPOSE 3000
ENTRYPOINT ["./server.bun"]
