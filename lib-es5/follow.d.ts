import { SyncOpts } from 'resolve';
export declare const natives: any;
interface FollowOptions extends Pick<SyncOpts, 'basedir' | 'extensions' | 'packageFilter'> {
    ignoreFile?: string;
    readFile?: (file: string) => void;
}
export declare function follow(x: string, opts: FollowOptions): Promise<string>;
export {};
//# sourceMappingURL=follow.d.ts.map