git init
git status
git add
git commit

git log
git show
git diff

git checkout
"git restore <file>..." to discard changes in working directory (git checkout)
git restore --staged <file>..." to unstage(git reset)

git checkout -b <branch>
git checkout
git branch
git merge: B------->A
-checkout to A(go to branch A)
-git merge B

git reset --soft <commit>
git reset --mixed <commit>
git reset --hard <commit> : delete the commit and code

git revert <commit>

git config --global creadential.helper "cache--timeout=36000"
