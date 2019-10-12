#!/usr/bin/env bash
npm -v
npm install
npm run build
image_version=`date +%Y%m%d%H%M`;
docker stop produce_mrp || true;
# 删除tongrun_mrp容器
docker rm produce_mrp || true;
# 删除镜像
docker rmi -f $(docker images | grep tongrun/produce_mrp | awk '{print $3}')
# 构建tongrun/mrp:$image_version镜像
docker build . -t tongrun/produce_mrp:$image_version;
#删除产生的None镜像 
docker rmi -f $(docker images | grep none | awk '{print $3}')
# 查看镜像列表
docker images;
# 基于tongrun/produceMrp 镜像 构建一个容器 produceMrp
docker run -p 80:80 -d --name produce_mrp tongrun/produce_mrp:$image_version;
# 查看日志
docker logs produce_mrp;