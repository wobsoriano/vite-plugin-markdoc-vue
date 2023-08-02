import { Plugin } from 'vite';
import Markdoc from '@markdoc/markdoc';

declare type Options = Parameters<typeof Markdoc.transform>['1'];
declare function plugin(options?: Options): Plugin;

export { Options, plugin as default };
