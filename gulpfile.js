const path = require('path');
const { task, src, dest, series, parallel } = require('gulp');

task('build:icons', copyIcons);
task('build:readme', copyReadme);
task('build:assets', parallel(copyIcons, copyReadme));

function copyIcons() {
  const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
  const nodeDestination = path.resolve('dist', 'nodes');

  const credSource = path.resolve('credentials', '**', '*.{png,svg}');
  const credDestination = path.resolve('dist', 'credentials');

  return Promise.all([
    new Promise((resolve, reject) => {
      src(nodeSource)
          .pipe(dest(nodeDestination))
          .on('end', resolve)
          .on('error', reject);
    }),
    new Promise((resolve, reject) => {
      src(credSource)
          .pipe(dest(credDestination))
          .on('end', resolve)
          .on('error', reject);
    }),
  ]);
}

function copyReadme() {
  return src('README.md').pipe(dest('dist'));
}