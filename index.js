//acquiring manager class
const Manager = require("./lib/Manager");
//acquiring engineer class
const Engineer = require("./lib/Engineer");
//acquiring intern class
const Intern = require("./lib/Intern");
// prompts questions to user
const inquirer = require("inquirer");
const path = require("path");
// generates file 
const fs = require("fs");
//acquiring generatePage function
const generatePage = require("./src/html-template");
//empty array to push completed worker profiles in
let workers = [];

//Creates manager first
menu = () => { 
    createManager = () => {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the managers name",

                },
                {
                    type: "input",
                    name: "id",
                    message: "Enter team manager's id",
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter team manager's email"
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is the team manager's office number?",
                }

            ])
            .then(({ name, id, email, officeNumber }) => {
                const manager = new Manager(name, id, email, officeNumber);
                console.log(manager);
                workers.push(manager);
                employeeMenu();
            });
    }

    createManager();
}
//Prompts the user what to do next
function employeeMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "picker",
                message: "What position would you like to create?",
                choices: ["Engineer", "Intern", "Quit"]

            },
            
        ])
            .then(({picker}) => {
                console.log(picker);

                switch (picker) {
                    case "Engineer": 
                        createEngineer();
                        break;
                        
                    case "Intern":
                        createIntern();
                        break;
                    
                    default: 
                        console.log(workers);
                        generateProfiles(workers);
                        break;
                }
            
        });
}

//creates engineer profile
createEngineer = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter Engineer's name",

            },
            {
                type: "input",
                name: "id",
                message: "Enter team Engineer's id",
            },
            {
                type: "input",
                name: "email",
                message: "Enter team Engineer's email"
            },
            {
                type: "input",
                name: "github",
                message: "Enter Engineer's github",
            }

        ])
        .then(({ name, id, email, github }) => {
            const newEngineer = new Engineer(name, id, email, github);
            console.log(newEngineer);
            workers.push(newEngineer);
            employeeMenu();
        });
}
//creates intern profile
createIntern = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter Intern's name",

            },
            {
                type: "input",
                name: "id",
                message: "Enter Intern's Id",
            },
            {
                type: "input",
                name: "email",
                message: "Enter Intern's email"
            },
            {
                type: "input",
                name: "school",
                message: "Entern Intern's school",
            }

        ])
        .then(({ name, id, email, school }) => {
            const newIntern = new Intern(name, id, email, school);
            console.log(newIntern);
            workers.push(newIntern);
            employeeMenu();
        });
}


function generateProfiles(workers) {

    const profileContent = generatePage(workers);


    fs.writeFile('./dist/currentEmployees.html', profileContent, (err) => {
        err ? console.log(err) : console.log('Congratulations, your employee webpage has been created!');
    });

}



menu();