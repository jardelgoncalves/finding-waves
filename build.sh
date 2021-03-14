rm -rf ./dist;

./node_modules/.bin/etsc;
mv ./dist/api-schema.json ./dist/src
