import { SymLinks, Target } from './types';
import { Stripe } from './packer';
interface ProducerOptions {
    backpack: {
        entrypoint: string;
        stripes: Stripe[];
        prelude: string;
    };
    bakes: string[];
    slash: string;
    target: Target;
    symLinks: SymLinks;
}
export default function producer({ backpack, bakes, slash, target, symLinks, }: ProducerOptions): Promise<void>;
export {};
//# sourceMappingURL=producer.d.ts.map