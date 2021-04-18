import * as babelTypes from '@babel/types';
export declare function visitor_SUCCESSFUL(node: babelTypes.Node, test?: boolean): string | {
    alias: string | number | boolean;
    aliasType: number;
    mustExclude: boolean;
    mayExclude: boolean;
} | {
    alias: string | number | boolean;
    aliasType: number;
    mustExclude?: undefined;
    mayExclude?: undefined;
} | {
    alias: string | number | boolean;
    aliasType: number;
    mayExclude: boolean;
    mustExclude?: undefined;
} | null;
export declare function visitor_NONLITERAL(n: babelTypes.Node): {
    alias: string;
    mustExclude: boolean;
    mayExclude: boolean;
} | null;
export declare function visitor_MALFORMED(n: babelTypes.Node): {
    alias: string;
} | null;
export declare function visitor_USESCWD(n: babelTypes.Node): {
    alias: string;
} | null;
declare type VisitorFunction = (node: babelTypes.Node, trying?: boolean) => boolean;
export declare function parse(body: string): babelTypes.File;
export declare function detect(body: string, visitor: VisitorFunction): void;
export {};
//# sourceMappingURL=detector.d.ts.map