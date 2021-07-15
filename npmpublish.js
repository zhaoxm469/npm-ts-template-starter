/*
 * @Author: zhaoxingming
 * @Date: 2021-07-15 16:08:04
 * @LastEditTime: 2021-07-15 21:15:21
 * @LastEditors: vscode
 * @Description:npm发布命令，自动修改程序版本号
 *
 * 大概流程如下：
 * 1. 首先修改pack的版本号
 * 2. 打印出版本号变更情况，并询问是否oK
 * 3. 如果YES， 发布到npm
 * 3. 如果NO , 终止操作
 * 4. npm发布完成，继续询问是否提交代码到远程仓库
 * 5. YES 执行git推送命令，等待结果。输出成功/失败信息
 * 6. NO 退出操作
 *
 */

import { prompt } from 'inquirer';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { yellow, green } from 'chalk';
import execa from 'execa';
import ora from 'ora';
import { version, name as pkgName } from './package.json';

const pkgPath = resolve(__dirname, './package.json');

const pkg = readFileSync(pkgPath, 'utf-8');
const newVersion = (`${version.replace(/\D/g, '') - '' + 1}`).padStart(3, '0').split('').join('.');
const newPkg = pkg.replace(version, newVersion);

const loading = {
    spinner: ora(''),
    show(msg = 'Loading') {
        this.spinner.text = msg;
        this.spinner.start();
    },
    hide() {
        this.spinner.stop();
    },
};

(async () => {
    const { updateVer } = await prompt({
        type: 'confirm',
        name: 'updateVer',
        message: `版本号即将从 ${yellow(`v${version}`)} 变更为 -> ${yellow(`v${newVersion}`)} ，是否继续\n`,
    });

    if (updateVer) {
        writeFileSync(pkgPath, newPkg);
        try {
            loading.show('npm发布中...\n');
            await execa('npm', ['publish']);
        } catch (err) {
            console.log(err.stdout);
            return;
        }
        loading.hide();
    }

    if (!updateVer) return;

    const { autoGitCommit } = await prompt({
        type: 'confirm',
        name: 'autoGitCommit',
        message: '自动提交package.json文件到远程仓库？\n',
    });

    if (autoGitCommit) {
        loading.show('执行命令中...\n');
        try {
            const { stdout: branchName } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
            await execa('git', ['add', 'package.json']);
            await execa('git', ['commit', '-m', `feat: 版本号修改为：${newVersion}`]);
            await execa('git', ['push', 'origin', branchName]);
        } catch (err) {
            console.log(err.stdout);
        }

        loading.hide();
    }

    console.log(`\n🎉 ${green('npm发布成功!!')} `);
    console.log(`\n👉 输入命令 ${green(`npm install -g ${pkgName}`)} 更新至最新版本 ${yellow(`v${newVersion}`)} \n`);
})();
