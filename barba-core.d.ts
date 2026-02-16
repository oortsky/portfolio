declare module '@barba/core' {
  export interface ITransitionData {
    current: {
      container: HTMLElement;
      namespace?: string;
      url: {
        hash: string;
        href: string;
        path: string;
        port: string;
        query: Record<string, string>;
      };
    };
    next: {
      container: HTMLElement;
      namespace?: string;
      url: {
        hash: string;
        href: string;
        path: string;
        port: string;
        query: Record<string, string>;
      };
    };
    trigger: string | HTMLElement;
  }

  export interface ITransitionPage {
    name?: string;
    from?: { namespace?: string | string[] };
    to?: { namespace?: string | string[] };
    once?: (data: ITransitionData) => void | Promise<void>;
    leave?: (data: ITransitionData) => void | Promise<void>;
    enter?: (data: ITransitionData) => void | Promise<void>;
    after?: (data: ITransitionData) => void | Promise<void>;
  }

  export interface IView {
    namespace: string;
    beforeLeave?: (data: ITransitionData) => void | Promise<void>;
    afterLeave?: (data: ITransitionData) => void | Promise<void>;
    beforeEnter?: (data: ITransitionData) => void | Promise<void>;
    afterEnter?: (data: ITransitionData) => void | Promise<void>;
  }

  export interface IBarbaOptions {
    transitions?: ITransitionPage[];
    views?: IView[];
    timeout?: number;
    cacheIgnore?: boolean | string[];
    prefetchIgnore?: boolean | string[];
    prevent?: (args: { el: HTMLElement; event: Event; href: string }) => boolean;
    requestError?: (
      trigger: HTMLElement,
      action: string,
      url: string,
      response: Response
    ) => boolean | void;
    debug?: boolean;
    logLevel?: 'off' | 'error' | 'warning' | 'info' | 'debug';
  }

  export interface IBarba {
    init(options?: IBarbaOptions): void;
    go(url: string, trigger?: string | HTMLElement): Promise<void>;
    destroy(): void;
    force(href: string): void;
    hooks: {
      before(fn: (data: ITransitionData) => void): void;
      after(fn: (data: ITransitionData) => void): void;
      enter(fn: (data: ITransitionData) => void): void;
      leave(fn: (data: ITransitionData) => void): void;
    };
  }

  const barba: IBarba;
  export default barba;
}
