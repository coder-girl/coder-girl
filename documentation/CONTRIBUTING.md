# Contributing

## General Workflow

1. Fork the repo
1. Cut a namespaced feature from master
    - bug/...
    - feat/...
    - test/...
    - doc/...
    - refactor/...
1. Make commits to your feature branch
  - (feat) Add a new feature
  - (fix) Fix inconsistent tests
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature, rebase changes from the project repo into your branch
1. Submit a pull request directly to the master branch of the project
1. Your pull request will be reviewed by every member of the organization. 
1. Fix any issues raised by the code reviewers, and push your fixes as a new commit per issue
1. Once the pull request has been reviewed and approved, it will be merged by the scrum master

## Detailed Workflow

###Fork the repo
Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/saturated-paradox/coder-girl.git
```

### Cut a namespaced feature from master
  - Each branch should correlate with a current project issue. If you'd like to add something that is not an issue, please submit the issue first before beginning work 
  - They should follow these conventions:
    - bug/...
    - feat/...
    - test/...
    - doc/...
    - refactor/...
  - In your terminal, go to the repo directory and run the following command:

    ``` bash
    # Creates your branch and brings you there
    git checkout -b `your-branch-name`
    ```

### Make commits to your feature branch
  These guidelines MUST BE FOLLOWED. Any deviation will cause your pull request to be denied. 

  - Every commit message should be prefixed like so:
    - (feat) Add a new feature
    - (fix) Fix bug in view
    - (refactor) ...
    - (cleanup) ...
    - (test) ...
    - (doc) ...

#### Commit Message Guidelines

  - Commit messages must be written in present tense
    - (fix) Fix continous integration script
    - (test) Add integration testing for challenge map view
    - (doc) Add commit message guidelines to CONTRIBUTING.md
  - The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: this is a summary, not a detailed description of everything that changed.
  - If you want to explain the commit in more depth, following the first line should be a blank line and then a more detailed description of the commit. 

### Rebase changes into your branch

  Once you're done making changes in your branch, you want to rebase upstream changes. DO THIS BEFORE PUSHING TO GITHUB or you will have pull request nightmares. 
  1. Start the rebase process: 

  ```bash
  git pull --rebase upstream master
  ```

  1. If there are conflicts
    - Open the file and resolve the conflicts
    - Add the file, letting the rebase process know that the conflict has been resolved: 

      ```bash
      git add <FILE_NAME>
      ```
    - Once all conflicts are resolved, continue rebasing:

      ```bash
      git rebase --continue
      ```
  1. Test code

    Eventually, you will be done rebasing (there may be multiple conflicts that have to be resolved). Test your code to make sure the rebase did not break anything. If it did, fix the bugs and repeat the rebase process until nothing is broken and all tests pass

  1. Push to your branch on github

### Make a Pull Request

  Make a pull request from your branch to the organization's master branch

#### Pull Request Guidelines
  - The pull request must resolve an issue and follow this format: 
      - This pull request resolves #\<ISSUE_NUMBER\>
  - Make your comment as descriptive as possible
    - Describe what your pull request will change and what functionality it adds

  Every pull request is reviewed by the entire team. You can expect a response within 24 hours. 

  If there are any issues, you must fix them and make additional commits (follow the steps above). Once the changes have been pushed to your github, leave a comment requesting further review. This process will repeat until every reviewer is satisfied with the code, at which point, the scrum master of the project will merge your pull request. 

  Remember to rebase your fork's master branch, so that is always a representation of the current working state of the project.

Thanks for contributing! 
