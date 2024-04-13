#!/bin/bash

repo_url="https://github.com/MRR-Group/steam-buddy"

echo "search for latest release"
latest_release=$(gh release list --limit 1 --json tagName --jq '.[0].tagName' --repo $repo_url)
echo "found $latest_release"

echo "downloading $latest_release"
gh release download "$latest_release"  --repo $repo_url
echo "$latest_release downloaded"