const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const engagementTeam = [];

const confirmName = async (name) => {
    if (name === '') {
        return 'incorrect answer';
    };
    return true;
};

const confirmNumber = async (name) => {
    if (name === '') {
        return 'incorrect answer';
    };
    return true;
};

function validateEmail(name)
{if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name))
  {
    return (true)
  }
    return("You have entered an invalid email address!")
}

function teamMember() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
            validate: confirmName
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "id",
            validate: confirmNumber
        }, 
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "office number",
            validate: confirmNumber
        }, 
    ])

        .then(function (answers) {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            engagementTeam.push(manager)
            chooseMemberNext()
        })
        .catch(function(err) {
            console.log(err);
        });
    async function chooseMemberNext() {
        try {
            let teamChoice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'team',
                    message: 'Which type of team member would you like to add',
                    choices: ['Engineer', 'Intern', 'I don/t want to add anymore team members.']
                }
            ]);
            if (teamChoice.team === 'Engineer') {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your engineer's name?",
                        name: "name",
                        validate: confirmName
                    },
                    {
                        type: "input",
                        message: "What is your engineer's id?",
                        name: "id",
                        validate: confirmNumber
                    },
                    {
                        type: "input",
                        message: "What is your engineer's email?",
                        name: "email",
                        validate: validateEmail
                    },
                    {
                        type: "input",
                        message: "What is your engineer's GitHub username?",
                        name: "GitHub",
                        validate: confirmName
                    }
                ])
                
            }
        }
    }

    


}
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
