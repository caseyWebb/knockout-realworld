./scripts/build.sh

cd ./dist

git init
git add .
git commit -m "chore(publish)"
git push -fu git@github.com:caseyWebb/knockout-realworld master:gh-pages