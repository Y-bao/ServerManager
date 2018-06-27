<template>
    <div class="cev-layout" v-bar>
        <Card class="cev-box">
            <div class="toolbar">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem>用户管理</BreadcrumbItem>
                </Breadcrumb>
                <Button class="button" type="primary">导出</Button>
                <Button class="button" type="primary">统计</Button>
            </div>
            <div class="main-list">
                <Table class="table" border :columns="columns" :data="data" @on-sort-change="onSortChange"></Table>
                <Page class="page" :total="100" show-sizer show-elevator show-total></Page>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    name: "Users",
    data() {
        return {
            columns: [
                {
                    title: "用户名",
                    key: "name",
                    minWidth: 150
                },
                {
                    title: "性别",
                    key: "gender",
                    sortable: "custom",
                    minWidth: 150
                },
                {
                    title: "注册时间",
                    key: "regDate",
                    sortable: "custom",
                    minWidth: 150
                },
                {
                    title: "最后登录时间",
                    key: "lastLoginDate",
                    sortable: "custom",
                    minWidth: 150
                },
                {
                    title: "最后登录方式",
                    key: "lastLoginWay",
                    align: "center",
                    minWidth: 150
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width: 100,
                    fixed: "right",
                    render: (h) => {
                        return h("div", [
                            h("Button", {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                    }
                                }
                            }, "查看详情")
                        ]);
                    }
                }
            ],
            data: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ],
        };
    },
    methods: {
        onSortChange(e) {
            alert(e.key + "|" + e.order);
        }
    }
};
</script>

<style scoped>
    .cev-layout {
        box-sizing: border-box;
        padding: 10px;
    }
</style>
