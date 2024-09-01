FROM node:20-bookworm-slim

WORKDIR /workspaces/Frontend
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get install -y git \
    && apt-get install -y sudo

RUN npm i -g next@latest react@latest react-dom@latest
    
USER root
