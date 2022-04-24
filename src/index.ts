import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

import { requestAPI } from './handler';

/**
 * Initialization data for the pyfibre_jupyterlab extension.
 */

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pyfibre_jupyterlab:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension pyfibre_jupyterlab is activated!');

    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({ content });
    widget.id = 'pyfibre-jupyterlab';
    widget.title.label = 'PyFibre Picture';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'pyfibre:open';
    app.commands.addCommand(command, {
      label: 'PyFibre Logo',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });

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
