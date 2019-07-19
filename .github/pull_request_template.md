PR Checklist:
- [ ] I have named the PR correctly
- [ ] I have added correct destination branch
- [ ] I have added at least two reviewers
- [ ] I have assigned the PR to myself
- [ ] I have merged develop or main feature into my feature branch and resolved all conflicts
- [ ] I have tested all new features locally
- [ ] I have tested relevant flow locally
- [ ] I have tested Dark mode

### How to name a PR
- If it includes only one issue `CN-1234 Issue name`
- If it includes many issues `CN-1234, CN-2345, CN-3456 What was updated/changed/added`
- If the PR is not ready yet, add `[DRAFT]` in front of the name
- Do not name the PR starting with `feature/` or `Feature/`

### How to test locally
1. Test happy path
2. Test other paths
3. Remove all warnings

### How to relevant flow locally
- If working on part of CelPay, check the whole happy path
