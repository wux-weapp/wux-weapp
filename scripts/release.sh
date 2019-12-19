#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  if [[ -z $SKIP_TESTS ]]; then
    npm run lint
  fi

  # remove old builds
  rm -rf ./packages

  # build
  VERSION=$VERSION npm run build

  # update packages
  npm version "$VERSION"
  npm publish

  # commit
  git add -A
  git commit -m "$VERSION release"

  # publish
  git push
  git tag v"$VERSION"
  git push origin --tags

fi
