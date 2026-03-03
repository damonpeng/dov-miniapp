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
        },
        editMode: {
            type: Boolean,
            value: false
        }
    },
    data: {
        // 工程信息（动态字段）
        projectInfo: {},
        // 内部编辑模式状态
        editMode: false
    },
    lifetimes: {
        attached() {
            console.log('[progress-card] attached', this.data.items);
            this.initProjectInfo();
        }
    },
    observers: {
        'items': function () {
            this.initProjectInfo();
        }
    },
    methods: {
        // 初始化工程信息
        initProjectInfo() {
            const items = this.data.items;
            if (!items || items.length === 0)
                return;
            const item = items[0];
            if (!item.summary || !item.summary.fields)
                return;
            // 尝试从本地存储加载
            try {
                const savedInfo = wx.getStorageSync('project_info');
                if (savedInfo && Object.keys(savedInfo).length > 0) {
                    this.setData({
                        projectInfo: savedInfo
                    });
                    return;
                }
            }
            catch (e) {
                console.error('加载工程信息失败:', e);
            }
            // 如果没有保存的数据，从配置中初始化
            const projectInfo = {};
            const allFields = [
                ...(item.summary.fields || []),
                ...(item.summary.rowFields || [])
            ];
            allFields.forEach((field) => {
                projectInfo[field.key] = field.value || '';
            });
            this.setData({
                projectInfo
            });
        },
        // 保存工程信息
        saveProjectInfo() {
            try {
                wx.setStorageSync('project_info', this.data.projectInfo);
                wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                });
            }
            catch (e) {
                console.error('保存工程信息失败:', e);
                wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                });
            }
        },
        // 输入处理
        onInputChange(e) {
            const { field } = e.currentTarget.dataset;
            const { value } = e.detail;
            const projectInfo = { ...this.data.projectInfo };
            projectInfo[field] = value;
            this.setData({
                projectInfo
            });
        },
        // 输入失焦保存
        onInputBlur() {
            this.saveProjectInfo();
        },
        // 切换编辑模式
        onEditToggle() {
            const newEditMode = !this.data.editMode;
            // 如果从编辑模式切换到查看模式（点击保存图标），则保存数据
            if (!newEditMode) {
                this.saveProjectInfo();
            }
            this.setData({
                editMode: newEditMode
            });
        }
    }
});
