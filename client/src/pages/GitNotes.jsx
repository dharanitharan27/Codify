import React from "react";

const gitVersionControl = [
  {
    id: 1,
    title: "Introduction to Git",
    content:
      "Git is a distributed version control system that helps developers track and manage changes in source code during software development."
  },
  {
    id: 2,
    title: "Why Use Version Control?",
    content: [
      "Keeps history of all code changes",
      "Enables collaboration without overwriting work",
      "Provides backup in case of mistakes",
      "Helps in reverting to previous versions"
    ]
  },
  {
    id: 3,
    title: "Installing Git",
    code: `# Ubuntu/Debian\nsudo apt install git\n\n# Fedora\nsudo dnf install git\n\n# MacOS (Homebrew)\nbrew install git\n\n# Windows\nDownload from: https://git-scm.com/downloads`
  },
  {
    id: 4,
    title: "Git Configuration",
    code: `git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"\ngit config --list`
  },
  {
    id: 5,
    title: "Creating a Git Repository",
    code: `# Initialize a new repository\ngit init\n\n# Clone an existing repository\ngit clone <repository-url>`
  },
  {
    id: 6,
    title: "Checking Repository Status",
    code: `git status\ngit log\ngit show`
  },
  {
    id: 7,
    title: "Staging and Committing Changes",
    code: `# Stage changes\ngit add <filename>\ngit add .   # stage all changes\n\n# Commit changes\ngit commit -m \"Your commit message\"`
  },
  {
    id: 8,
    title: "Viewing Changes",
    code: `git diff          # view unstaged changes\ngit diff --staged  # view staged changes`
  },
  {
    id: 9,
    title: "Branching",
    code: `# Create a branch\ngit branch feature-branch\n\n# Switch branch\ngit checkout feature-branch\n\n# Create & switch\ngit checkout -b feature-branch\n\n# List branches\ngit branch`
  },
  {
    id: 10,
    title: "Merging Branches",
    code: `# Merge branch into current branch\ngit merge feature-branch\n\n# Abort merge\ngit merge --abort`
  },
  {
    id: 11,
    title: "Resolving Conflicts",
    content:
      "Conflicts occur when multiple people edit the same lines of a file. Git marks conflicts in the file, and you must manually edit and resolve them before committing."
  },
  {
    id: 12,
    title: "Undoing Changes",
    code: `git restore <filename>     # discard changes in working directory\ngit reset HEAD <filename>  # unstage file\ngit revert <commit>        # create a new commit to undo previous one`
  },
  {
    id: 13,
    title: "Remote Repositories",
    code: `# Add a remote\ngit remote add origin <repository-url>\n\n# View remotes\ngit remote -v`
  },
  {
    id: 14,
    title: "Pushing and Pulling",
    code: `# Push changes to remote\ngit push origin main\n\n# Pull latest changes\ngit pull origin main\n\n# Fetch without merging\ngit fetch origin`
  },
  {
    id: 15,
    title: "Working with GitHub",
    content: [
      "Create a repository on GitHub",
      "Connect it to local repo using `git remote add`",
      "Push your local commits to GitHub",
      "Collaborate via Pull Requests"
    ]
  },
  {
    id: 16,
    title: "Tags",
    code: `# Create a lightweight tag\ngit tag v1.0\n\n# Annotated tag\ngit tag -a v1.0 -m \"Version 1.0 release\"\n\n# Push tags\ngit push origin --tags`
  },
  {
    id: 17,
    title: "Stashing Changes",
    code: `git stash        # save uncommitted changes\ngit stash list   # view stashed changes\ngit stash pop    # apply latest stash and remove it`
  },
  {
    id: 18,
    title: "Rebasing",
    code: `# Rebase feature branch onto main\ngit checkout feature-branch\ngit rebase main`
  },
  {
    id: 19,
    title: "Best Practices",
    content: [
      "Commit small, meaningful changes",
      "Write clear commit messages",
      "Use branches for new features",
      "Pull before you push to avoid conflicts",
      "Avoid committing sensitive files (use .gitignore)"
    ]
  },
  {
    id: 20,
    title: "Git Aliases",
    content: "Shortcuts for common commands:",
    code: `git config --global alias.st status\ngit config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.cm \"commit -m\"`
  },
  {
    id: 21,
    title: "Git Ignore",
    content: [
      "To avoid committing unwanted files:",
      "Create .gitignore file in project root.",
      "Example:"],
    code: `node_modules/\n*.log\n.env`
  },
  {
    id: 22,
    title: "Git Hooks",
    content: [
      "Automate tasks at different stages of Git workflow.",
      "Examples:",
      "pre-commit → run linting/tests before commit",
      "pre-push → run CI/CD scripts before pushing",
      "Stored in .git/hooks/."
    ]
  },
  {
    id: 23,
    title: "Git Cherry-Pick",
    content: "Apply a specific commit from one branch to another:",
    code: `git checkout main\ngit cherry-pick <commit-hash>`
  },
  {
    id: 24,
    title: "Git Worktrees",
    content: "Work on multiple branches simultaneously without cloning:",
    code: `git worktree add ../feature-branch feature-branch`
  },
  {
    id: 25,
    title: "Summary",
    content:
      "Git is an essential tool for developers. It ensures efficient collaboration, keeps history of changes, and integrates with platforms like GitHub/GitLab/Bitbucket for team-based workflows."
  }
];

