### Docker常用命令

##### 生命周期

- `docker run <options> <image> <command> <args>`创建一个新的容器并运行一个命令

  `options`:

  - `-a stdin`:指定标准输入输出内容类型，可选STDIN/STDOUT/STDERR三项
  - `-d`:后台运行容器
  - `-i`:以交互模式运行容器，通常与`-t`同时使用
  - `-P`:随机端口映射，容器内部端口随机映射到主机的端口
  - `-p`:指定端口映射，格式为：`主机(宿主)端口:容器端口`
  - `-t`:为容器重新分配一个伪输入终端，通常与`-i`同时使用
  - `--name="xxxx"`:为容器指定一个名称
  - `--dns 8.8.8.8`:指定容器使用的DNS服务器，默认和宿主一致
  - `dns-search example.com`:指定容器DNS搜索域名，默认和宿主一致
  - `-h "mars"`:指定容器的hostname
  - `-e username="ritchie"`:设置环境变量
  - `--volume, -v`:绑定一个卷

  demo:

  - `docker run --name mynginx -d nginx:latest`

  使用nginx:latest镜像以后台模式启动容器，并命名为mynginx

  - `docker run -P -d nginx:latest`

  使用nginx:latest镜像以后台模式启动一个容器，并将容器的默认端口映射到主机随机端口

  - `docker run -p 80:80 -v /data:/data -d nginx:latest`

  使用nginx:latest镜像以后台模式启动一个容器，并将容器的80端口映射到主机的80端口，主机的目录/data映射到容器的/data

  - `docker run -it nginx:latest /bin/bash`

  使用nginx:latest以交互模式启动一个容器，在容器内执行/bin/bash命令

- `docker start <options> <containerName>`启动一个或多个已经被停止的容器

- `docker stop <options> <containerName>`停止一个或多个运行中的容器

- `docker restart <options> <containerName>`重启容器

- `docker kill <options> <containerName>` 杀掉一个运行中的容器

  `options`:

  - `-s`:向容器发送一个信号

  demo:

  - `docker kill -s KILL mynginx`

  杀死运行中的容器mynginx

- `docker rm <options> <containerName>`:删除一个或多个容器

  `options`:

  - `-f`:通过SIGKILL信号强制删除一个运行中的容器
  - `-l`:移除容器间的网络连接，而非容器本身
  - `-v`:删除与容器关联的卷

  demo:

  - `docker rm -f db01 db02`

  强制删除容器db01、db02

- `docker pause <options> <containerName>`暂停容器中的所有进程

- `docker unpause <options> <containName>`恢复容器中的所有进程

- `docker create <options> <image> <command> <args>`创建一个新的容器但不启动它

- `docker exec <options> <containerName> <command> <args>`在运行的容器中执行命令，进入容器

  `options`:

  - `-d`:分离模式，在后台运行
  - `-i`:及时没有附加也保持STDIN打开
  - `-t`:分配一个伪终端

##### 容器操作

- `docker ps <options>`列出容器

  `options`:

  - `-a`:显示所有的容器，包括未运行的
  - `-f`:根据条件过滤显示的内容
  - `--format`:指定返回值的模板文件
  - `-l`:显示最近创建的容器
  - `-n`:列出最近创建的容器
  - `--no-trunc`:不截断输出
  - `-q`:静默模式，只显示容器编号
  - `-s`:显示总的文件大小

- `docker inspect <options> <containerName|ID>`获取容器/镜像的元数据

  `options`:

  - `-f`:指定返回值的模板文件
  - `-s`:显示总的文件大小
  - `--type`:为指定类型返回JSON

- `docker top <options> <cotainerName> <ps options>`查看容器中运行的进程信息，支持ps命令参数

- `docker attach <optios> <containerName>`:连接到正在运行中的容器，退出的时候会停止容器，可以加上参数`--sig-proxy=false`来确保退出不会停止容器

- `docker events <options>`从服务器获取实时事件

  `options`:

  - `-f`:根据条件过滤事件
  - `--since`:从指定的时间戳后显示所有事件
  - `--until`:流水事件显示到指定的时间为止

- `docker logs <options> <containerName>`获取容器的日志 tip:查看日志的位置:`docker inspect --format='{{.LogPath}}' <containerName>`

  `options`:

  - `-f`:跟踪日志输出
  - `--since`:显示某个开始时间的所有日志
  - `-t`:显示时间戳
  - `--tail`:仅列出最新N条容器日志

- `docker wait <options> <containerName>`阻塞运行直到容器停止，然后打印出他的退出代码

- `docker export <options> <containerName>`将文件系统作为一个tar归档文件导出到STDOUT

  `options`:

  - `-o`:将输入内容写到文件

- `docker port <options> <containerName>`列出指定的容器端口映射

##### 容器rootfs命令

- `docker commit <options> <containerName> <Repository:tag>`

  `options`:

  - `-a`:提交的镜像作者
  - `-c`:使用Dockerfile指令来创建镜像
  - `-m`:提交时的说明文字
  - `-p`:在`commit`时，将容器暂停

