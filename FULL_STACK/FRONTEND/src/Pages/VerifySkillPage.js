import React, { useRef, useState } from "react";

const QuizComponent = ({ skillName, updateProficiency }) => {
  // const [score, setScore] = useState(0);
  const score = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions] = useState({
    SQL: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Sequential Query Language",
          "Standard Query Language",
          "System Query Language",
        ],
        correctAnswer: "Structured Query Language",
      },
      {
        question:
          "Which SQL statement is used to extract data from a database?",
        options: ["GET", "PULL", "EXTRACT", "SELECT"],
        correctAnswer: "SELECT",
      },
      {
        question:
          "In SQL, which command is used to delete a table from the database?",
        options: ["REMOVE TABLE", "DELETE TABLE", "DROP TABLE", "ERASE TABLE"],
        correctAnswer: "DROP TABLE",
      },
      {
        question: "Which SQL clause is used to filter the result set?",
        options: ["FILTER BY", "LIMIT", "WHERE", "SELECT"],
        correctAnswer: "WHERE",
      },
    ],
    Python: [
      {
        question: "What is Python?",
        options: ["A snake", "A programming language", "A bird", "A fruit"],
        correctAnswer: "A programming language",
      },
      {
        question:
          "Which of the following statements is true about Python's lambda functions?",
        options: [
          "They can have multiple expressions.",
          "They must contain a return statement.",
          "They can only take a single argument.",
          "They are used to define classes.",
        ],
        correctAnswer: "They can only take a single argument.",
      },
      {
        question:
          "What will be the output of the following Python code? x = [1, 2, 3],  y = x , y.append(4) => print(x)",
        options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 3, 4, 4]", "Error"],
        correctAnswer: "[1, 2, 3, 4]",
      },
      {
        question:
          "What will be the output of the following Python code? a = 10 , b = 5 , c = a / b , print(c)",
        options: ["2", "2.0", "2.5", "5"],
        correctAnswer: "2.0",
      },
      // Add more Python questions here
    ],
    JavaScript: [
      {
        question: "What does JS stand for?",
        options: ["JavaScript", "Just Scripting", "Java Style", "Jungle Style"],
        correctAnswer: "JavaScript",
      },
      {
        question: "What does the === operator do in JavaScript?",
        options: [
          "Checks for equality without type coercion",
          "Assigns a value to a variable",
          "Compares two values with type coercion",
          "Checks for equality with type coercion",
        ],
        correctAnswer: "Checks for equality without type coercion",
      },
      {
        question:
          "Which of the following JavaScript array methods does not modify the original array?",
        options: ["splice()", "slice()", "push()", "pop()"],
        correctAnswer: "slice()",
      },
      {
        question:
          "What will be the result of the following JavaScript expression?  ===> 5 + '3'",
        options: ["8", "53", "'8'", "Error"],
        correctAnswer: "53",
      },
      // Add more JavaScript questions here
    ],
    React: [
      {
        question: "What does JSX stand for in React?",
        options: [
          "JavaScript XML",
          "JavaScript Extensible",
          "JavaScript XHR",
          "JavaScript XSL",
        ],
        correctAnswer: "JavaScript XML",
      },
      {
        question:
          "Which lifecycle method in React is invoked immediately after a component is inserted into the DOM?",
        options: [
          "componentDidMount",
          "componentDidUpdate",
          "componentWillMount",
          "componentWillUpdate",
        ],
        correctAnswer: "componentDidMount",
      },
      {
        question: "What is the purpose of React Router?",
        options: [
          "To handle HTTP requests in React applications",
          "To manage state in React components",
          "To provide navigation and routing functionalities in React applications",
          "To optimize rendering performance in React applications",
        ],
        correctAnswer:
          "To provide navigation and routing functionalities in React applications",
      },
      {
        question: "In React, what is a higher-order component (HOC) used for?",
        options: [
          "To create reusable logic",
          "To style components using CSS-in-JS",
          "To manage application state",
          "To optimize rendering performance",
        ],
        correctAnswer: "To create reusable logic",
      },
    ],

    Angular: [
      {
        question:
          "Which directive in Angular is used for adding event listeners to elements?",
        options: ["*ngIf", "*ngFor", "(click)", "[ngClass]"],
        correctAnswer: "(click)",
      },
      {
        question: "What is the purpose of Angular's NgModule?",
        options: [
          "To define a module in an Angular application",
          "To declare a new component",
          "To handle HTTP requests",
          "To define routing configuration",
        ],
        correctAnswer: "To define a module in an Angular application",
      },
      {
        question:
          "Which Angular feature is used for handling forms and form validation?",
        options: [
          "Angular Validators",
          "Angular Services",
          "Angular Modules",
          "Angular Reactive Forms",
        ],
        correctAnswer: "Angular Reactive Forms",
      },
      {
        question: "What is Angular CLI used for?",
        options: [
          "Managing dependencies in an Angular project",
          "Generating Angular components, services, and modules",
          "Debugging Angular applications",
          "Deploying Angular applications to servers",
        ],
        correctAnswer: "Generating Angular components, services, and modules",
      },
    ],

    PowerBI: [
      {
        question:
          "Which of the following is a data visualization type in Power BI?",
        options: ["Query Editor", "DAX", "Matrix", "Data Model"],
        correctAnswer: "Matrix",
      },
      {
        question: "What is the purpose of Power BI Gateway?",
        options: [
          "To secure data sources in Power BI",
          "To connect Power BI to on-premises data sources",
          "To create and manage data models",
          "To schedule data refresh in Power BI Service",
        ],
        correctAnswer: "To connect Power BI to on-premises data sources",
      },
      {
        question:
          "Which language is used for writing custom expressions in Power BI?",
        options: ["SQL", "Python", "DAX", "JavaScript"],
        correctAnswer: "DAX",
      },
      {
        question: "What is the function of Power BI Desktop?",
        options: [
          "To deploy Power BI reports to the cloud",
          "To create and publish reports locally",
          "To manage Power BI workspaces",
          "To schedule data refresh in Power BI Service",
        ],
        correctAnswer: "To create and publish reports locally",
      },
    ],

    Alteryx: [
      {
        question: "What is the primary use case of Alteryx Designer?",
        options: [
          "Data visualization",
          "Data blending and preparation",
          "Machine learning model training",
          "Cloud storage management",
        ],
        correctAnswer: "Data blending and preparation",
      },
      {
        question: "Which tool in Alteryx is used for spatial analytics?",
        options: [
          "Predictive tools",
          "Data Investigation tools",
          "Reporting tools",
          "Location Intelligence tools",
        ],
        correctAnswer: "Location Intelligence tools",
      },
      {
        question: "What is the purpose of Alteryx Server?",
        options: [
          "To automate workflows and schedule jobs",
          "To create and publish reports",
          "To manage user authentication",
          "To monitor server performance",
        ],
        correctAnswer: "To automate workflows and schedule jobs",
      },
      {
        question:
          "Which of the following file formats can be used as inputs and outputs in Alteryx workflows?",
        options: ["CSV", "JSON", "Excel", "All of the above"],
        correctAnswer: "All of the above",
      },
    ],

    AWS: [
      {
        question:
          "What is the name of the service in AWS used for deploying and managing containers?",
        options: ["Amazon EC2", "Amazon ECS", "Amazon EKS", "AWS Lambda"],
        correctAnswer: "Amazon ECS",
      },
      {
        question:
          "Which AWS service is used for scalable object storage in the cloud?",
        options: ["Amazon S3", "Amazon EFS", "Amazon RDS", "Amazon DynamoDB"],
        correctAnswer: "Amazon S3",
      },
      {
        question: "What is AWS Lambda used for?",
        options: [
          "Container orchestration",
          "Serverless computing",
          "Virtual private cloud",
          "Relational database management",
        ],
        correctAnswer: "Serverless computing",
      },
      {
        question: "What is Amazon RDS?",
        options: [
          "A managed NoSQL database service",
          "A managed relational database service",
          "A data warehousing service",
          "A content delivery network service",
        ],
        correctAnswer: "A managed relational database service",
      },
    ],

    ADF: [
      {
        question:
          "Which service in Azure is used for orchestrating and automating data movement and data transformation?",
        options: [
          "Azure Data Lake Storage",
          "Azure Data Factory",
          "Azure Data Explorer",
          "Azure Synapse Analytics",
        ],
        correctAnswer: "Azure Data Factory",
      },
      {
        question: "What is the primary unit of work in Azure Data Factory?",
        options: ["Pipeline", "Dataset", "Linked Service", "Activity"],
        correctAnswer: "Pipeline",
      },
      {
        question: "What is the purpose of triggers in Azure Data Factory?",
        options: [
          "To define the data flow in a pipeline",
          "To schedule the execution of pipelines",
          "To monitor and manage data pipelines",
          "To define connections to data sources and destinations",
        ],
        correctAnswer: "To schedule the execution of pipelines",
      },
      {
        question:
          "Which data integration tool is integrated with Azure Data Factory for building data pipelines?",
        options: [
          "Apache Spark",
          "Talend",
          "SSIS (SQL Server Integration Services)",
          "Informatica",
        ],
        correctAnswer: "SSIS (SQL Server Integration Services)",
      },
    ],
    //add more skills
  });

  const handleAnswer = (selectedAnswer) => {
    // let currentScore = 0;
    const currentQuiz = quizQuestions[skillName];
    const correctAnswer = currentQuiz[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      score.current = score.current + 10;
      console.log(score.current);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < currentQuiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const percentage = (score.current / 40) * 100;
      let proficiency = "";
      if (percentage === 100) {
        proficiency = "Excellent";
      } else if (percentage <= 25) {
        proficiency = "Beginner";
      } else {
        proficiency = "Amateur";
      }
      updateProficiency(proficiency);
      setCurrentQuestion(0);
      score.current = 0;
    }
  };

  return (
    <div>
      <h2 className="text-[#22223B]">{skillName} Quiz</h2>
      <div className="bg-[#22223B] p-4 rounded">
        {currentQuestion < quizQuestions[skillName].length ? (
          <>
            <p style={{ color: "white" }}>
              {quizQuestions[skillName][currentQuestion].question}
            </p>
            <ul>
              {quizQuestions[skillName][currentQuestion].options.map(
                (option, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="bg-[#4A4E69] p-2 rounded cursor-pointer hover:bg-[#9A8C98] m-10 px-5"
                  >
                    <span style={{ color: "white" }}>{option}</span>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <p style={{ color: "white" }}>
            Quiz completed! Your score: {score.current}/40
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
