# Contributing to Codify

First off, thank you for considering contributing to Codify! It's people like you that make Codify such a great learning platform.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to [contact@codifylearn.com](mailto:contact@codifylearn.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Codify. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report:**

* Check the [issues](https://github.com/roshansuthar1105/codify-frontend/issues) to see if the problem has already been reported.
* If you're unable to find an open issue addressing the problem, open a new one.

**How Do I Submit A (Good) Bug Report?**

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

* Use a clear and descriptive title
* Describe the exact steps to reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots or animated GIFs if possible
* Include details about your configuration and environment

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Codify, including completely new features and minor improvements to existing functionality.

**Before Submitting An Enhancement Suggestion:**

* Check if the enhancement has already been suggested or implemented
* Determine which repository the enhancement should be suggested in
* Perform a cursory search to see if the enhancement has already been suggested

**How Do I Submit A (Good) Enhancement Suggestion?**

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* Use a clear and descriptive title
* Provide a detailed description of the suggested enhancement
* Explain why this enhancement would be useful to most Codify users
* Include mockups or examples if applicable
* List some other applications where this enhancement exists, if applicable

### Pull Requests

The process described here has several goals:

* Maintain Codify's quality
* Fix problems that are important to users
* Engage the community in working toward the best possible Codify
* Enable a sustainable system for Codify's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in the template
2. Follow the styleguides
3. After you submit your pull request, verify that all status checks are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript code is linted with ESLint and formatted with Prettier. We use the following configuration:

* 2 spaces for indentation
* Use semicolons
* Prefer single quotes
* 80 character line length
* Trailing commas where possible
* Use `const` or `let` – avoid `var`
* Use arrow functions when possible
* Use template literals instead of string concatenation
* Use destructuring when possible
* Use spread syntax instead of `.apply`
* Prefer object shorthand
* Prefer array methods like `.map()` and `.filter()` over loops

### CSS/Tailwind Styleguide

* Use Tailwind utility classes whenever possible
* Avoid using `@apply` in Tailwind CSS
* Keep component styles modular and reusable
* Use semantic class names when custom CSS is necessary
* Follow BEM naming convention for custom CSS classes

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation
* Reference methods and classes in markdown with the custom `{@link}` syntax
* Document all public methods and components

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues or PRs related to documentation
* `duplicate` - Issues that are duplicates of other issues
* `enhancement` - Issues that are feature requests
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - Issues that are invalid or non-reproducible
* `question` - Issues that are questions
* `wontfix` - Issues that won't be fixed

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.
