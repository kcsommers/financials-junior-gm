## This script is used by Vercel to determine whether it should rebuild the project
## The command lives at Settings->Git->Ignore build step
git diff HEAD^ HEAD --quiet ./packages/${1} ./packages/core
exit_status=$?
if [ $exit_status -eq 1 ]
then
  echo "Should build"
else
  echo "No build necessary"
fi