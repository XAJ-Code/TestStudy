<template>
    <div style="width: 100%;height: 100%;">
        <terminal name="my-terminal" @exec-cmd="onExecCmd"></terminal>
    </div>
</template>
<script lang="ts" setup>
import Terminal from 'vue-web-terminal'
import type { Command, SuccessFunc, FailedFunc } from 'vue-web-terminal'
import { TerminalApi } from 'vue-web-terminal';
const onExecCmd = (key: string, command: Command, success: SuccessFunc, failed: FailedFunc, name: string) => {
    if (key === 'fail') {
        failed('Something wrong!!!')
    } else if (key === 'list') {
        success('Hello')
        let textJson:string = ''
        fetch('../../package.json').then(res => res.json()).then((data:string) => {
         textJson = JSON.stringify(data)
         success({
            type: 'json',
            content: textJson
         })
        })
        // TerminalApi
        TerminalApi.pushMessage(name, {
            class: "error",
            content: "error text"
        })
        TerminalApi.pushMessage(name, {
            class: "system",
            content: "system text"
        })
        TerminalApi.pushMessage(name, {
            class: "info",
            content: "info text"
        })
    } else {
        let allClass = ['success', 'error', 'system', 'info', 'warning'];
        let clazz = allClass[Math.floor(Math.random() * allClass.length)];
        success(`${clazz} ${key}`)
    }
}
</script>
<style lang="">
    
</style>