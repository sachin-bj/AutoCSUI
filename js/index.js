$(document).ready(function(){
   function init(){
        bindEvent();
       fetchData();
   }
    function fetchData(){
        $.ajax({
            "url": "http://172.17.94.121:8080/facebook/report",
            "method": "GET",
            "dataType": "JSON",
            "success": function(res){
                setData(res);
            }
        });
        function setData(res){
            $("#noAction").html(res.AUTOBOT_NO_ACTION);
            $("#autoReplied").html(res.AUTO_REPLIED);
            $("#exeResolved").html(res.EXECUTIVE_RESOLVED);
            $("#received").html(res.RECEIVED);
        }
    }
    function bindEvent(){
        $("#viewRecieved").off("click.viewRecieved").on("click.viewRecieved", function(){
            $.ajax({
                "url": "http://172.17.94.121:8080/facebook/feedsWithStatus/RECEIVED",
                "method": "GET",
                "dataType": "JSON",
                "success": function(res){
                    setData(res);
                }
            });
        });

        $("#viewResolved").off("click.viewResolved").on("click.viewResolved", function(){
            $.ajax({
                "url": "http://172.17.94.121:8080/facebook/feedsWithStatus/EXECUTIVE_RESOLVED",
                "method": "GET",
                "dataType": "JSON",
                "success": function(res){
                    setData(res);
                }
            });
        });

        $("#viewReplied").off("click.viewReplied").on("click.viewReplied", function(){
            $.ajax({
                "url": "http://172.17.94.121:8080/facebook/feedsWithStatus/AUTO_REPLIED",
                "method": "GET",
                "dataType": "JSON",
                "success": function(res){
                    setData(res);
                }
            });
        });

        $("#viewAction").off("click.viewAction").on("click.viewAction", function(){
            $.ajax({
                "url": "http://172.17.94.121:8080/facebook/feedsWithStatus/AUTOBOT_NO_ACTION",
                "method": "GET",
                "dataType": "JSON",
                "success": function(res){
                    setData1(res);
                }
            });
        });

    }
    function setData1(res){
        var newHtml = "";
        $("#messageList").html("")
        $.each(res, function(i,v){
            var html = $("#messageTmpl").html();
            newHtml = newHtml + html.replace("@@message@@", v.entityMessage).replace("@@pageId@@", v.pageId).replace("@@entityId@@", v.entityId).replace("@@entityTime@@", v.entityTime);
            console.log(v.entityMessage);
        });
        $("#messageList").append($(newHtml));
    }
    init();
});