import React from "react";

export const About = () => {

    return (
        <div>
            <h2 className="text-center mb-3 pt-3">A little about ChoresGalore</h2>
            <p className="w-75 align-self-center m-auto mt-5 text">
                This website was developed for a school project.  The idea began with the actual problem of keeping
                track of my children's chores.  I realized that this would be a great problem to solve with a full stack
                web application.  The requirements were straightforward and fairly open ended, so I decided to build
                a web application using SpringBoot, MySQL, and React.  At the start of the project, I knew MySQL and Java,
                I had dabbled in SpringBoot, but I had never worked with React or Typescript.  As this project is to show
                off my skills that I learned in college, I chose to learn a new framework for it, since I consider my ability
                to learn new frameworks and languages to be the most valuable skill I developed at university.
            </p>
            <p className="w-75 align-self-center m-auto mt-5 text">
                To log in as a test user, click the login button in the top-right corner and enter "user@test.com" for
                username and "password" for password.  You can also register an account by entering an email address
                and password.  After registration, you can login with your new credentials and start creating users
                and assigning chores to them.
            </p>
            <p className="w-75 align-self-center m-auto mt-5 text">
                &nbsp;
                <a
                    href="https://docs.google.com/document/d/1xF5bkuJF_ZaOjM0UtwpWbLS28fcBXfjd/edit?usp=sharing&ouid=108814606967783276689&rtpof=true&sd=true"
                    target="_blank"
                    className="link-primary"
                >
                    Click Here
                </a>
                &nbsp;for a mock proposal or&nbsp;
                <a
                    href="https://docs.google.com/document/d/1WkbQfJRgD7fO45s3RJ2-Qne3bHbkKFYD/edit?usp=sharing&ouid=108814606967783276689&rtpof=true&sd=true"
                    target="_blank"
                >
                    here
                </a> &nbsp;for detail about the structure of the program.
            </p>
        </div>
    )

}