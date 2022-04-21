import fs from 'fs';

const GUIDES_PATH = '/.guides/';

const loadAssessments = async (path) => fs.promises.readFile(`${path}${GUIDES_PATH}assessments.json`, 'utf-8').then((content) => JSON.parse(content));

const cleanup = async (path) => {
  const assessmentPromise = fs.promises.unlink(`${path}${GUIDES_PATH}assessments.json`);
  return Promise.all([assessmentPromise]);
};

export default {
  loadAssessments,
  cleanup,
};
