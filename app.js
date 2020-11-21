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

                .then(function (answers) {
                    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                            engagementTeam.push(engineer);
                            chooseMemberNext();
                })
                .catch(function(err) {
                    console.log(err);
                  });

        } else if (teamChoice.team === 'Intern') {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your intern's name?",
                    name: "name",
                    validate: confirmName
                },
                {
                    type: "input",
                    message: "What is your intern's id?",
                    name: "id",
                    validate: confirmNumber
                },
                {
                    type: "input",
                    message: "What is your intern's email?",
                    name: "email",
                    validate: validateEmail 
                },
                {
                    type: "input",
                    message: "What is your intern's school?",
                    name: "school",
                    validate: confirmName
                }
            ])
                .then(function (answers) {
                    let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                    engagementTeam.push(intern);
                    chooseMemberNext();
                })
                .catch(function(err) {
                    console.log(err);
                  });

        } else {generateFile()}


    } catch (err) {
        console.log(err);
    }
}
// Loop back to original question for engineer or intern and begin again until user calls "I don't want to add
//anymore team members", at which point the loop stops



}

teamMember();

//Call the function




function generateFile() {
fs.writeFileSync(outputPath, render(engagementTeam),"utf-8")
}
