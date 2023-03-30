if [ -z ${1} ]
then
  echo "Please specify a package!"
else
  echo "Serving production build for ${1}..."
  npx lerna run start --scope @statrookie/"${1}" --verbose
fi