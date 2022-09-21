<template>
    <div class="wrap">
        <div class="left">
            <draggable
                :group="{
                    name: 'table',
                    pull: true,
                    put: true
                }"
                :list="state.modules.arr1"
                itemKey="id"
                ghostClass="ghost"
                :forceFallback="true"
                fallbackClass="dragEl"
                animation="300"
                @start="onStart"
                @end="onEnd"
                mouseElW="120"
            >
                <template #item="{ element }">
                    <div class="item move">
                        <label class="move">{{ element.name }}</label>
                        <span>内容....</span>
                    </div>
                </template>
            </draggable>
        </div>

        <div class="right">
            <draggable
                :group="{
                    name: 'table',
                    pull: true,
                    put: true
                }"
                :list="state.modules.arr2"
                itemKey="id"
                filter=".forbid"
                animation="300"
                ghostClass="ghost"
                @start="onStart"
                @end="onEnd"
            >
                <template #item="{ element }">
                    <div class="item move">
                        <label class="move">{{ element.name }}</label>
                        <span>内容....</span>
                    </div>
                </template>
            </draggable>
        </div>
    </div>

    <el-button @click="exchangeTable">交换主从</el-button>
    <div class="list-wrap">
        <ul class="origin-table">
            <li
                v-for="ori in state.originTable"
                :key="ori.id"
                :class="{ activeAfterLine: ori.activeLine }"
            >
                {{ ori.name }}
            </li>
        </ul>

        <ul class="line-icon">
            <li v-for="ori in state.originTable" :key="ori.id"></li>
        </ul>

        <ul class="sub-table">
            <li
                v-for="ori in state.subTable"
                :key="ori.id"
                :class="{ activeBeforeLine: ori.activeLine }"
            >
                {{ ori.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import draggable from '@/components/vuedraggable/vuedraggable.js'
import { cloneDeep } from 'lodash-es'

const state = reactive({
    message: 'A组只能往B组拖到一个元素',
    groupA: {
        name: 'itxst',
        put: true, //允许拖入
        pull: () => {
            let res = state.modules.arr1.length > 3
            //当A组元素小于等于3个时，不允许再拖出元素了
            state.message = res ? '只能拖出1个' : '不能再拖了'
            return res
        }
    },
    modules: {
        arr1: [
            { name: 'A组', id: 1 },
            { name: '库存', id: 2 },
            { name: '销量', id: 3 },
            { name: '日志', id: 4 }
        ],
        arr2: [
            { name: 'B组', id: 5 },
            { name: '员工', id: 6 },
            { name: '报表', id: 7 }
        ]
    },

    originTable: [
        {
            name: '测试1',
            id: 1,
            uuid: '1',
            activeLine: true
        },
        {
            name: '测试2',
            id: 2,
            uuid: '2',
            activeLine: false
        }
    ],
    subTable: [
        {
            name: '测试11',
            id: 1,
            uuid: '11',
            activeLine: true
        },
        {
            name: '测试22',
            id: 2,
            uuid: '22',
            activeLine: false
        },
        {
            name: '测试33',
            id: 3,
            uuid: '33',
            activeLine: false
        }
    ]
})

//拖拽开始的事件
const onStart = () => {
    console.log('开始拖拽')
}

//拖拽结束的事件
const onEnd = () => {
    console.log('结束拖拽')
}

const exchangeTable = () => {
    // console.log(state.subTable)
    const tempSubtable = cloneDeep(state.subTable)
    const tempOriginTable = cloneDeep(state.originTable)
    state.originTable = tempSubtable
    state.subTable = tempOriginTable
    console.log(state)
}
</script>

<style lang="scss" scoped>
.wrap {
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .left,
    .right {
        box-sizing: border-box;
        flex: 1;
        height: 100%;
        padding: 20px;
        .item {
            cursor: pointer;
            border: 1px solid red;
        }
    }
    .left {
        border-right: 1px solid #ddd;
    }
    .right {
        .item {
            position: relative;
            display: inline-block;
            padding: 4px 8px;
            margin-right: 10px;
        }
    }
    .ghost {
        padding: 2px 4px;
        border: 1px dashed red !important;
    }
    .dragEl {
        width: 120px !important;
        background-color: yellow !important;
        opacity: 0.8 !important;
    }
    .dash {
        display: inline-block;
        width: 120px;
        height: 25px;
        border: 1px dashed red;
    }
}

.list-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    .origin-table,
    .sub-table {
        & > li {
            display: inline-block;
            position: relative;
            width: 120px;
            height: 32px;
            line-height: 32px;
            margin-bottom: 8px;
            text-align: center;
            border: 1px solid #ccc;
        }
        & > .activeAfterLine::after {
            display: inline-block;
            content: '';
            position: absolute;
            right: -32px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 2px;
            background-color: #ccc;
        }
        & > .activeBeforeLine::before {
            display: inline-block;
            content: '';
            position: absolute;
            left: -32px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 2px;
            background-color: #ccc;
        }
    }

    .origin-table {
        text-align: right;
        width: 180px;
        margin-right: 40px;
    }
    .sub-table {
        text-align: left;
        width: 180px;
        margin-left: 40px;
    }

    .line-icon {
        & > li {
            width: 32px;
            height: 32px;
            margin-bottom: 8px;
            background-color: red;
        }
    }
}
</style>
