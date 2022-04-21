import oldGuides from './lib/old/main';
import newGuides from './lib/new/main';

const DEFAULT_PATH = '/home/codio/workspace';

console.log('Start');

const path = process.env.CODIO_PROJECT_PATH || DEFAULT_PATH;

oldGuides.loadAssessments(path).then((jsonStructure) => {
  console.log('Saving assessments...');
  return newGuides.saveAssessments(jsonStructure, path);
})
  .then(() => oldGuides.cleanup(path))
  .then(() => {
    console.error('Guides were converted. Please start editor again');
  })
  .catch(() => {
    console.error('The conversion failed. Please contact with codio support team.');
  });
