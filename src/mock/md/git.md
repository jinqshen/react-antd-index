### Git使用

##### 下载



##### 安装(安装目录最好选择英文路径)



##### 设置环境变量



##### Git基本工作流程

1. 初始化一个本地仓库

   `git init`

2. 添加文件到git本地仓库，分两步

   1. `git add <filename>`添加文件，可多选
   2. `git commit -m <message>`提交文件到本地仓库

3. 查看当前仓库文件状态`git status`

4. 查看工作区文件与当前暂存区的不同`git diff <filename>`

`git diff`本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。

1. 版本回退`git reset`

git的版本号(`commit id`)和svn不同，不是1，2，3，4递增，而是通过SHA1加密出来的一串字符

`--hard`参数：

- 回退到前n个版本(回到过去)

  git中HEAD指向当前版本

  - 回到前一个版本：`git reset --hard HEAD^`
  - 回到前两个版本：`git reset --hard HEAD^^`
  - 回到前n个版本：`git reset --hard HEAD~n`

- 回退到指定版本，需要已知条件`commit id`（不仅可以回到过去，还能从过去再到未来）
  - `git reset --hard <commitId>`
  - 如果不知道`commit id`了，可以通过`git reflog`查看命令历史来找到`commit id`

6. 查看提交记录`git log`，可选参数`--pretty=oneline`表示仅显示一行信息(`commit id`, `commit message`)

   `--graph`参数可以看到分支合并图

7. 工作区和暂存区(对于所有分支而言， 工作区和暂存区是公共的，应该是局限于一个本地仓库内的所有分支)

![git-repo](https://www.liaoxuefeng.com/files/attachments/919020037470528/0)

​	`git add`命令是将我们工作区的文件添加进暂存区stage

​	`git commit`命令时将暂存区(stage)提交到当前分支(git会默认创建master分支，指向master分支的指针叫HEAD)

8. 撤销修改

- 撤销工作区的修改`git checkout -- <filename>`

​	`git checkout -- <filename>`可以丢弃工作区的修改，注意，只能丢弃工作区的修改，若文件已经放到暂存区，使用此命令是也不会撤销修改

​	解释：`git checkout`就是让文件回到最近的一次`git add`或`git commit`的状态

​	注意：`git checkout -- <filename>`中的`--`很重要，少了它就变成了切换到另一个分支的命令

- 撤销暂存区的修改返回到工作区`git reset -- <filename>`

小小总结一下：

1. 撤销工作区的修改：`git checkout -- <filename>`
2. 撤销暂存区的修改：
   - `git reset -- <filename>`
   - `git checkout -- <filename>`
3. 撤销已经提交到版本库的修改：`git reset --hard HEAD^` or `git reset --hard <commitId>`

9. 删除文件：`git rm <filename>`

   相当于执行了一下两个动作：

   - 手动删除文件
   - `git add <filename>`将删除操作添加到暂存区

##### Git杀手级功能之一，远程仓库

- 先有本地库再有远程库
  - 本地仓库与远程仓库关联，origin是给远程库起的名字哦，可以关联多个远程库，并给其起不同的名字

  `git remote add origin <gitUrl>`

  - 删除本地仓库与远程origin仓库的关联

  `git remote rm origin`

- 先有远程库再有本地库

  `git clone <gitUrl>`

- 本地仓库内容推送到远程仓库master分支

`git push -u origin master`  `-u`参数将本地matser分支与远程仓库master分支关联到一起了





##### 分支管理

- 分支的作用

![learn-branches](https://www.liaoxuefeng.com/files/attachments/919021987875136/0)

- 创建分支

  `git branch dev`表示创建dev分支

  加上`-b`参数代表创建并切换分支，即`git checkout -b dev`相当于

  - `git branch dev`
  - `git checkout dev`

- 切换分支

  `git checkout dev`表示切换到dev分支

- 查看分支

  `git branch`表示查看所有分支，前面带*号的代表当前处于的分支

- 合并分支

  注意，合并分支前需要先提交(commit)或者储藏(stash)当前所在分支的修改，不然可能文件会被其它分支的内容覆盖

  `git merge <branchName>`表示合并某分支到当前分支，比如我们要把`dev`分支的内容合并到`master`分支

  - 切换到master分支下`git checkout master`
  - 执行合并`git merge dev`

  合并完成后我们就可以放心地删除dev分支了

- 删除分支

  `git branch -d dev`表示删除dev分支，在dev分支被合并后可以删除

  `git branch -D dev`表示强制删除dev分支，在dev分支未被合并后也可以删除

- 冲突解决

  冲突的场景：比如`dev`分支对a.txt文件作了改动并提交，`master`分支也对a.txt文件作了改动并提交

  在`master`分支合并`dev`时，会出现冲突，需要手动解决冲突文件，可通过`git status`查看冲突文件，解决冲突后再手动提交

- 分支管理策略

  合并分支时，Git会默认采用`Fast forward`模式，此模式下，如果分支被删除，就会丢掉分支信息

  `Fast forward`模式，删除分支后

  ![1571485403022](C:\Users\jinqshen\AppData\Roaming\Typora\typora-user-images\1571485403022.png)

  

  普通模式，删除分支后

  ![1571485447286](C:\Users\jinqshen\AppData\Roaming\Typora\typora-user-images\1571485447286.png)

  禁用`Fast forward`模式：`git merge --no-ff -m <message> <branchName>`，普通模式会在Git merge时生成一个commit，这样从分支历史上可以看出分支信息

  分支策略安排：

  ![git-br-policy](https://www.liaoxuefeng.com/files/attachments/919023260793600/0)

  master分支用来发布新版本

  dev分支用来大家干活公用

  然后每个人拥有一个属于自己的分支，修改完后都往dev上合

- Bug分支

  每接到一个bug，就可以为该bug创建一个分支，如果创建分支时，本地的修改还未提交，但又不想提交，可以选择将此时的工作现场储藏(stash)起来

  `git stash` 储藏当前工作现场

  `git stash list` 查看储藏的工作现场列表

  `git stash apply <stashName>` 恢复指定工作现场，但不删除储藏，<stashName>比如：stash@{0}

  `git stash pop <stashName>` 恢复指定工作现场，并删除储藏

- 复制特定的提交到当前分支

  `git cherry-pick <commitId>`

- 查看远程库的信息

  `git remote`可选参数`-v`显示远程库详细信息

- 推送分支

  `git push origin <branchName>`推送分支需要指定本地分支

  `git checkout -b dev origin/dev`创建本地dev分支并与远程dev分支建立关联

- 抓取分支

  `git pull`抓取与当前分支相关联的远程分支内容

  `git branch --set-upstream-to <localBranchName> origin/<originBranchName> `建立本地分支与远程分支的关联

##### 标签管理

- 标签的定义

  标签就是给某个`commit`起的别名，标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

- 查看标签  `git tag` 
  - 标签是按字母顺序排列的
  - 查看标签的详细信息 `git show <tagName>` 

- 创建标签
  - 默认是创建在当前分支的HEAD  `git tag <tagName>`
  - 指定给某个commit打标签 `git tag <tagName> <commitId>` 
  - 创建带有说明的标签`git tag -a <tagName> -m <message> <commitId>`
- 删除标签
  - 删除本地标签`git tag -d <tagName>`
  - 删除远程标签
    - 先删除本地标签`git tag -d <tagName>`
    - 在删除远程标签`git push origin :refs/tags/<tagName>`
- 推送标签到远程
  - 推送某个标签到远程`git push origin <tagName>`
  - 推送所有标签到远程`git push origin --tags`

