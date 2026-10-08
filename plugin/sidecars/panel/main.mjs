import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SidecarApp, Response } from 'sidecar_sdk';

const here = dirname(fileURLToPath(import.meta.url));
const app = new SidecarApp();

app.page('/', () => readFileSync(join(here, 'index.html'), 'utf8'));
app.api('/styles.css', () =>
  new Response(readFileSync(join(here, 'styles.css'), 'utf8'), { contentType: 'text/css' }),
  'GET');
app.page('/app.js', () => readFileSync(join(here, 'app.js'), 'utf8'));

app.run();
