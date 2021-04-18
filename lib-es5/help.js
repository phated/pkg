"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
function help() {
    // eslint-disable-next-line no-console
    console.log("\n  " + chalk_1.default.bold('pkg') + " [options] <input>\n\n  " + chalk_1.default.dim('Options:') + "\n\n    -h, --help       output usage information\n    -v, --version    output pkg version\n    -t, --targets    comma-separated list of targets (see examples)\n    -c, --config     package.json or any json file with top-level config\n    --options        bake v8 options into executable to run with them on\n    -o, --output     output file name or template for several files\n    --out-path       path to save output one or more executables\n    -d, --debug      show more information during packaging process [off]\n    -b, --build      don't download prebuilt base binaries, build them\n    --public         speed up and disclose the sources of top-level project\n\n  " + chalk_1.default.dim('Examples:') + "\n\n  " + chalk_1.default.gray('–') + " Makes executables for Linux, macOS and Windows\n    " + chalk_1.default.cyan('$ pkg index.js') + "\n  " + chalk_1.default.gray('–') + " Takes package.json from cwd and follows 'bin' entry\n    " + chalk_1.default.cyan('$ pkg .') + "\n  " + chalk_1.default.gray('–') + " Makes executable for particular target machine\n    " + chalk_1.default.cyan('$ pkg -t node14-win-arm64 index.js') + "\n  " + chalk_1.default.gray('–') + " Makes executables for target machines of your choice\n    " + chalk_1.default.cyan('$ pkg -t node12-linux,node14-linux,node14-win index.js') + "\n  " + chalk_1.default.gray('–') + " Bakes '--expose-gc' into executable\n    " + chalk_1.default.cyan('$ pkg --options expose-gc index.js') + "\n");
}
exports.default = help;
//# sourceMappingURL=help.js.map