declare module 'react-simplified' {
  import { Component as ReactComponent } from 'react';

  /**
   * A React component with simplified usage.
   */
  class Component<Props = {}, State = {}> extends ReactComponent<
    Props & { children?: React.ReactNode },
    State
  > {
    /**
     * Returns the last instance.
     */
    static instance<T extends typeof Component>(this: T): InstanceType<T> | null;

    /**
     * Returns all instances.
     */
    static instances<T extends typeof Component>(this: T): InstanceType<T>[];

    /**
     * Replacement-hook for componentDidMount.
     */
    mounted?(): void;

    /**
     * Replacement-hook for componentDidUpdate.
     */
    updated?(prevProps: Props, prevState: State, prevContext: any): void;

    /**
     * Replacement-hook for componentWillUnmount.
     */
    beforeUnmount?(): void;
  }

  /**
   * Create an object that when altered, schedules rerender of affected React Simplified components.
   */
  function sharedComponentData<Observable extends object>(obj?: Observable): Observable;

  // In case one needs the observe and unobserve functions from @nx-js/observer-util:

  /**
   * Scheduler type for the ObserveOptions type.
   */
  interface Scheduler {
    add: Function;
    delete: Function;
  }

  /**
   * Options type for the observe function.
   */
  interface ObserveOptions {
    scheduler?: Scheduler | Function;
    debugger?: Function;
    lazy?: boolean;
  }

  /**
   * Calls func whenever a used (within func) state of a sharedComponentData object is changed.
   */
  function observe<Reaction extends Function>(func: Reaction, options?: ObserveOptions): Reaction;

  /**
   * Stops the given observe object's function.
   */
  function unobserve(func: Function): void;
}
