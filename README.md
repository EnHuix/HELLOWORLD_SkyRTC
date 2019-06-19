# HELLOWORLD
步骤
1. 小组成员先把SSH Key添加到GitHub
2. 克隆到本地，`git clone git@github.com:EnHuix/learngit.git`
3. 使用命令行进入demo文件夹下，输入`npm install`
4. 在demo文件夹下右击空白处选择使用vscode打开，`ctrl+F5`运行，在浏览器端输入localhost:3000即可进入

注意事项：
- 表名为users
- 使用MySql建表时字符集校对选择`utf8_bin`，否则sql查询不区分大小写

协作开发：
1. 每次更新后，其他组员开始编码时先`git pull`，保持与组员同步
2. 建议自己在本地在创建一个分支（不与远程仓库对应），在自己本地分支做开发，完成后merge到master分支，之后在`git push origin master`到远程仓库
3. [了解更多Git操作](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013760174128707b935b0be6fc4fc6ace66c4f15618f8d000)

## Update
- 将HTTP改为HTTPS，具体看代码（app.js）
  - 使用HTTPS需要生成证书文件（已生成，在你的本机如果不能运行，就在你本机在生成新的证书文件）（证书文件在keys文件夹）
  - 生成证书文件需要安装openssl来生成，具体操作网上有很多
  - 测试的时候依然输入localhost:3000即可，在代码中实现了HTTP到HTTPS的重定向
- 使用了SkyRTC来实现语音与视频功能，现在可以进行视频和语音，测试时必须在一个网络下（局域网，或者连的同一个WIFI）
- 写了一个简单的匹配功能，可能会存在共享数据的同步问题（未解决）
- 添加了匹配动画（比较复杂的交互还没有写）

## Update 5.22/23
- 添加了发布动态的功能
- 添加了一对一聊天功能

## Update 6.2
- 优化了注册、登录、登录失败页面UI，加入了语言的else选项
- 添加了一份合适的html前端模板

## Update final
- 加了一个好看的页面
