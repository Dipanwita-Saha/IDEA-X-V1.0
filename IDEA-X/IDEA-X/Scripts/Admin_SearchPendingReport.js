

var value1 = "";

$(document).ready(() => {

    $('.search_box').keyup((e) => {
        let text = e.currentTarget.value;
      
        if (value1 !== text) {
            value1 = text;
            $.ajax({
                type: 'POST',
                url: '/Admin/SearchPendingReport',
                data: { text: e.currentTarget.value },
                async: true,
                datatype: 'json',
                contenttype: "application/json; charset=utf-8",
                success: (s) => {
                    $('.table-body').empty();
                    var count = 0;
                    if (s.LIST.length > 0) {
                        s.LIST.forEach(val => {

                            $('.table-body').prepend(`
   <tr>
${count++}
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_ID}</td>
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.POST_ID}</td>
                            <td onclick="window.location.replace('/Admin/UserProfile/${val.POST_AUTHOR}?page=PendingReport')" style="cursor: pointer; ">${val.POST_AUTHOR}</td>
                            <td onclick="window.location.replace('/Admin/UserProfile/${val.REPORTED_BY}?page=PendingReport')" style="cursor: pointer; ">${val.REPORTED_BY}</td>
                          <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_CATEGORY}</td>
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_DETAILS}</td>
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_TIME}</td>
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_IP}</td>
                            <td onclick="window.location.replace('/Admin/SearchPostView/${val.POST_ID}?page=PendingReport')" style="cursor: pointer; ">${val.REPORT_STATUS}</td>
    <td align="center">
                            <button onclick="ReportInvestigate(${val.REPORT_ID})" id="call" style="margin-right: 20px; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; text-decoration: none; background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1)); border-radius: 10px; font-size: 18px; color: #ee7e7e; cursor:pointer;" >Start Investigation</button>
                        </td>
                        </tr>
`);
                        })
                    }
                    else {
                        $('.table-body').empty();
                    }
                    document.getElementById("show-result").innerHTML = "Total " + count + " results found";
                },
                error: (err) => {
                    alert(err.msg);
                }
            })
        }



    })
});










function ReportInvestigate(id) {

    $.ajax({
        type: 'POST',
        url: '/Admin/ReportInvestigate',
        data: { rid: id },
        async: true,
        datatype: 'json',
        contenttype: "application/json; charset=utf-8",
        success: (s) => {
            window.location.reload();
        },
        error: (err) => {
            alert(err.msg);
        }
    });

}