- `docker cp <options> <containerName>`
- `options`:
  - `-L`:保持源目标中的链接
- `dicker diff <options> <containerName>`检查容器里文件结构的更改

##### 镜像仓库

- `docker login <options> <server>`登录到一个Docker镜像仓库，如果未指定镜像仓库地址，默认DockerHub

  `options`:

  - `-u`:登录的用户名
  - `-p`:登录的密码

- `docker logout <options> <server>`登录到一个Docker镜像仓库，如果未指定镜像仓库地址，默认DockerHub

  登录:`docker login -u xxx -p xxx`

  登出:`docker logout`

- `docker pull <options> <name:tag>`从镜像仓库拉取或者更新指定镜像

  `options`:

  - `-a`:拉取所有的tagged镜像
  - `--disable-content-trust`:忽略镜像的校验，默认开启

- `docker push <options> <name:tag>`将本地的镜像上传到镜像仓库，要先登录到镜像仓库

  `options`:

  - `--disable-content-trust`:忽略镜像的校验，默认开启

- `docker search <options> <name>`从Docker Hub查找镜像

  `options`:

  - `--automated`:只列出automated build类型的镜像
  - `--no-trunc`:显示完整的镜像描述
  - `-s`:列出收藏数不小于指定值的镜像

| 列名        | 描述               |
| ----------- | ------------------ |
| NAME        | 镜像仓库源的名称   |
| DESCRIPTION | 镜像的描述         |
| OFFICIAL    | 是否docker官方发布 |
| STARS       | 点赞数             |
| AUTOMATED   | 自动构建           |

##### 本地镜像管理

- `docker images <options> <repository:tag>`列出本地镜像

  `options`:

  - `-a`:列出本地所有的镜像(含中间映像层，默认情况下，过滤掉中间映像层)
  - `--digests`:显示镜像的摘要信息
  - `-f`:显示满足条件的镜像
  - `--format`:指定返回值的模板文件
  - `--no-trunc`:显示完整的镜像信息
  - `-q`:只显示镜像ID

- `docker rmi <options> <imageName>`删除本地一个或多个镜像

  `options`:

  - `-f`:强制删除
  - `--no-prune`:不移除该镜像的过程镜像，默认移除

- `docker tag <options> <image:tag> <repository:tag>`标记本地镜像，将其归入某一仓库

- `docker build <options> <path|url>`用于使用Dockerfile创建镜像

  `options`:

  - `--build-arg=[]`:设置镜像创建时的变量
  - `--cpu-shares`:设置cpu使用权重
  - `--cpu-period`:限制cpu cfs周期
  - `--cpu-quota`:限制cpu cfs配额
  - `--cpuset-cpus`:指定使用的cpu id
  - `--cpuset-mems`:指定使用的内存id
  - `--disable-content-trust`:忽略校验，默认开启
  - `-f`:指定要使用的Dockerfile路径
  - `--force-rm`:设置镜像过程中删除中间容器
  - `--isolation`:使用容器隔离技术
  - `--label=[]`:设置镜像使用的元数据
  - `-m`:设置内存的最大值
  - `--memory-swap`:设置swap的最大值为内存+swap，"-1"表示不限swap
  - `--no-cache`:创建镜像的过程不使用缓存
  - `--pull`:尝试去更新镜像的新版本
  - `--quiet,-q`:安静模式，成功后只输出镜像ID
  - `--rm`:设置镜像成功后删除中间容器
  - `--shm-size`:设置/dev/shm的大小，默认值是64M
  - `-ulimit`:Ulimit配置
  - `--tag,-t`:镜像的名字及标签，通常为name:tag或name格式
  - `--network`:默认default。在构建期间设置RUN指令的网络模式

  实例:

  使用url的Dockerfile创建镜像

  `docker build github.com/creack/docker-firefox`

  指定Dockerfile文件的位置

  `docker build -f /path/to/a/Dockerfile .`

- `docker history <options> <image>`:查看镜像的创建历史

  `options`:

  - `-H`:以可读的格式打印镜像大小和日期，默认为true
  - `--no-trunc`:显示完整的提交记录
  - `-q`:进列出提交记录ID

- `docker save <options> <image>`将指定一个或多个镜像保存成tar归档文件

  `options`:

  - `-o`:输出到文件

  实例

  将镜像runoob/ubuntu:v3生成my_ubuntu_v3.tar文档

  `docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3`

- `docker load <options>`:导入使用`docker save`命令导出的镜像

  `options`:

  - `--input, -i`:指定导入的文件，代替STDIN
  - `--quiet, -q`:精简输出信息

- `docker import <options> <file|url> <repository:tag>`从归档文件中创建镜像

  `options`:

  - `-c`:应用docker指令创建镜像
  - `-m`:提交时的说明文字

##### info|version

- `docker info <options>`查看docker的系统信息

- `docker version <options>`显示docker版本信息

  `options`:

  - `-f`:指定返回值的模板文件
