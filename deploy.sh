set -e
shopt -s extglob

TEMP_PATH="docs/.temp"

# build docs
npm run doc:build

rm -rf $TEMP_PATH
# prepare deploy
mkdir $TEMP_PATH
cd $TEMP_PATH
git init
git pull git@github.com:charlzyx/typings.git gh-pages
mv ../../dist/* .
rm -rf ../../dist

# commit and push changes
git add -A
git commit --am -m "build: deploy documentation"
git push -f git@github.com:charlzyx/typings.git master:gh-pages

# clean
cd -
rm -rf $TEMP_PATH
