'use-strict'
$(document).ready(function() {
    const currencyFormat = (num)=> {
        return 'KES: ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }

    $('.date').datepicker({
            format: "yyyy-mm-dd",
            maxViewMode: 3,
            todayBtn: true,
            clearBtn: true,
            autoclose: true,
            calendarWeeks: true,
            toggleActive: true
        });

    $("#items-datatable").DataTable({
      
      "footerCallback": function ( row, data, start, end, display ) {
        var api = this.api(), data;

        // Remove the formatting to get integer data for summation
        var intVal = function (i){return typeof i === 'string'? i.replace(/[\$,]/g, '')*1 : typeof i === 'number'? i : 0;};

        // Total over all pages
        total = api.column(6).data() .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );

        // Total over this page
        pageTotal = api.column(6, { page: 'current'} ).data().reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );

        // Update footer
        $( api.column(6).footer() ).html(currencyFormat(pageTotal) +' (Grant Total: '+ currencyFormat(total) +')');},

        processing: true,
        // serverSide: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: true,
        responsive:true,
        rowReorder: {selector: 'td:nth-child(2)' },
        ajax: {url: "/items", dataSrc: "" },
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        dataType: "text",
        columns: [ 
            { data : "id" },
            { data : "name" },
            { data : "code" },
            { data : "category" },           
            { data : "quantity" },        
            { data : "selling_price" },
            { data : "income_total" },
            { data : "date_created" },
            { data : "date_updated" }
         ],
         dom: 'lBfrtip',
        buttons: [
             {
                 extend: 'copy',
                 title: 'All Inventory Items',
                 filename: 'Inventory Items',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
             {
                 extend: 'csv',
                 title: 'All Inventory Items',
                 filename: 'Inventory Items',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
             {
                 extend: 'excel',
                 title: 'All Inventory Items',
                 filename: 'Inventory Items',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
              {
                  extend: 'pdf',
                  title: 'All Inventory Items',
                 filename: 'Inventory Items',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
              },
             {
                 extend: 'print',
                 title: 'All Inventory Items',
                 filename: 'Inventory Items',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             }]  
     });
  
    $("#items-datatable-bydate").DataTable({
      
      "footerCallback": function ( row, data, start, end, display ) {
        var api = this.api(), data;

        // Remove the formatting to get integer data for summation
        var intVal = function (i){return typeof i === 'string'? i.replace(/[\$,]/g, '')*1 : typeof i === 'number'? i : 0;};

        // Total over all pages
        total = api.column(9).data() .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );

        // Total over this page
        pageTotal = api.column(9, { page: 'current'} ).data().reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );

        // Update footer
        $( api.column(9).footer() ).html(currencyFormat(pageTotal) +' (Grant Total: '+ currencyFormat(total) +')');},

        processing: true,
        // serverSide: true,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: true,
        responsive:true,
        rowReorder: {selector: 'td:nth-child(2)' },
        ajax: {url: "/transactions", dataSrc: "" },
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        dataType: "json",     
        columns: [ 
            { data : "id" },
            { data : "tId" },
            { data : "code" },
            { data : "date" },
            { data : "type" },        
            { data : "item" },        
            { data : "user" },
            { data : "quantity" },
            { data : "price" },
            { data : "sum" }
         ],
         dom: 'lBfrtip',
        buttons: [
             {
                 extend: 'copy',
                 title: 'Transactions',
                 filename: 'Transactions',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
             {
                 extend: 'csv',
                 title: 'Transactions',
                 filename: 'Transactions',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
             {
                 extend: 'excel',
                 title: 'Transactions',
                 filename: 'Transactions',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             },
              {
                  extend: 'pdf',
                  title: 'Transactions',
                 filename: 'Transactions',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
              },
             {
                 extend: 'print',
                 title: 'Transactions',
                 filename: 'Transactions',
                 orientation: 'landscape',
                 pageSize: 'LEGAL'
             }]  
     });
     

     $('#btnFilterdate').click(function (e) {
        //To prevent form submit after ajax call
        e.preventDefault();

        //Set data to be sent
        var parameters = {
            startDate: $("#txtStartDate").val()
        };   
        
       // $.get( '/transbydate', parameters, function(data) { });
            
            document.getElementById('items-filter-bydate').style.display ='block';    

            $("#items-filter-bydate").DataTable({
      
                "footerCallback": function ( row, data, start, end, display ) {
                  var api = this.api(), data;
          
                  // Remove the formatting to get integer data for summation
                  var intVal = function (i){return typeof i === 'string'? i.replace(/[\$,]/g, '')*1 : typeof i === 'number'? i : 0;};
          
                  // Total over all pages
                  total = api.column(9).data() .reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
          
                  // Total over this page
                  pageTotal = api.column(9, { page: 'current'} ).data().reduce( function (a, b) { return intVal(a) + intVal(b); }, 0 );
          
                  // Update footer
                  $( api.column(9).footer() ).html(currencyFormat(pageTotal) +' (Grant Total: '+ currencyFormat(total) +')');},
                  stateSave: true,
                  bDestroy: true,
                  processing: true,
                  // serverSide: true,
                  paging: true,
                  lengthChange: true,
                  searching: true,
                  ordering: true,
                  info: true,
                  autoWidth: true,
                  responsive:true,
                  rowReorder: {selector: 'td:nth-child(2)' },
                  ajax: {url: '/transbydate?startDate='+parameters.startDate, dataSrc: "" },
                  lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                  dataType: "json",     
                  columns: [ 
                      { data : "id" },
                      { data : "tId" },
                      { data : "code" },
                      { data : "date" },
                      { data : "type" },        
                      { data : "item" },        
                      { data : "user" },
                      { data : "quantity" },
                      { data : "price" },
                      { data : "sum" }
                   ],
                   dom: 'lBfrtip',
                  buttons: [
                       {
                           extend: 'copy',
                           title: 'Transactions by Date',
                           filename: 'Transactions by Date',
                           orientation: 'landscape',
                           pageSize: 'LEGAL'
                       },
                       {
                           extend: 'csv',
                           title: 'Transactions by Date',
                           filename: 'Transactions by Date',
                           orientation: 'landscape',
                           pageSize: 'LEGAL'
                       },
                       {
                           extend: 'excel',
                           title: 'Transactions by Date',
                           filename: 'Transactions by Date',
                           orientation: 'landscape',
                           pageSize: 'LEGAL'
                       },
                        {
                            extend: 'pdf',
                            title: 'Transactions by Date' ,
                           filename: 'Transactions by Date',
                           orientation: 'landscape',
                           pageSize: 'LEGAL'
                        },
                       {
                           extend: 'print',
                           title: 'Transactions by Date',
                           filename: 'Transactions by Date',
                           orientation: 'landscape',
                           pageSize: 'LEGAL'
                       }]  
               }); 
          
    });

   
    
});