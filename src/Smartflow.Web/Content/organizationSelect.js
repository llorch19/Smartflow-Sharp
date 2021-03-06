﻿/********************************************************************
 License: https://github.com/chengderen/Smartflow/blob/master/LICENSE 
 Home page: https://www.smartflow-sharp.com
 ********************************************************************
 */

; (function () {

    function loadTree(nx) {
        var ajaxSettings = { url: 'api/setting/getorgs', type: 'get' };
        ajaxSettings.data = ajaxSettings.data || {};

        ajaxSettings.success = function (serverData) {


            var treeObj = $.fn.zTree.init($("#ztree"), {
                callback: {
                    onClick: function (event, treeId, node) {
                        $("#tree").val(node.Name);
                        $("#node-value").val(node.ID);
                    }
                },
                check: {
                    enable: true
                },
                data: {
                    key: {
                        name: 'Name'
                    },
                    simpleData: {
                        enable: true,
                        idKey: 'ID',
                        pIdKey: 'ParentID',
                        rootPId: 0
                    }
                }
            }, serverData);

            treeObj.expandAll(true);

            $.each(nx.organization, function () {
                //rightDataSource.push(this.id);
                var node = treeObj.getNodeByParam("ID", this.id, null);
                treeObj.checkNode(node, true, true);
            });
        };

        util.ajaxService(ajaxSettings);
    }

    function setTree(nx) {
        var treeObj = $.fn.zTree.getZTreeObj("ztree");
        var nodes = treeObj.getCheckedNodes(true);
        var selectNodes = [];
        $.each(nodes, function () {
            if (!this.isParent) {
                selectNodes.push({ id: this.ID, name: this.Name });
            }
        });

        nx.organization = selectNodes;
    }

    window.setting = {
        load: loadTree,
        set: setTree
    };

})();