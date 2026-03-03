"use strict";
Component({
    properties: {
        component: {
            type: Object,
            value: {},
        },
        items: {
            type: Array,
            value: [],
        },
        module: {
            type: Object,
            value: {},
        }
    },
    data: {
        expandedItems: {}, // 记录每个item的展开状态
        taskCheckedStatus: {}, // 记录每个task的选中状态，key为"itemId-taskIndex"
        computedItems: [], // 计算后的items,包含动态状态
        noteExpanded: {}, // 记录每个备注区域的展开状态
        itemNotes: {} // 记录每个item的备注内容
    },
    lifetimes: {
        attached() {
            console.log('[timeline] attached', this.data.items);
            // 从本地存储加载task选中状态
            this.loadTaskCheckedStatus();
            // 从本地存储加载备注内容
            this.loadItemNotes();
            // 初始化计算items(需要先加载taskCheckedStatus以计算正确的status)
            this.updateComputedItems();
            // 默认展开所有item,但completed状态除外
            if (this.data.computedItems && this.data.computedItems.length > 0) {
                const expandedItems = {};
                this.data.computedItems.forEach((item) => {
                    // completed状态默认收起,其他状态默认展开
                    expandedItems[item.id] = item.status !== 'completed';
                });
                this.setData({
                    expandedItems
                });
            }
            // 初始化备注展开状态：有内容的默认展开
            this.initNoteExpandedStatus();
        }
    },
    observers: {
        'taskCheckedStatus, items': function () {
            // 当taskCheckedStatus或items变化时,重新计算状态
            this.updateComputedItems();
        }
    },
    methods: {
        // 点击时间轴节点 - 切换阶段
        onStageClick(event) {
            const { item } = event.currentTarget.dataset;
            // 如果是当前进行中的阶段，不需要切换
            if (item.status === 'ongoing') {
                wx.showToast({
                    title: '当前阶段进行中',
                    icon: 'none'
                });
                return;
            }
            // 二次确认弹窗
            let statusText = '未开始';
            if (item.status === 'completed') {
                statusText = '已完成';
            }
            else if (item.status === 'hide') {
                statusText = '未设置';
            }
            wx.showModal({
                title: '切换阶段',
                content: `确认切换到"${item.title}"阶段吗？\n当前状态：${statusText}`,
                confirmText: '确认切换',
                cancelText: '取消',
                success: (res) => {
                    if (res.confirm) {
                        console.log('确认切换到阶段:', item);
                        // 触发事件通知父组件
                        this.triggerEvent('stagechange', {
                            stageId: item.id,
                            stageTitle: item.title,
                            currentStatus: item.status
                        });
                    }
                }
            });
        },
        // 切换展开/收起
        toggleExpand(event) {
            const { id } = event.currentTarget.dataset;
            const expandedItems = { ...this.data.expandedItems };
            expandedItems[id] = !expandedItems[id];
            this.setData({
                expandedItems
            });
        },
        // 点击查看详情
        async onClickItem(event) {
            const app = getApp();
            const { link, router } = event.currentTarget.dataset;
            if (link || router) {
                await app.dov.openURL(link, router);
            }
        },
        // 加载task选中状态
        loadTaskCheckedStatus() {
            try {
                const savedStatus = wx.getStorageSync('timeline_task_checked');
                if (savedStatus) {
                    this.setData({
                        taskCheckedStatus: savedStatus
                    });
                }
            }
            catch (e) {
                console.error('加载task状态失败:', e);
            }
        },
        // 保存task选中状态
        saveTaskCheckedStatus() {
            try {
                wx.setStorageSync('timeline_task_checked', this.data.taskCheckedStatus);
            }
            catch (e) {
                console.error('保存task状态失败:', e);
            }
        },
        // 切换task的选中状态
        onTaskCheckboxChange(event) {
            const { itemId, taskIndex } = event.currentTarget.dataset;
            const key = `${itemId}-${taskIndex}`;
            const taskCheckedStatus = { ...this.data.taskCheckedStatus };
            taskCheckedStatus[key] = !taskCheckedStatus[key];
            this.setData({
                taskCheckedStatus
            });
            // 保存到本地存储
            this.saveTaskCheckedStatus();
            // 更新计算后的items
            this.updateComputedItems();
        },
        // 计算某个item的状态
        calculateItemStatus(item) {
            if (!item.tasks || item.tasks.length === 0) {
                return ''; // 没有tasks,状态为空
            }
            let checkedCount = 0;
            const totalCount = item.tasks.length;
            // 统计选中的task数量
            for (let i = 0; i < totalCount; i++) {
                const key = `${item.id}-${i}`;
                if (this.data.taskCheckedStatus[key]) {
                    checkedCount++;
                }
            }
            // 根据选中数量决定状态
            if (checkedCount === 0) {
                return ''; // 没有选中,状态为空
            }
            else if (checkedCount === totalCount) {
                return 'completed'; // 全部选中
            }
            else {
                return 'ongoing'; // 部分选中(大于0且小于总数)
            }
        },
        // 更新计算后的items
        updateComputedItems() {
            const items = this.data.items;
            const computedItems = items.map((item) => {
                return {
                    ...item,
                    status: this.calculateItemStatus(item)
                };
            });
            this.setData({
                computedItems
            });
        },
        // 切换备注区域展开/收起
        toggleNote(event) {
            const { id } = event.currentTarget.dataset;
            const noteExpanded = { ...this.data.noteExpanded };
            noteExpanded[id] = !noteExpanded[id];
            this.setData({
                noteExpanded
            });
        },
        // 备注输入
        onNoteInput(event) {
            const { id } = event.currentTarget.dataset;
            const { value } = event.detail;
            const itemNotes = { ...this.data.itemNotes };
            itemNotes[id] = value;
            this.setData({
                itemNotes
            });
        },
        // 备注失焦保存
        onNoteBlur() {
            this.saveItemNotes();
        },
        // 加载备注内容
        loadItemNotes() {
            try {
                const savedNotes = wx.getStorageSync('timeline_item_notes');
                if (savedNotes) {
                    this.setData({
                        itemNotes: savedNotes
                    });
                }
            }
            catch (e) {
                console.error('加载备注失败:', e);
            }
        },
        // 保存备注内容
        saveItemNotes() {
            try {
                wx.setStorageSync('timeline_item_notes', this.data.itemNotes);
            }
            catch (e) {
                console.error('保存备注失败:', e);
            }
        },
        // 初始化备注展开状态
        initNoteExpandedStatus() {
            const noteExpanded = {};
            const items = this.data.items;
            items.forEach((item) => {
                // 如果该item有备注内容，默认展开
                if (this.data.itemNotes[item.id] && this.data.itemNotes[item.id].trim() !== '') {
                    noteExpanded[item.id] = true;
                }
            });
            if (Object.keys(noteExpanded).length > 0) {
                this.setData({
                    noteExpanded
                });
            }
        },
        // 检查某个item是否有选中的task
        hasCheckedTask(itemId) {
            const items = this.data.items;
            const item = items.find((i) => i.id === itemId);
            if (!item || !item.tasks)
                return false;
            // 检查该item下是否有任何选中的task
            for (let i = 0; i < item.tasks.length; i++) {
                const key = `${itemId}-${i}`;
                if (this.data.taskCheckedStatus[key]) {
                    return true;
                }
            }
            return false;
        },
        // 获取状态图标
        getStatusIcon(status) {
            switch (status) {
                case 'completed':
                    return '✓';
                case 'ongoing':
                    return '●';
                default:
                    return '○';
            }
        },
        // 获取状态文本
        getStatusText(status) {
            switch (status) {
                case 'completed':
                    return '已完成';
                case 'ongoing':
                    return '进行中';
                default:
                    return '未开始';
            }
        }
    }
});
