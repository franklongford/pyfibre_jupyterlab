import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { LabIcon } from '@jupyterlab/ui-components';

import PyFibreSvgstr from '../style/pyfibre-icon.svg';

import { requestAPI } from './handler';
import { PyFibreWidget } from './widget';

/**
 * Initialization data for the pyfibre_jupyterlab extension.
 */

const PyFibreIcon = new LabIcon({
  name: 'pyfibre_jupyterlab:icon',
  svgstr: PyFibreSvgstr
});

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pyfibre_jupyterlab:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILauncher],
  activate: async (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    launcher: ILauncher
  ) => {
    console.log('JupyterLab extension pyfibre_jupyterlab is activated!');

    // Add an application command
    const command = 'pyfibre:open';
    app.commands.addCommand(command, {
      label: 'PyFibre',
      icon: args => (args['isPalette'] ? undefined : PyFibreIcon),
      execute: () => {
        const content = new PyFibreWidget();
        const widget = new MainAreaWidget<PyFibreWidget>({ content });
        widget.id = 'pyfibre-jupyterlab';
        widget.title.label = 'PyFibre';
        widget.title.icon = PyFibreIcon;
        widget.title.closable = true;
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

    // Add the command to the launcher
    if (launcher) {
      launcher.add({
        command,
        category: 'Extension Examples',
        rank: 1
      });
    }

    // GET request
    await requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The pyfibre_jupyterlab server extension appears to be missing.\n${reason}`
        );
      });

    // POST request
    const dataToSend = { name: 'Frank' };
    await requestAPI<any>('get_example', {
      body: JSON.stringify(dataToSend),
      method: 'POST'
    })
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
