#!/bin/sh
docker build -t "rps" . && docker run -it "rps"