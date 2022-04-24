import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the pyfibre_jupyterlab extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pyfibre_jupyterlab:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension pyfibre_jupyterlab is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The pyfibre_jupyterlab server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
