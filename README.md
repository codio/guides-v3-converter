# guides-v3-converter

## Version 2

Assessments are saved as one file ```.guides/assessments.json```

## Version 3

Every assessment has it content in a separate file located in ```.guides/assessments/``` folder.

# Converter

to start conversion run in the terminal:

```
    curl https://raw.githubusercontent.com/codio/guides-v3-converter/master/build/converter.js | node
```

this will download the latest version of convert guides in your workspace directory

*CODIO_PROJECT_PATH* environment variable is used to specify path to codio project if it differs from the default ```/home/coio/workspace```

# Build

```
   npm run build
```

# Deploy

```
   npm run build
```

commit changes and push the new version of script to the repo.
