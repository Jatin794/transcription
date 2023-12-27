# Transcription: a Whisper speech-to-text web UI

This is the open-source code that powers the Whisper Web UI at https://whisperwebui.com.

## Features

- [X] Transcribe audio recorded in the browser using the OpenAI Whisper API using your API keys.
- [ ] Transcribe audio in files on your local computer.
- [ ] Try out multiple speech-to-text APIs.

## Developing

You can help improve the website by contributing! Here are the easy ways to run this server.

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle
  with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## License

All code is licensed under the [GNU Affero General Public License v3.0](https://spdx.org/licenses/AGPL-3.0-only.html)
