if [ -z ${1} ]
then
  echo "Please specify a package!"
else
  echo "Building ${1}..."
  npx lerna run build --scope @statrookie/"${1}" --verbose
fi