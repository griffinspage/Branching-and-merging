# Branching and Merging Project

## Overview

In this project, I explored Git branching and merging workflows to better understand how developers collaborate on the same codebase. The goal was to create separate branches, make changes independently, merge those changes back into the main branch, and resolve any merge conflicts that arose during the process.

## What I Did

I started by creating a new branch from the main branch and making changes to files within that branch. While working on the feature branch, I also made different changes on the main branch. Since both branches contained modifications to the same file, a merge conflict occurred when I attempted to combine them.

This exercise helped me understand how Git tracks changes and why conflicts happen when multiple versions of the same content exist.

## Merge Conflict Encountered

When I attempted to merge my feature branch into the main branch, Git was unable to automatically determine which changes should be kept because the same section of a file had been modified in both branches.

Git notified me of the conflict and marked the affected file with conflict indicators similar to the following:

```text
<<<<<<< HEAD
Changes from the main branch
=======
Changes from the feature branch
>>>>>>> feature-branch
```

These markers showed me the competing versions of the content and highlighted the areas that required my attention.

## How I Resolved the Conflict

To resolve the conflict, I first used the `git status` command to identify the files that contained unresolved conflicts.

```bash
git status
```

Next, I opened the conflicted file in my code editor and carefully reviewed the changes from both branches. I compared the content and decided which changes were necessary to keep.

After reviewing the conflicting sections, I manually edited the file by removing the conflict markers and combining the relevant changes into a single version.

Once I was satisfied with the final content, I staged the resolved file using:

```bash
git add README.md
```

Finally, I completed the merge by creating a commit:

```bash
git commit -m "Resolved merge conflict"
```

## Outcome

After resolving the conflict, I successfully merged the feature branch into the main branch. The repository contained all the intended changes without any conflicting code, and the merge process was completed successfully.

## What I Learned

This project helped me develop practical Git skills, including:

* Creating and managing branches
* Merging branches into the main branch
* Identifying merge conflicts
* Understanding Git conflict markers
* Resolving conflicts manually
* Using Git commands to finalize merges
* Following collaborative development practices

## Conclusion

Through this project, I gained hands on experience with one of the most important aspects of version control: conflict resolution. I learned that merge conflicts are a normal part of collaborative software development and that they can be resolved effectively by carefully reviewing and combining changes. This experience improved my confidence in using Git and prepared me for working on larger collaborative projects in the future.
