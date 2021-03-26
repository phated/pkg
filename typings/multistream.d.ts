
declare module 'multistream' {
  import { Stream } from 'stream';

  interface FactoryStreamCallback {
    (err: Error | null, stream: null): any;
    (err: null, stream: NodeJS.ReadableStream): any;
  }

  type LazyStream = () => Stream;
  type FactoryStream = (cb: FactoryStreamCallback) => void;
  type Streams = Array<LazyStream | NodeJS.ReadableStream> | FactoryStream;
  
  class Multistream extends Stream {
    constructor(streams: Streams);
  }

  // namespace multistream {
  //     function obj(streams: Streams): NodeJS.ReadableStream;
  // }
  
  export default Multistream;
}