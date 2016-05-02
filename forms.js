$(document).ready(function () {
  var array = [];

  //Prevents browser from contacting server when submit button is clicked
  $('#employeeinfo').on('submit', function (event) {
      event.preventDefault();

      //Takes values submitted via the forms and assembles them into an array
      var values = {};
      $.each($('#employeeinfo').serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      console.log(values);

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');

      //Appends the structure of the HTML page to include newly submitted data
      appendDom(values);
      appendSalary(values);

    });

  //Allows individual entries to be deleted using a button
  //Deleting an entry will not update the monthly salary calculation
  $('#container').on('click', 'button', function () {
      $(this).parent().remove();
    });

  //Captures the information entered when the user clicks submit and adds it
  //to the bottom of the page
  function appendDom(empInfo) {
    $('#container').append('<div class="person"></div>');
    var $el = $('#container').children().last();

    $el.append('<p>Name: ' + empInfo.employeefirstname + '' + empInfo.employeelastname + '</p>');
    $el.append('<p>Employee ID: ' + empInfo.employeenumber + '</p>');
    $el.append('<p>Job Title: ' + empInfo.employeejobtitle + '</p>');
    $el.append('<p>Annual Salary: $' + empInfo.employeesalary + '</p>');
    $el.append('<button>Delete Selection</button>');

  }

  //Calculates the average monthly salary or
  //(The sum of all entered salaries / 12 months)
  // = Average Monthly Cost of All Salaries
  function appendSalary(empInfo) {
      $('#monthlysalary').append('<div class="person"></div>');
      var $el = $('#monthlysalary').children().last();

      array.push(empInfo.employeesalary);

      //Summation function
      var count = 0;
      for (var i = array.length; i--;) {
        count += parseInt(array[i]);

        //Clears anything in the div everytime the submit button updates the page
        $('#monthlysalary').children().empty();

        //Average Monthly Salary Cost calculation
        $el.append('<p>' + '$' + Math.round(count / 12) + '</p>');
        $('#monthlysalary').children().removeClass();

      }

    }

});
