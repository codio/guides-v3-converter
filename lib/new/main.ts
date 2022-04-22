import save, { createFolder } from './save';

const GUIDES_PATH = '/.guides/';

const saveAssessments = async (path, jsonStructure) => {
  await createFolder(`${path}${GUIDES_PATH}assessments`);
  const promises = jsonStructure.map(async (assessment) => save(
    `${path}${GUIDES_PATH}assessments`,
    `${assessment.taskId}.json`,
    JSON.stringify(assessment, null, 2),
  ));
  return Promise.all(promises);
};

export default {
  saveAssessments,
};
