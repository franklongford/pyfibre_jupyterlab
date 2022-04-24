import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the pyfibre_lab extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pyfibre_lab:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension pyfibre_lab is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The pyfibre_lab server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
