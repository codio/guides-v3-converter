import save from './save';

const GUIDES_PATH = '/.guides/';

const saveAssessments = (path, jsonStructure) => {
  const promises = jsonStructure.map(async (assessment) => save(`${path}${GUIDES_PATH}assessments`, assessment.taskId, JSON.stringify(assessment, null, 2)));
  return Promise.all(promises);
};

export default {
  saveAssessments,
};
