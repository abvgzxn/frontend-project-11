install:
    npm install
lint:
    npx eslint .
develop:
    npx vite
build:
    npx vite build
sonar:
    npx sonarqube-scanner