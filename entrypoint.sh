#!/bin/bash

npx --yes prisma migrate deploy
exec node /app/server.js "@"