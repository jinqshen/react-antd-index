### Git命令总结

`git status`：查看当前仓库文件状态/查看冲突文件

`git init`：初始化一个本地仓库

`git remote -v`：查看远程库信息

`git remote add <resName> <resUrl>`：添加远程仓库

`git remote rm <resName>`：删除远程仓库

`git clone <resUrl>`：克隆远程库

`git add <file>`：将工作区文件添加入暂存区

`git commit -m <message>`：提交暂存区文件至本地仓库

`git push -u <resName> <branchName>`：推送本地仓库内容至远程仓库，`-u`参数表示建立本地分支

`git checkout -b dev origin/dev`：创建本地dev分支并与远程dev分支建立关联

`git diff <file>`：查看工作区文件与当前暂存区文件的不同

`git reset --hard <commitID>`：回退到指定版本

`git reset -- <file>`：撤销暂存区的修改至工作区

`git reflog`：查看历史命令记录

`git log --graph --pretty=oneline`：查看提交记录并查看分支合并图

`git checkout -- <file>`：丢弃工作区的修改

`git checkout <branchName>`：切换到指定分支  `-b`参数表示创建并切换到该分支

`git branch`：查看分支，`-a`查看所有本地与远程分支，`-r`查看所有远程分支

`git branch <branchName>`：创建分支

`git push origin <branchName>`：可创建远程分支

`git branch -d <branchName>`：删除分支

`git branch -D <branchName>`：强制删除未合并的分支

`git push origin :<branchName>`：删除远程分支，需要先删除本地分支

`git merge <branchName>`：合并分支到当前分支

`git merge --no-ff -m <message> <branchName>`：普通模式合并分支到当前分支

`git stash`：储藏当前工作现场

`git stash list`：查看储藏工作现场列表

`git stash apply <stashName>`：恢复指定工作现场

`git stash pop <stashName>`：恢复指定工作现场，并删除储藏

`git cherry-pick <commitID>`：复制特定提交到当前分支

`git pull`：抓取与当前分支相关联的远程分支内容

`git branch --set-upstream-to <localBranchName> origin/<originBranchName> `建立本地分支与远程分支的关联

`git tag`：查看标签

`git show <tagName>`：查看标签的详细信息

`git tag <tagName>`：创建标签打在当前分支的HEAD上

`git tag <tagName> <commitID>`：指定给某个commit打标签

`git tag -d <tagName>`：删除本地标签

`git push origin :refs/tags/<tagName>`：删除远程标签(需要先删除本地分支)

`git push origin <tagName>`：推送某个标签到远程

`git push origin --tags`：推送所有标签到远程