const GitNotes = () => (
  <div className="git-notes-container">
    <h1 className="git-notes-title">Git & Version Control</h1>
    {gitVersionControl.map(note => (
      <div key={note.id} className="git-note-card">
        <h2 className="git-note-title">{note.title}</h2>
        {note.content && Array.isArray(note.content) ? (
          <ul className="git-note-list">
            {note.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : note.content ? (
          <p className="git-note-content">{note.content}</p>
        ) : null}
        {note.code && (
          <pre className="git-note-code"><code>{note.code}</code></pre>
        )}
      </div>
    ))}
    <style>{`
      .git-notes-container {
        max-width: 800px;
        margin: 40px auto;
        padding: 32px 16px;
        background: #101014;
        color: #f3f3f3;
        border-radius: 18px;
        box-shadow: 0 4px 32px 0 #000a, 0 1.5px 4px 0 #0002;
      }
      .git-notes-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 32px;
        color: #4f8cff;
        text-align: center;
        letter-spacing: 1px;
      }
      .git-note-card {
        background: #181824;
        border-radius: 12px;
        margin-bottom: 28px;
        padding: 24px 20px 18px 20px;
        box-shadow: 0 2px 8px 0 #0003;
        transition: box-shadow 0.2s;
      }
      .git-note-card:hover {
        box-shadow: 0 4px 16px 0 #4f8cff44;
      }
      .git-note-title {
        font-size: 1.35rem;
        font-weight: 600;
        color: #4f8cff;
        margin-bottom: 10px;
      }
      .git-note-content {
        font-size: 1.08rem;
        margin-bottom: 8px;
        color: #e0e6f0;
      }
      .git-note-list {
        margin: 0 0 8px 18px;
        padding: 0;
        color: #e0e6f0;
        font-size: 1.08rem;
      }
      .git-note-list li {
        margin-bottom: 4px;
        list-style: disc inside;
      }
      .git-note-code {
        background: #232336;
        color: #b5e0ff;
        font-size: 1.02rem;
        padding: 14px 16px;
        border-radius: 8px;
        margin-top: 8px;
        overflow-x: auto;
        font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
        border: 1px solid #2a2a3a;
        box-shadow: 0 1px 4px 0 #0002;
      }
      @media (max-width: 600px) {
        .git-notes-container {
          padding: 10px 2vw;
        }
        .git-note-card {
          padding: 12px 6px 10px 6px;
        }
        .git-notes-title {
          font-size: 2rem;
        }
      }
    `}</style>
  </div>
);

export default GitNotes;
