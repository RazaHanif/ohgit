**OhGit** - Git Bot for Auto-Commits
====================================

**OhGit** is an NPM package that watches your files and automatically commits changes in your Git repository when you forget after a certain period of inactivity. 
It's perfect for those who forget to commit their work regularly.

---

### Features:
- **Watchman**: Watches file changes in the currect directory
- **Commit Bot**: Automatically commits changes with a customizable commit message after a period of inactivity.
- **Message Maker**: Set your own commit message for the auto-commits.
- **Time Keeper**: Set the delay (in minutes) before the auto-commit happens.
- **Back to Basics**: Reset settings to default values.
- **Cross Platform**: Works on Linux, macOS, and Windows.

---

### Installation:

1. Install the package globally using npm:

   ```
   npm install -g ohgit
   ```

2. Alternatively, you can install it locally within your project:

   ```
   npm install ohgit
   ```

---

### Usage:

After installation, you can use **OhGit** in your Git repository by running the following command:

```
ohgit
```

This command will start watching for file changes. After the default delay of 2 minutes of inactivity, **OhGit** will automatically commit changes to the repository with the default commit message.

---

### Defaults:

- Default commit message: "OhGit Auto-Commit"
- Default commit delay: 2 Minutes

---

### CLI Options:

**OhGit** supports the following command-line options:

- **`-m` or `--set-message`**  
  Set a custom commit message for auto-commits.  
  Example:
  ```
  ohgit -m "Custom Commit Message"
  ```

- **`-d` or `--set-delay`**  
  Set the inactivity delay before an auto-commit happens (in minutes).  
  Example:
  ```
  ohgit -d 5
  ```

- **`--reset`**  
  Reset **OhGit** settings to their default values. This removes the custom commit message and delay, restoring the default behavior.  
  Example:
  ```
  ohgit --reset
  ```

---

### Examples:

1. **Setting a custom commit message**:
   ```
   ohgit -m "Work on bug fixes"
   ```

2. **Setting the commit delay to 10 minutes**:
   ```
   ohgit -d 10
   ```

3. **Resetting **OhGit** settings to defaults**:
   ```
   ohgit --reset
   ```

---

### License:

MIT License

Copyright 2025 Raza Hanif

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

OhGit: Because you always forget… 😅