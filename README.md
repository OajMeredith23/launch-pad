# launch-pad

  

A front-end development starter kit, bringing Jekyll, SASS, BrowserSync, Babel, imagemin and CSSO together in 1 gulp build task.

This is strongly based on [ShakyShanes'](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) starter kit, any similarities are **not** a coincidence and credit for those areas where these environments are similar goes to him.

  
  

## System Preparation

  

You'll need this stuff installed to use this kit

  

1.  [Jekyll](http://jekyllrb.com/)

2.  [NodeJS](http://nodejs.org)

3.  [GulpJS](https://github.com/gulpjs/gulp)

  

## Installation

  

1. Clone this repo, or download it into a directory of your choice.

2. Inside the directory, run `npm install`.

  

## Usage

### Development mode

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

Simply navigate to your project directory in the terminal and run 'gulp' after installing the required dependencies.

  

```shell

$ gulp

```

  

## File Structure

### Build your project here
_DO NOT EDIT CSS FOLDER_ 
Only edit styles in _sass folder, the CSS folder is the outputted code. It's there for Jekyll's build process and to smooth CSS injection.
 - **_build** 
     - **_includes/**
        - **statics/** 
           - head.html
           - footer.html
     - **_layouts/**
        - default.html
     - **_sass/**
          - **0_reset/** 
              - normalize.scss
          - main.sass
      - **assets/**
      -  **css/**
          - main.css
       - **js/**
          - main.js
       - index.html
### Don't touch this
- **_site/**  
   - **css/** 
      - main.css  
   - **js/** 
      - main.js
   - index.html
### Edit these if you know what you're doing
- _config.yml 
- .babelrc
- .gitignore 
- gulpfile.json 
- package.json

    

  
  

**Jekyll**

The project is compiled into the _site folder with Jekyll, therefore you can use all the functionality Jekyll offers in their [docs](http://jekyllrb.com/docs/usage/)

