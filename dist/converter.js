var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("lib/old/main", ["require", "exports", "fs"], function (require, exports, fs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs_1 = __importDefault(fs_1);
    const GUIDES_PATH = '/.guides/';
    const loadAssessments = (path) => __awaiter(void 0, void 0, void 0, function* () { return fs_1.default.promises.readFile(`${path}${GUIDES_PATH}assessments.json`, 'utf-8').then((content) => JSON.parse(content)); });
    const cleanup = (path) => __awaiter(void 0, void 0, void 0, function* () {
        const assessmentPromise = fs_1.default.promises.unlink(`${path}${GUIDES_PATH}assessments.json`);
        return Promise.all([assessmentPromise]);
    });
    exports.default = {
        loadAssessments,
        cleanup,
    };
});
define("lib/new/save", ["require", "exports", "fs"], function (require, exports, fs_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs_2 = __importDefault(fs_2);
    const write = (file, data) => {
        console.log(`Writing ${file}...`);
        return fs_2.default.promises.writeFile(file, data);
    };
    const createFolder = (path) => fs_2.default.promises.stat(path)
        .catch(() => {
        console.log(`Creating "${path}" Folder...`);
        return fs_2.default.promises.mkdir(path);
    });
    exports.default = (path, fileName, content) => createFolder(path).then(() => write(`${path}/${fileName}`, content));
});
define("lib/new/main", ["require", "exports", "lib/new/save"], function (require, exports, save_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    save_1 = __importDefault(save_1);
    const GUIDES_PATH = '/.guides/';
    const saveAssessments = (path, jsonStructure) => {
        const promises = jsonStructure.map((assessment) => __awaiter(void 0, void 0, void 0, function* () { return (0, save_1.default)(`${path}${GUIDES_PATH}assessments`, assessment.taskId, JSON.stringify(assessment, null, 2)); }));
        return Promise.all(promises);
    };
    exports.default = {
        saveAssessments,
    };
});
define("main", ["require", "exports", "lib/old/main", "lib/new/main"], function (require, exports, main_1, main_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    main_1 = __importDefault(main_1);
    main_2 = __importDefault(main_2);
    const DEFAULT_PATH = '/home/codio/workspace';
    console.log('Start');
    const path = process.env.CODIO_PROJECT_PATH || DEFAULT_PATH;
    main_1.default.loadAssessments(path).then((jsonStructure) => {
        console.log('Saving assessments...');
        return main_2.default.saveAssessments(jsonStructure, path);
    })
        .then(() => main_1.default.cleanup(path))
        .then(() => {
        console.error('Guides were converted. Please start editor again');
    })
        .catch(() => {
        console.error('The conversion failed. Please contact with codio support team.');
    });
});
