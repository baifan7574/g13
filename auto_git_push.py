# -*- coding: utf-8 -*-
import subprocess
import time
import sys
from datetime import datetime
import os

MAX_RETRIES = 3
DELAY_SECONDS_START = 10
LOG_FILE = "upload_log.txt"

def log(message):
    """屏幕输出 + 写入日志文件"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {message}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")

def run_git_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True,
                                stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        if result.stdout:
            log(result.stdout.decode("utf-8", errors="ignore"))
        return True
    except subprocess.CalledProcessError as e:
        log("❌ 错误信息：" + e.stderr.decode("utf-8", errors="ignore"))
        return False

def push_with_retry():
    log("📦 开始执行 Git 自动上传流程...\n")

    subprocess.run("git add .", shell=True)
    subprocess.run('git commit -m "Auto update"', shell=True)

    delay = DELAY_SECONDS_START
    for attempt in range(1, MAX_RETRIES + 1):
        log(f"🚀 第 {attempt} 次尝试 git push ...")
        success = run_git_command("git push")
        if success:
            log("✅ 上传成功！")
            return 0
        else:
            if attempt < MAX_RETRIES:
                log(f"🔁 上传失败，{delay} 秒后重试...\n")
                time.sleep(delay)
                delay += 10  # 每次多等10秒
            else:
                log("❌ 所有尝试都失败了，请检查网络或稍后再试。")
                return 1

if __name__ == "__main__":
    sys.exit(push_with_retry())
