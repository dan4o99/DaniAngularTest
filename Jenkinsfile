pipeline {
    agent any

    environment {
        // Set environment variables if needed
        DEPLOY_SERVER = "ec2-user@63.176.49.249"
        DEPLOY_PATH = "/var/www/DaniAngularTest/"
        SSH_KEY = credentials('jenkins-ssh-key') // Referencing the Jenkins secret with your SSH key
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/dan4o99/DaniAngularTest'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install NodeJS
                    sh 'npm install'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    // Build Angular application
                    sh 'ng build --prod'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Deploy the built app to EC2 via SSH using SCP
                    sh 'scp -i $SSH_KEY -r dist/* $DEPLOY_SERVER:$DEPLOY_PATH'
                    // Optionally, restart the server (Nginx or Apache)
                    sh 'ssh -i $SSH_KEY $DEPLOY_SERVER "sudo systemctl reload nginx"'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}