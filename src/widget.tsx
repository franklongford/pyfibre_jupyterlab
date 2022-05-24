import { ReactWidget } from '@jupyterlab/apputils';

import React from 'react';

/**
 * React component for PyFibre.
 *
 * @returns The React component
 */
const PyFibreComponent = (): JSX.Element => {
  return (
    <div>
      <p>Coming Soon!</p>
    </div>
  );
};

/**
 * A Pyfibre Lumino Widget that wraps a CounterComponent.
 */
export class PyFibreWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <PyFibreComponent />;
  }
}
