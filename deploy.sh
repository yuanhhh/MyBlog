#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build 

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自己定义的域名
# echo 'www.mysite.com' >CNAME

git init

git add .

git commit -m 'deploy'

# 认证
git config --global user.email "1556801619@qq.com"
git config --global user.name "yuanhhh"


# 链接远程仓库
git remote add origin https://github.com/yuanhhh/yuanhhh.github.io-.git
#git remote add origin https://github.com/yuanhhh/yuanhhh.github.io-.git

# 如果你想要部署到 https://USERNAME.github.io
git push -f https://github.com/yuanhhh/yuanhhh.github.io-.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -