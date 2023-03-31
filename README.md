# StatRookie

## Summary

This is a browser based game designed for tablets (1024px X 768px screens), and built with Next.js. The monorepo is managed by lerna and yarn workspaces, with a `core` package containing all common, theme agnostic game logic and UI. Any teams added to the repo will be added as a new package, defining their own themes and assets and implementing their own versions of the `core` code.

### **Main technologies used**

Next.js, React, Typescript, Tailwind, SASS, Lerna, Yarn Workspaces

## Getting Started

To get started, run `yarn install` from the root of the project. Lerna will ensure that any dependecies that are common to all packages will be installed in the root `node_modules` folder, while dependencies unique to a package will be installed in that package's `node_modules` folder.

### **Dev Mode**

To spin up a dev environment, run `yarn run dev --{package-name}` from the root of the project, where `{package-name}` is the package that you want to start up. This will compile the `core` package as well as the one specified, and start a dev server on port `3000`.

### **Prod Mode**

To serve a production build locally, run `yarn run build --{package-name}` to build `core` and the specified package. Once the build is complete, run `yarn run start --{package-name}`. This starts up the application in production mode and serves it on port `3000`.

## Adding a New Team (Package)

In order to add a new team to the monorepo, a new package needs to be created in the `packages` directory. The easiest way to do it would be to simply copy an existing package, and make the necessary tweaks from there. The key changes that need to made are as follows:

### **Configs**

- `package.json` - update the name of the package, making sure it starts with `@statrookie/`. NOTE: this is the package name that you will pass to the `dev`, `build` and `start` scripts (without the `@statrookie/`).
- `next.config.js` - make sure the image domains are updated to include the domains where the assets for the new team are stored. NOTE: the `cloudinary` domain is required, as there are some images there that are common to all teams.
- `environments.js` - update `HOST_NAME` and `API_BASE_URL` if necessary.

### **Theme**

- `globals.scss` - update any necessary css variabled defined on `:root`. These variables are used in `tailwind.config.js` to set the colors for that theme. NOTE: for color variables be sure to use three numbers (rgb) without commas.
- `theme-colors.ts` - add the same colors from `globals.scss` here as rgb arrays

### **Assets**

- If any new/different fonts are used, add them in `assets/fonts`
- SVGs are placed at `components/svgs`- this is because throughout the project they are imported as React components using `@svgr/webpack`. Replace/add any new team specific svgs here.

### **Game**

- Update opposing teams, student teams and promotion videos where necessary.
- Make sure `get-team-logo` and `validate-pro-player` are updated appropriately

### **Tutorial**

- `mascot-configs.tsx` - mascot svgs and styles will be specific to each team and should be modified here. The configs in this file represent the default styles for each type of mascot svg. The slides in the `tutorial/slides/` directory reference these configs, and will likely need their positioning tweaked depending on the size/shape of the new mascot.

### **Pages**

- Update any team specific svgs or assets that have changed

## Deployment

Currently the sharks package is deployed on Vercel and can be referenced to easily deploy a new package.

### **Deploying a new package**

Take the following steps to deploy a new package on Vercel:

- From the Vercel dashboard, select Add new -> Project, and import the Statrookie git repository. NOTE: The free version of Vercel limits the number of projects that can be created from the same repository. So depending on how many exist, a plan upgrade may be required.
- Configure the build settings
  - **Build Command**
    ```
    yarn run build {package-name}
    ```
  - **Output Directory**
    ```
    packages/{package-name}/.next
    ```
  - **Install Command**
    ```
    yarn install
    ```
  - Root directory does not need to be modified
- Add script for Ignore Build Step
  - Because this is a monorepo and packages are deployed separately, we don't necessarily need to rebuild and redeploy on every new commit to the repo (which is Vercel's default behavior). In the `scripts` directory, there is a bash script `ignore-build.sh`, which checks if the specified package contains a change in the latest commit. We need to tell Vercel to run this script on every commit so it knows whether or not it should rebuild.
  - In the Vercel project, go to Settings -> Git and scroll down to the Ignored Build Step section. Enter the following command:
    ```
    bash scripts/ignore-build.sh {package-name}
    ```
  - Now if a commit was made containing a change to a different package, it will not trigger a new build for this project. NOTE: changes to **@statrookie/core** will trigger a rebuild as it is a dependency of all other packages.

### **Redeploy an existing package**

By default Vercel will build and redeploy the production build every time a change is pushed to the `main` branch (or whichever branch is specified as the production branch). So no action needs to be taken after changes are merged to `main`, just make sure the changes are tested and ready to go live!

### Previewing deploys

Also by default, Vercel creates a build with a unique url for every commit on every live branch in the repo. So whenever a change is pushed to any branch, the changes can be viewed live at a preview url found in the Deployments section of the Vercel project. NOTE: any of these preview builds can be promoted to the main production deployment.
