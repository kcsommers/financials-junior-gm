if [ -z ${1} ]
then
  echo "Please specify a package!"
else
  echo "Starting dev server for ${1}..."
  npx concurrently "npx lerna run dev --scope @statrookie/core" "npx lerna run dev --scope @statrookie/${1}"
fi