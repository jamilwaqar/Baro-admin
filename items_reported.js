$(document).ready(function () {


    $('#items-reported-tab').click(function(){

        $("#items_reported tbody").html('');
        var itemsReported = firebase.database().ref("ItemsReported");
        itemsReported.on("child_added", function(data) {
            var reportData = data.val();
            var itemKey = data.key;
            var reportItem = {};

            for (var reportKey in reportData){
                reportItem = reportData[reportKey];
            }

            console.log(itemKey);
            // getting item data
            firebase.database().ref('/Items/' + itemKey).once('value', function(itemData) {
                var itemName = 'NONE';
                if(itemData.val() != null) {
                    itemName = itemData.val().Name;
                }
                var template = $('#itemReportedTemplate').html();
                $.template('itemReportedTemplate', template);
                $.tmpl( "itemReportedTemplate", {'Id': 'checkbox-' + new Date().getTime()
                    ,'ItemName': itemName, 'ReportName': reportItem.Name
                    , 'Reason': reportItem.Reason
                    , 'ReportUser' : reportItem.User, 'Picture': reportItem.MainPicture
                    , 'ItemKey' : itemKey}).appendTo($("#items_reported tbody"));

                componentHandler.upgradeAllRegistered();
            });
        });
    });


    $(document).on("click","#items_reported button[key]",function() {

        /*itemKey = $(this).attr('key');
        firebase.database().ref('/Items/' + itemKey).once('value').then(function(item) {
            var itemName = item.val().Name;
            var template = $('#itemReportedTemplate').html();
            $.template('itemReportedTemplate', template);
            $.tmpl( "itemReportedTemplate", {'Id': 'checkbox-' + new Date().getTime()
                ,'ItemName': itemName, 'ReportName': report.Name
                , 'Reason': report.Reason
                , 'ReportUser' : report.User, 'Picture': report.MainPicture
                , 'ItemKey' : itemKey}).appendTo($("#items_reported tbody"));
        });
        */
    });
});

