#!/bin/sh

npm run build && npx cap sync && cd ./android && ./gradlew build && cd ..
