# pi-skills-walkup

A `pi.dev` extension that improves skill discovery by loading project skills recursively.

## What it does

By default, `pi.dev` reads project skills from the `.pi/skills` directory in the current working directory. This extension extends that behavior to load skills from `.pi/skills` in the current working directory **and every parent directory** up to the git repository root (or the filesystem root if no git repo is present).

This allows you to define shared skills at the root of a monorepo or a project hierarchy while still allowing specialized skills in subdirectories.

## Installation

### Via Local Path

Add the path to this directory to your `settings.json`:

```json
{
  "extensions": [
    "/path/to/pi-skills-walkup"
  ]
}
```

### Via git

```bash
pi install git:github.com/niksilver/pi-skills-walkup.git
```

## How it works

The extension hooks into the `resources_discover` lifecycle event. Using `git rev-parse --show-toplevel`, it determines the repository boundary and walks up the directory tree, collecting all valid `.pi/skills` directories to be provide to the agent's resource manager.

## License

MIT
