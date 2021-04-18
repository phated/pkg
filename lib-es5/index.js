"use strict";
/* eslint-disable require-atomic-updates */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
var fs_extra_1 = require("fs-extra");
var pkg_fetch_1 = require("pkg-fetch");
var assert_1 = __importDefault(require("assert"));
var minimist_1 = __importDefault(require("minimist"));
var path_1 = __importDefault(require("path"));
var log_1 = require("./log");
var help_1 = __importDefault(require("./help"));
var common_1 = require("./common");
var packer_1 = __importDefault(require("./packer"));
var chmod_1 = require("./chmod");
var producer_1 = __importDefault(require("./producer"));
var refiner_1 = __importDefault(require("./refiner"));
var fabricator_1 = require("./fabricator");
var walker_1 = __importDefault(require("./walker"));
var version = JSON.parse(fs_extra_1.readFileSync(path_1.default.join(__dirname, '../package.json'), 'utf-8')).version;
function isConfiguration(file) {
    return common_1.isPackageJson(file) || file.endsWith('.config.json');
}
function exists(file) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_extra_1.stat(file)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// http://www.openwall.com/lists/musl/2012/12/08/4
var hostArch = pkg_fetch_1.system.hostArch, hostPlatform = pkg_fetch_1.system.hostPlatform, isValidNodeRange = pkg_fetch_1.system.isValidNodeRange, knownArchs = pkg_fetch_1.system.knownArchs, knownPlatforms = pkg_fetch_1.system.knownPlatforms, toFancyArch = pkg_fetch_1.system.toFancyArch, toFancyPlatform = pkg_fetch_1.system.toFancyPlatform;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
var hostNodeRange = "node" + process.version.match(/^v(\d+)/)[1];
function parseTargets(items) {
    var e_1, _a, e_2, _b;
    // [ 'node6-macos-x64', 'node6-linux-x64' ]
    var targets = [];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            var target = {
                nodeRange: hostNodeRange,
                platform: hostPlatform,
                arch: hostArch,
            };
            if (item !== 'host') {
                try {
                    for (var _c = (e_2 = void 0, __values(item.split('-'))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var token = _d.value;
                        if (!token) {
                            continue;
                        }
                        if (isValidNodeRange(token)) {
                            target.nodeRange = token;
                            continue;
                        }
                        var p = toFancyPlatform(token);
                        if (knownPlatforms.indexOf(p) >= 0) {
                            target.platform = p;
                            continue;
                        }
                        var a = toFancyArch(token);
                        if (knownArchs.indexOf(a) >= 0) {
                            target.arch = a;
                            continue;
                        }
                        throw log_1.wasReported("Unknown token '" + token + "' in '" + item + "'");
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            targets.push(target);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return targets;
}
function stringifyTarget(target) {
    var nodeRange = target.nodeRange, platform = target.platform, arch = target.arch;
    return nodeRange + "-" + platform + "-" + arch;
}
function differentParts(targets) {
    var e_3, _a;
    var nodeRanges = {};
    var platforms = {};
    var archs = {};
    try {
        for (var targets_1 = __values(targets), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
            var target = targets_1_1.value;
            nodeRanges[target.nodeRange] = true;
            platforms[target.platform] = true;
            archs[target.arch] = true;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (targets_1_1 && !targets_1_1.done && (_a = targets_1.return)) _a.call(targets_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var result = {};
    if (Object.keys(nodeRanges).length > 1) {
        result.nodeRange = true;
    }
    if (Object.keys(platforms).length > 1) {
        result.platform = true;
    }
    if (Object.keys(archs).length > 1) {
        result.arch = true;
    }
    return result;
}
function stringifyTargetForOutput(output, target, different) {
    var a = [output];
    if (different.nodeRange) {
        a.push(target.nodeRange);
    }
    if (different.platform) {
        a.push(target.platform);
    }
    if (different.arch) {
        a.push(target.arch);
    }
    return a.join('-');
}
function fabricatorForTarget(target) {
    var nodeRange = target.nodeRange, arch = target.arch;
    return { nodeRange: nodeRange, platform: hostPlatform, arch: arch };
}
var dryRunResults = {};
function needWithDryRun(_a) {
    var forceBuild = _a.forceBuild, nodeRange = _a.nodeRange, platform = _a.platform, arch = _a.arch;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, pkg_fetch_1.need({
                        dryRun: true,
                        forceBuild: forceBuild,
                        nodeRange: nodeRange,
                        platform: platform,
                        arch: arch,
                    })];
                case 1:
                    result = _b.sent();
                    assert_1.default(['exists', 'fetched', 'built'].indexOf(result) >= 0);
                    dryRunResults[result] = true;
                    return [2 /*return*/];
            }
        });
    });
}
var targetsCache = {};
function needViaCache(target) {
    return __awaiter(this, void 0, void 0, function () {
        var s, c, forceBuild, nodeRange, platform, arch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    s = stringifyTarget(target);
                    c = targetsCache[s];
                    if (c) {
                        return [2 /*return*/, c];
                    }
                    forceBuild = target.forceBuild, nodeRange = target.nodeRange, platform = target.platform, arch = target.arch;
                    return [4 /*yield*/, pkg_fetch_1.need({
                            forceBuild: forceBuild,
                            nodeRange: nodeRange,
                            platform: platform,
                            arch: arch,
                        })];
                case 1:
                    c = _a.sent();
                    targetsCache[s] = c;
                    return [2 /*return*/, c];
            }
        });
    });
}
function exec(argv2) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var argv, forceBuild, input, inputJson, inputJsonName, _b, _c, inputBin, bin, inputFin, config, configJson, output, outputPath, autoOutput, name_1, ext, sTargets, targets, jsonTargets, different, targets_2, targets_2_1, target, file, bakes, targets_3, targets_3_1, target, bytecode, targets_4, targets_4_1, target, e_4_1, targets_5, targets_5_1, target, _d, f, _e, e_5_1, marker, params, records, entrypoint, symLinks, addition, walkResult, refineResult, backpack, targets_6, targets_6_1, target, _f, e_6_1;
        var e_7, _g, e_8, _h, e_4, _j, e_5, _k, e_6, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    argv = minimist_1.default(argv2, {
                        boolean: [
                            'b',
                            'build',
                            'bytecode',
                            'd',
                            'debug',
                            'h',
                            'help',
                            'public',
                            'v',
                            'version',
                        ],
                        string: [
                            '_',
                            'c',
                            'config',
                            'o',
                            'options',
                            'output',
                            'outdir',
                            'out-dir',
                            'out-path',
                            'public-packages',
                            't',
                            'target',
                            'targets',
                        ],
                        default: { bytecode: true },
                    });
                    if (argv.h || argv.help) {
                        help_1.default();
                        return [2 /*return*/];
                    }
                    // version
                    if (argv.v || argv.version) {
                        // eslint-disable-next-line no-console
                        console.log(version);
                        return [2 /*return*/];
                    }
                    log_1.log.info("pkg@" + version);
                    // debug
                    log_1.log.debugMode = argv.d || argv.debug;
                    forceBuild = argv.b || argv.build;
                    // _
                    if (!argv._.length) {
                        throw log_1.wasReported('Entry file/directory is expected', [
                            'Pass --help to see usage information',
                        ]);
                    }
                    if (argv._.length > 1) {
                        throw log_1.wasReported('Not more than one entry file/directory is expected');
                    }
                    input = path_1.default.resolve(argv._[0]);
                    return [4 /*yield*/, exists(input)];
                case 1:
                    if (!(_m.sent())) {
                        throw log_1.wasReported('Input file does not exist', [input]);
                    }
                    return [4 /*yield*/, fs_extra_1.stat(input)];
                case 2:
                    if (!(_m.sent()).isDirectory()) return [3 /*break*/, 4];
                    input = path_1.default.join(input, 'package.json');
                    return [4 /*yield*/, exists(input)];
                case 3:
                    if (!(_m.sent())) {
                        throw log_1.wasReported('Input file does not exist', [input]);
                    }
                    _m.label = 4;
                case 4:
                    if (!isConfiguration(input)) return [3 /*break*/, 6];
                    _c = (_b = JSON).parse;
                    return [4 /*yield*/, fs_extra_1.readFile(input, 'utf-8')];
                case 5:
                    inputJson = _c.apply(_b, [_m.sent()]);
                    inputJsonName = inputJson.name;
                    if (inputJsonName) {
                        inputJsonName = inputJsonName.split('/').pop(); // @org/foo
                    }
                    _m.label = 6;
                case 6:
                    if (!inputJson) return [3 /*break*/, 8];
                    bin = inputJson.bin;
                    if (!bin) return [3 /*break*/, 8];
                    if (typeof bin === 'object') {
                        if (bin[inputJsonName]) {
                            bin = bin[inputJsonName];
                        }
                        else {
                            bin = bin[Object.keys(bin)[0]]; // TODO multiple inputs to pkg them all?
                        }
                    }
                    inputBin = path_1.default.resolve(path_1.default.dirname(input), bin);
                    return [4 /*yield*/, exists(inputBin)];
                case 7:
                    if (!(_m.sent())) {
                        throw log_1.wasReported('Bin file does not exist (taken from package.json ' +
                            "'bin' property)", [inputBin]);
                    }
                    _m.label = 8;
                case 8:
                    if (inputJson && !inputBin) {
                        throw log_1.wasReported("Property 'bin' does not exist in", [input]);
                    }
                    inputFin = inputBin || input;
                    config = argv.c || argv.config;
                    if (inputJson && config) {
                        throw log_1.wasReported("Specify either 'package.json' or config. Not both");
                    }
                    if (!config) return [3 /*break*/, 10];
                    config = path_1.default.resolve(config);
                    return [4 /*yield*/, exists(config)];
                case 9:
                    if (!(_m.sent())) {
                        throw log_1.wasReported('Config file does not exist', [config]);
                    }
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    configJson = require(config); // may be either json or js
                    if (!configJson.name &&
                        !configJson.files &&
                        !configJson.dependencies &&
                        !configJson.pkg) {
                        // package.json not detected
                        configJson = { pkg: configJson };
                    }
                    _m.label = 10;
                case 10:
                    output = argv.o || argv.output;
                    outputPath = argv['out-path'] || argv.outdir || argv['out-dir'];
                    autoOutput = false;
                    if (output && outputPath) {
                        throw log_1.wasReported("Specify either 'output' or 'out-path'. Not both");
                    }
                    if (!output) {
                        if (inputJson) {
                            name_1 = inputJsonName;
                            if (!name_1) {
                                throw log_1.wasReported("Property 'name' does not exist in", [argv._[0]]);
                            }
                        }
                        else if (configJson) {
                            name_1 = configJson.name;
                        }
                        if (!name_1) {
                            name_1 = path_1.default.basename(inputFin);
                        }
                        if (!outputPath) {
                            if (inputJson && inputJson.pkg) {
                                outputPath = inputJson.pkg.outputPath;
                            }
                            else if (configJson && configJson.pkg) {
                                outputPath = configJson.pkg.outputPath;
                            }
                            outputPath = outputPath || '';
                        }
                        autoOutput = true;
                        ext = path_1.default.extname(name_1);
                        output = name_1.slice(0, -ext.length || undefined);
                        output = path_1.default.resolve(outputPath || '', output);
                    }
                    else {
                        output = path_1.default.resolve(output);
                    }
                    sTargets = argv.t || argv.target || argv.targets || '';
                    if (typeof sTargets !== 'string') {
                        throw log_1.wasReported("Something is wrong near " + JSON.stringify(sTargets));
                    }
                    targets = parseTargets(sTargets.split(',').filter(function (t) { return t; }));
                    if (!targets.length) {
                        jsonTargets = void 0;
                        if (inputJson && inputJson.pkg) {
                            jsonTargets = inputJson.pkg.targets;
                        }
                        else if (configJson && configJson.pkg) {
                            jsonTargets = configJson.pkg.targets;
                        }
                        if (jsonTargets) {
                            targets = parseTargets(jsonTargets);
                        }
                    }
                    if (!targets.length) {
                        if (!autoOutput) {
                            targets = parseTargets(['host']);
                            assert_1.default(targets.length === 1);
                        }
                        else {
                            targets = parseTargets(['linux', 'macos', 'win']);
                        }
                        log_1.log.info('Targets not specified. Assuming:', "" + targets.map(function (t) { return stringifyTarget(t); }).join(', '));
                    }
                    different = differentParts(targets);
                    try {
                        // targets[].output
                        for (targets_2 = __values(targets), targets_2_1 = targets_2.next(); !targets_2_1.done; targets_2_1 = targets_2.next()) {
                            target = targets_2_1.value;
                            file = void 0;
                            if (targets.length === 1) {
                                file = output;
                            }
                            else {
                                file = stringifyTargetForOutput(output, target, different);
                            }
                            if (target.platform === 'win' && path_1.default.extname(file) !== '.exe') {
                                file += '.exe';
                            }
                            target.output = file;
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (targets_2_1 && !targets_2_1.done && (_g = targets_2.return)) _g.call(targets_2);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    bakes = (argv.options || '')
                        .split(',')
                        .filter(function (bake) { return bake; })
                        .map(function (bake) { return "--" + bake; });
                    try {
                        // check if input is going
                        // to be overwritten by output
                        for (targets_3 = __values(targets), targets_3_1 = targets_3.next(); !targets_3_1.done; targets_3_1 = targets_3.next()) {
                            target = targets_3_1.value;
                            if (target.output === inputFin) {
                                if (autoOutput) {
                                    target.output += "-" + target.platform;
                                }
                                else {
                                    throw log_1.wasReported('Refusing to overwrite input file', [inputFin]);
                                }
                            }
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (targets_3_1 && !targets_3_1.done && (_h = targets_3.return)) _h.call(targets_3);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    bytecode = argv.bytecode;
                    _m.label = 11;
                case 11:
                    _m.trys.push([11, 17, 18, 19]);
                    targets_4 = __values(targets), targets_4_1 = targets_4.next();
                    _m.label = 12;
                case 12:
                    if (!!targets_4_1.done) return [3 /*break*/, 16];
                    target = targets_4_1.value;
                    target.forceBuild = forceBuild;
                    return [4 /*yield*/, needWithDryRun(target)];
                case 13:
                    _m.sent();
                    target.fabricator = fabricatorForTarget(target);
                    if (!bytecode) return [3 /*break*/, 15];
                    return [4 /*yield*/, needWithDryRun(__assign(__assign({}, target.fabricator), { forceBuild: forceBuild }))];
                case 14:
                    _m.sent();
                    _m.label = 15;
                case 15:
                    targets_4_1 = targets_4.next();
                    return [3 /*break*/, 12];
                case 16: return [3 /*break*/, 19];
                case 17:
                    e_4_1 = _m.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 19];
                case 18:
                    try {
                        if (targets_4_1 && !targets_4_1.done && (_j = targets_4.return)) _j.call(targets_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 19:
                    if (dryRunResults.fetched && !dryRunResults.built) {
                        log_1.log.info('Fetching base Node.js binaries to PKG_CACHE_PATH');
                    }
                    _m.label = 20;
                case 20:
                    _m.trys.push([20, 27, 28, 29]);
                    targets_5 = __values(targets), targets_5_1 = targets_5.next();
                    _m.label = 21;
                case 21:
                    if (!!targets_5_1.done) return [3 /*break*/, 26];
                    target = targets_5_1.value;
                    _d = target;
                    return [4 /*yield*/, needViaCache(target)];
                case 22:
                    _d.binaryPath = _m.sent();
                    f = target.fabricator;
                    if (!(f && bytecode)) return [3 /*break*/, 25];
                    _e = f;
                    return [4 /*yield*/, needViaCache(f)];
                case 23:
                    _e.binaryPath = _m.sent();
                    if (!(f.platform !== 'win')) return [3 /*break*/, 25];
                    return [4 /*yield*/, chmod_1.plusx(f.binaryPath)];
                case 24:
                    _m.sent();
                    _m.label = 25;
                case 25:
                    targets_5_1 = targets_5.next();
                    return [3 /*break*/, 21];
                case 26: return [3 /*break*/, 29];
                case 27:
                    e_5_1 = _m.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 29];
                case 28:
                    try {
                        if (targets_5_1 && !targets_5_1.done && (_k = targets_5.return)) _k.call(targets_5);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 29:
                    if (configJson) {
                        marker = {
                            config: configJson,
                            base: path_1.default.dirname(config),
                            configPath: config,
                        };
                    }
                    else {
                        marker = {
                            config: inputJson || {},
                            base: path_1.default.dirname(input),
                            configPath: input,
                        };
                    }
                    marker.toplevel = true;
                    params = {};
                    if (argv.public) {
                        params.publicToplevel = true;
                    }
                    if (argv['public-packages']) {
                        params.publicPackages = argv['public-packages'].split(',');
                        if (((_a = params.publicPackages) === null || _a === void 0 ? void 0 : _a.indexOf('*')) !== -1) {
                            params.publicPackages = ['*'];
                        }
                    }
                    entrypoint = inputFin;
                    addition = isConfiguration(input) ? input : undefined;
                    return [4 /*yield*/, walker_1.default(marker, entrypoint, addition, params)];
                case 30:
                    walkResult = _m.sent();
                    entrypoint = walkResult.entrypoint;
                    records = walkResult.records;
                    symLinks = walkResult.symLinks;
                    refineResult = refiner_1.default(records, entrypoint, symLinks);
                    entrypoint = refineResult.entrypoint;
                    records = refineResult.records;
                    symLinks = refineResult.symLinks;
                    backpack = packer_1.default({ records: records, entrypoint: entrypoint, bytecode: bytecode, symLinks: symLinks });
                    log_1.log.debug('Targets:', JSON.stringify(targets, null, 2));
                    _m.label = 31;
                case 31:
                    _m.trys.push([31, 46, 47, 48]);
                    targets_6 = __values(targets), targets_6_1 = targets_6.next();
                    _m.label = 32;
                case 32:
                    if (!!targets_6_1.done) return [3 /*break*/, 45];
                    target = targets_6_1.value;
                    _f = target.output;
                    if (!_f) return [3 /*break*/, 34];
                    return [4 /*yield*/, exists(target.output)];
                case 33:
                    _f = (_m.sent());
                    _m.label = 34;
                case 34:
                    if (!_f) return [3 /*break*/, 39];
                    return [4 /*yield*/, fs_extra_1.stat(target.output)];
                case 35:
                    if (!(_m.sent()).isFile()) return [3 /*break*/, 37];
                    return [4 /*yield*/, fs_extra_1.remove(target.output)];
                case 36:
                    _m.sent();
                    return [3 /*break*/, 38];
                case 37: throw log_1.wasReported('Refusing to overwrite non-file output', [
                    target.output,
                ]);
                case 38: return [3 /*break*/, 41];
                case 39:
                    if (!target.output) return [3 /*break*/, 41];
                    return [4 /*yield*/, fs_extra_1.mkdirp(path_1.default.dirname(target.output))];
                case 40:
                    _m.sent();
                    _m.label = 41;
                case 41: return [4 /*yield*/, producer_1.default({
                        backpack: backpack,
                        bakes: bakes,
                        slash: target.platform === 'win' ? '\\' : '/',
                        target: target,
                        symLinks: symLinks,
                    })];
                case 42:
                    _m.sent();
                    if (!(target.platform !== 'win' && target.output)) return [3 /*break*/, 44];
                    return [4 /*yield*/, chmod_1.plusx(target.output)];
                case 43:
                    _m.sent();
                    _m.label = 44;
                case 44:
                    targets_6_1 = targets_6.next();
                    return [3 /*break*/, 32];
                case 45: return [3 /*break*/, 48];
                case 46:
                    e_6_1 = _m.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 48];
                case 47:
                    try {
                        if (targets_6_1 && !targets_6_1.done && (_l = targets_6.return)) _l.call(targets_6);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 48:
                    fabricator_1.shutdown();
                    return [2 /*return*/];
            }
        });
    });
}
exports.exec = exec;
//# sourceMappingURL=index.js.map