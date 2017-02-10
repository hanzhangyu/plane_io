> 趁着过年前的小放松，搞了一搞，但是最近会有点忙更新较慢

# plane_io


考虑到以后会挂载到paulhan.cn/game/planeIo路径，这里就分了开发环境和生产环境

localhost:3000是开发环境
localhost:8080是生产环境，同时处理数据
生产环境是为了切合paulhan.cn的文件目录，
开发环境中使用localhost:3000，数据请求发送至localhost:8080集中处理，
以后两个项目合并我就可以使用build之后，直接使用forever启动

未完待续。。。