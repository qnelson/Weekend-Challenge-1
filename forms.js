$(document).ready(function () {
  var empArray = [];

  //Prevents browser from contacting server when submit button is clicked
  $('#employeeinfo').on('submit', function (event) {
      event.preventDefault();

      //Takes values submitted via the forms and assembles them into an array
      var values = {};
      $.each($('#employeeinfo').serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      console.log(values);

      // clear out inputs and shifts focus to first field
      $('#employeeinfo').find('input[type=text]').val('');
      $('#employeeinfo').find('input[type=number]').val('');
      $('#employeefirstname').focus();

      //Appends the structure of the HTML page to include newly submitted data
      appendDom(values);
      appendSalary(values);

    });

  //Captures the information entered when the user clicks submit and adds it
  //to the bottom of the page
  function appendDom(empInfo) {
    $('#container').append('<div class="person"></div>');
    var $el = $('#container').children().last();

    $el.append('<p>Name: ' + empInfo.employeefirstname + ' ' + empInfo.employeelastname + '</p>');
    $el.append('<p>Employee ID: ' + empInfo.employeenumber + '</p>');
    $el.append('<p>Job Title: ' + empInfo.employeejobtitle + '</p>');
    $el.append('<p>Annual Salary: $' + empInfo.employeesalary + '</p>');
    $el.append('<button>Delete Selection</button>');

  }

  //Calculates the average monthly salary or
  //(The sum of all entered salaries / 12 months)
  // = Average Monthly Cost of All Salaries
  var count = 0;
  function appendSalary(empInfo) {
    $('#monthlysalary').append('<div class="person"></div>');
    var $el = $('#monthlysalary').children().last();

    empArray.push(empInfo.employeesalary);

    //Summation function
    count = 0;
    for (var i = empArray.length; i--;) {
      count += parseInt(empArray[i]);

      //Average Monthly Salary Cost calculation
      //.text changes the value in monthlysalary div with every submit
      $('#title').text('$' + Math.round(count / 12));
      $('#monthlysalary').children().removeClass();

    }

    //Attaches .data tag 'monthlysalary' to empInfo.employeesalary
    $('.person').last().data('monthlysalary', empInfo.employeesalary);
  }

  //Allows individual entries to be deleted
  //Deleted entries will automatically update the Monthly Salary calculation
  $('#container').on('click', 'button', function () {
    count -= $('.person').last().data('monthlysalary');
    $(this).parent().remove();
    $('#title').text('$' + Math.round(count / 12));
  });
});
